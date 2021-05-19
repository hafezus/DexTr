import React from "react";
import { FaEthereum } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Web3 from "web3";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Connection() {
	const [metaMask, setMetaMask] = useState(false);
	const [connection, setConnection] = useState("Not Connected");

	useEffect(async () => {
		// setConnection("Not Connected");
		let address = "";
		web3 = new Web3(window.ethereum);
		if (connection !== "Not Connected") {
			document.querySelector("#connectedIcon").classList =
				"-mr-1 ml-2 h-3 w-3 connected:text-green-500 text-green-500";
			address === "" ? setConnection("Not Connected") : setConnection(address);
		} else {
			address = await web3.eth
				.getAccounts()
				.then((address) => {
					console.log(address[0].slice(0, 10) + "...");
					return address[0].slice(0, 10) + "...";
				})
				.catch((error) => console.log(error));
			address === "" ? setConnection("Not Connected") : setConnection(address);
			// web3.eth.getAccounts().then((address) => {});
			// document.querySelector("#connectedIcon").classList =
			// 	"-mr-1 ml-2 h-3 w-3 connected:text-green-500 text-green-500";
		}
	}, []);

	const connectMetaMask = async (event) => {
		event.preventDefault();
		let connectButton = document.querySelector(".connectmetamask");
		if (connection !== "Not Connected") {
			// console.log(" connected. Disconnecting");
			// //setMetaMask(false);
			// connectButton.disabled = false;
			document.querySelector("#connectedIcon").classList =
				"-mr-1 ml-2 h-3 w-3 connected:text-red-500 text-red-500";
			setConnection("Not Connected");
		} else {
			console.log(" not connected. Connecting...");
			await ethereum.request({ method: "eth_requestAccounts" });
			web3 = new Web3(window.ethereum);
			let address = await web3.eth
				.getAccounts()
				.then((address) => {
					console.log(address[0].slice(0, 10) + "...");
					return address[0].slice(0, 10) + "...";
				})
				.catch((error) => console.log(error));
			setConnection(address);
			// web3.eth.getAccounts().then((address) => {});
			document.querySelector("#connectedIcon").classList =
				"-mr-1 ml-2 h-3 w-3 connected:text-green-500 text-green-500";
		}
	};

	return (
		<>
			<span
				className="w-auto h-auto p-2 justify-center font-mono text-sm flex hover:bg-gray-900 border border-gray-700 rounded-md"
				// onClick={copyAddress}
				id="connectionStatus"
				onClick={() => {
					document.execCommand("copy");
				}}
			>
				{connection}
			</span>
			<Menu as="div" className="text-2xl align-middle my-auto px-2">
				{({ open }) => (
					<>
						<Menu.Button
							className="inline-flex justify-center w-full outline-none px-4 bg-gray-800 text-sm font-medium text-gray-700 
						focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-800"
						>
							<GrStatusGoodSmall
								className="-mr-1 ml-2 h-3 w-3 connected:text-green-500 text-red-500"
								id="connectedIcon"
							/>
							<ChevronDownIcon
								className="-mr-1 ml-2 h-3 w-5 text-gray-300 hover:text-white transition duration-500 ease-in-out"
								aria-hidden="true"
							/>
						</Menu.Button>

						<Transition
							show={open}
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items
								static
								className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								<div className="py-1">
									<Menu.Item>
										{({ active }) => (
											<a
												href="/"
												className={classNames(
													active
														? "bg-gray-100 text-gray-900"
														: "text-gray-700",
													"block px-4 py-2 text-sm connectmetamask"
												)}
												onClick={connectMetaMask}
											>
												Connect MetaMask
											</a>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
		</>
	);
}

const Navbar = () => {
	const router = useRouter();

	return (
		<div className="flex flex-wrap bg-gray-800 text-white relative">
			<div className="flex my-auto w-1/4">
				<FaEthereum className="my-auto mx-5 h-20" />
				<Link href={`/`}>
					<a className="text-2xl align-middle my-auto px-2">
						De<span className="text-pink-400 text-2xl">X</span>tr
					</a>
				</Link>
			</div>

			<div className="flex-grow"></div>
			<ul className="inline-flex flex-shrink">
				<li
					className={
						router.pathname === "/"
							? `px-5 hover:underline mx-auto font-semibold border-b-4 border-pink-400 pt-5`
							: "px-5 hover:underline mx-auto font-semibold pt-5"
					}
				>
					{/* border-b-4 tradepage */}
					<Link href={`/`} className="tradepage">
						<a>Trade</a>
					</Link>
				</li>
				<li
					className={
						router.pathname === "/transactions"
							? `px-5 h-full hover:underline mx-auto font-semibold border-b-4 border-pink-400 pt-5`
							: "px-5 h-full hover:underline mx-auto font-semibold pt-5"
					}
					// border-b-4 transactionspage
				>
					<Link href={`/transactions`}>
						<a>Transactions</a>
					</Link>
				</li>
			</ul>
			<div className="flex-grow"></div>
			<div className="flex my-auto w-1/4 justify-end sm:self-center">
				<Connection />
			</div>
			{/* <div className="flex-grow w-1/4 my-auto self-end">
				<Connection />
			</div> */}
			{/* <GrStatusGoodSmall className="my-auto mx-5 h-20 fill-current connected:text-green-500 text-red-500" /> */}
		</div>
	);
};

export default Navbar;
