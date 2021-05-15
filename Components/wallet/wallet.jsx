import React from "react";
import WalletDetails from "./walletDetails";
import WalletPortfolio from "./walletPortfolio";
import WalletTransactions from "../transactions/walletTransactions";
import WalletProfile from "./walletProfile";
import { useRouter } from "next/router";
import PendingTransactions from "../transactions/pendingTransactions";
import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { MdLoop } from "react-icons/md";
import Web3 from "web3";

const PlatformInfo = () => {
	return (
		<div className="bg-gray-100">
			<div className="space-x-4">
				<h3 className="flow-root p-20 font-mono text-center">
					Powered using...
				</h3>
			</div>
			<div className="flex flex-wrap justify-center">
				<div className="rounded-lg bg-transparent w-96 p-20">
					{/* Next.js icon */}
					<img src="/images/nextjs-3.svg" alt="next" />
					{/* <span></span> */}
				</div>
				<div className="rounded-lg bg-transparent w-96 p-20">
					{/* Next.js icon */}

					<img src="/images/tailwindcss.svg" alt="tailwind" />
					{/* <span></span> */}
				</div>
				<div className="rounded-lg bg-transparent w-96 p-20">
					{/* Next.js icon */}
					<img
						src="/images/solidity.svg"
						alt="solidity"
						className="w-1/2 mx-auto"
					/>
					{/* <span>Solidity</span> */}
				</div>
			</div>
		</div>
	);
};

const Wallet = ({ graphdata }) => {
	// const router = useRouter();
	const [enabled, setEnabled] = useState(true);
	const [connection, setConnection] = useState("Not Connected");

	useEffect(() => {
		//load all pending purchase events into list here from contract
		let web3;
		if (window.ethereum) {
			web3 = new Web3(window.ethereum);
		} else {
			web3 = new Web3(window.web3.currentProvider);
		}
		console.log(web3.givenProvider);

		web3.eth
			.getAccounts()
			.then((address) => {
				document.querySelector("#connectionStatus").textContent =
					address[0].slice(0, 10).toString() + "...";
				setConnection(address[0].slice(0, 10).toString() + "...");
			})
			.catch(() => {
				document.querySelector("#connectionStatus").textContent =
					"Not Connected";
				setConnection("Not Connected");
			});
	}, [connection]);
	/*
	State transitions here:
	Profile pc, name, PK
	Total Ether, equivalent AED amount
	*/
	// let WalletBody = () => {
	// 	return router.pathname == "/" ? (
	// 		<WalletPortfolio />
	// 	) : (
	// 		<WalletTransactions />
	// 	);
	// };

	const submitPurchase = (e) => {
		//does nothing yet
		e.preventDefault();
		//console.log(graphdata);
		graphdata.then((uniswapgraph) => {
			console.log(uniswapgraph.data.data.pairs);
		});
		if (typeof window.ethereum !== "undefined") {
			console.log("MetaMask is installed!");
		}
	};

	const swapTokens = (e) => {
		e.preventDefault();
		let token1 = document.querySelector("#token1");
		let token2 = document.querySelector("#token2");
		let swapIcon = document.querySelector("#swapIcon");

		if (token1.placeholder === "ETH") {
			token1.placeholder = "DXT";
			token2.placeholder = "ETH";
		} else {
			token1.placeholder = "ETH";
			token2.placeholder = "DXT";
		}
		setEnabled(!enabled);
	};

	return (
		<div className="h-full my-auto pt-10">
			<section
				className=" 
				flex flex-col items-center
			    mx-auto 
				w-2/3 md:w-2/6 sm:w-3/5 sm:h-3/6 xl:w-1/4 xs:1/3 xl:h-auto
				bg-gray-800 
				rounded-xl shadow-2xl 
				xl:md:sm:transition ease-in-out duration-500"
			>
				<form className="flex flex-col w-full">
					<div className="text-white my-auto mx-2 my-2 font-mono flex flex-row items-stretch self-center bg-gray-800 w-1/2 rounded-b-md">
						{/* <label className="text-white mx-auto font-mono text-sm flex">
							Settings
						</label> */}
						{/* <div className="flex w-1/2 bg-gray-500"> */}
						{/* <Connection /> */}
						<span
							className="w-full h-full mx-auto p-2 justify-center font-mono text-sm flex hover:bg-gray-900 border border-gray-700 rounded-b-md"
							// onClick={copyAddress}
							id="connectionStatus"
						>
							{connection}
							{/* <FiSettings className="text-gray-200 hover:text-white hover:transition ease-in-out duration-300" /> */}
						</span>

						{/* </div> */}
					</div>
					<Switch
						checked={enabled}
						onChange={setEnabled}
						className={`${
							enabled ? "bg-blue-600" : "bg-pink-700"
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
						<span className="not-sr-only absolute top-2 left-0 pl-10 text-xs text-white">
							Sell
						</span>
					</Switch>
					<div className="flex flex-col">
						{/* <div></div> */}
						<input
							type="number"
							className="rounded-xl mx-auto mb-3 py-5 px-10 w-4/5 font-mono bg-gray-700 text-white text-xl focus:outline-none"
							id="token1"
							placeholder={enabled ? "ETH" : "DXT"}
						/>
						<button className="focus:outline-none" onClick={swapTokens}>
							{/* <IoIosArrowUp className="mx-auto mb-3 text-gray-500 focus:outline-none hover:text-white hover:transition ease-in-out duration-300" /> */}
							<MdLoop
								className="mx-auto mb-3 text-gray-500 focus:outline-none hover:text-white hover:transition ease-in-out duration-300 transform rotate-90 hover:-rotate-90"
								id="swapIcon"
							/>
						</button>
						<input
							type="number"
							className="rounded-xl mx-auto mb-3 py-5 px-10 w-4/5 font-mono bg-gray-700 text-white text-xl focus:outline-none"
							placeholder={enabled ? "DXT" : "ETH"}
							id="token2"
						/>
					</div>

					{/* <div className="flex flex-row">
						<input
							type="number"
							className="rounded-xl mx-auto mb-3 py-5 px-10 w-3/5 font-mono bg-gray-700 text-white text-xl focus:outline-none"
							placeholder="DXT"
						/>
					</div> */}
					{enabled ? (
						<input
							type="submit"
							value="Buy"
							className={`rounded-b-xl mx-auto w-full py-5 text-white 
							hover:transition ease-in-out duration-600 bg-blue-600 hover:bg-blue-700 mt-20
						`}
							onClick={submitPurchase}
						/>
					) : (
						<>
							<PendingTransactions connection={connection} />
							<input
								type="submit"
								value="Sell"
								className={`rounded-b-xl mx-auto w-full py-5 text-white 
							hover:transition ease-in-out duration-600 bg-pink-700 hover:bg-pink-800 mt-20
							`}
								onClick={submitPurchase}
							/>
						</>
					)}
				</form>
				{/* </div> */}
			</section>
			<PlatformInfo />
		</div>
	);
};

export default Wallet;
