import React from "react";
import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import GraphData from "./GraphData";
import { FaEthereum } from "react-icons/fa";
import { initializeWeb3, initializeContracts } from "../../web3.js";

const PlatformInfo = () => {
	return (
		<div className="bg-gray-100">
			<div className="space-x-4">
				<h3 className="flow-root m-20 font-mono text-center">
					Powered using...
				</h3>
			</div>
			<div className="flex flex-wrap justify-center">
				<div className="rounded-lg bg-transparent w-96 p-20">
					<img src="/images/nextjs-3.svg" alt="next" />
				</div>
				<div className="rounded-lg bg-transparent w-96 p-20">
					<img src="/images/tailwindcss.svg" alt="tailwind" />
				</div>
				<div className="rounded-lg bg-transparent w-96 p-20">
					<img
						src="/images/solidity.svg"
						alt="solidity"
						className="w-1/2 mx-auto"
					/>
				</div>
				<div className="rounded-lg bg-transparent w-96 p-20">
					<img
						src="/images/the-graph.svg"
						alt="thegraph"
						className="w-2/3 mx-auto"
					/>
				</div>
			</div>
		</div>
	);
};

const Trade = () => {
	const [enabled, setEnabled] = useState(true);
	const [amount, setAmount] = useState(0);
	const [web3, setWeb3] = useState(undefined);
	const [account, setAccount] = useState(undefined);
	const [balance, setBalance] = useState(0);
	const [contracts, setContracts] = useState(undefined);

	useEffect(async () => {
		//on page load initialize web3, contracts & current user account.
		const web3js = await initializeWeb3();
		setWeb3(web3js);
		const contracts = await initializeContracts();
		setContracts(contracts);
		const account = await contracts.accounts[0];
		setAccount(account);
		console.log(contracts.tradeContract._address);
		console.log(account);

		const balance = await contracts.tradeContract.methods
			.balanceOf(account)
			.call({
				from: account,
			});

		setBalance(balance);
		console.log(balance);
		return;
	}, []);

	const purchaseDxt = async (event) => {
		//onClick purchase button
		event.preventDefault();
		const amount = document.querySelector("#token1").value;
		let currentAmount = await contracts.tradeHelperContract.methods
			._convertToEth(amount)
			.call({ from: account })
			.then("data", (data) => data)
			.then("error", (error) => error); //Calculate inputted Eth based on conversion rate in the TradeHelper contract
		console.log(currentAmount);
		await contracts.tradeContract.methods
			.buyDxt(account, amount)
			.send({
				from: account,
				gasLimit: 300000,
				gasPrice: web3.utils.toWei("1", "gwei"),
				value: Number.parseInt(currentAmount),
			})
			.on("receipt", (receipt) => {
				//On successful transaction
				console.log(
					`Successfully bought ${amount} DXT for ${currentAmount} WEI`
				);
			})
			.on("error", (error) => {
				//On transaction revert
				console.log("Failed to transact");
				return;
			});

		//console.log(currentAmount)
	};
	const sellDxt = async (event) => {
		event.preventDefault();
		const amount = document.querySelector("#token1").value;
		let currentAmount = await contracts.tradeHelperContract.methods
			._convertToEth(amount)
			.call({ from: account })
			.then("data", (data) => data)
			.then("error", (error) => error); //Calculate inputted Eth based on conversion rate in the TradeHelper contract
		// console.log(contracts.tradeContract._address);
		await contracts.tradeContract.methods
			.sellDxt(account, amount)
			.send({
				from: account,
				gasLimit: 300000 + Number.parseInt(currentAmount),
				gasPrice: web3.utils.toWei("1", "gwei"),
			})
			.on("receipt", (receipt) => {
				//On successful transaction
				console.log(`Successfully sold ${amount} DXT for ${currentAmount} WEI`);
			})
			.on("error", (error) => {
				//On transaction revert
				console.log("Failed to transact");
				return;
			});
	};

	const calculateEth = async (e) => {
		try {
			let currentAmount = await contracts.tradeHelperContract.methods
				._convertToEth(e.target.value)
				.call({ from: account })
				.then("data", (data) => data)
				.then("error", (error) => error);
			setAmount(currentAmount);
			return Number.parseFloat(currentAmount);
		} catch (e) {
			setAmount(0);
			console.log("Error");
		}
	};

	return (
		<div className="h-full my-auto pt-10">
			<section
				className=" 
				flex flex-col items-center
			    mx-auto 
				w-1/3 md:w-2/6 sm:w-3/5 sm:h-3/6 xl:w-1/5 xs:1/3 xl:h-auto
				bg-gray-800 
				rounded-xl shadow-2xl 
				xl:md:sm:transition ease-in-out duration-500"
			>
				<form className="flex flex-col w-full">
					<Switch
						checked={enabled}
						onChange={setEnabled}
						className={`${
							enabled ? "bg-blue-600" : "bg-pink-400"
						} relative inline-flex items-center h-8 w-16 rounded-full w-11 focus:outline-none mx-auto my-5`}
					>
						<span className="not-sr-only absolute top-2 left-0 pl-2 text-xs text-white">
							Buy
						</span>
						<span
							className={`transform transition ease-in-out duration-200
							${
								enabled ? "translate-x-9" : "translate-x-1"
							} inline-block w-6 h-6 transform bg-white rounded-full z-10`}
						></span>
						<span className="not-sr-only absolute top-2 left-0 pl-9 text-xs text-white">
							Sell
						</span>
					</Switch>
					<div className="flex flex-col">
						<input
							type="number"
							className="rounded-xl mx-auto mb-5 py-5 px-10 w-4/5 font-mono bg-gray-700 text-white text-xl focus:outline-none"
							id="token1"
							onChange={calculateEth}
							placeholder="0 DXT"
							required
						/>
						<div className="flex rounded-xl mx-auto mb-5 w-4/5 font-mono bg-gray-800 text-gray-500 text-xl focus:outline-none justify-center">
							WEI:
							{amount === 0 ? (
								<FaEthereum className="animate-spin my-auto mx-2 h-6 text-gray-500" />
							) : (
								<span className="not-sr-only text-gray-500">
									{"   "}
									{Number.parseFloat(amount)}
								</span>
							)}
						</div>
					</div>

					{enabled ? (
						<input
							type="submit"
							value="Buy"
							className={`rounded-b-xl mx-auto w-full py-5 text-white 
							hover:transition ease-in-out duration-600 bg-blue-600 hover:bg-blue-700
						`}
							onClick={purchaseDxt}
						/>
					) : (
						<>
							<input
								type="submit"
								value="Sell"
								className={`rounded-b-xl mx-auto w-full py-5 text-white 
							hover:transition ease-in-out duration-600 bg-pink-400 hover:bg-pink-500
							`}
								onClick={sellDxt}
							/>
						</>
					)}
				</form>
			</section>
			<GraphData />
			<PlatformInfo />
		</div>
	);
};

export default Trade;
