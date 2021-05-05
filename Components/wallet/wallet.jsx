import React from "react";
import WalletDetails from "./walletDetails";
import WalletPortfolio from "./walletPortfolio";
import WalletTransactions from "../transactions/walletTransactions";
import WalletProfile from "./walletProfile";
import { useRouter } from "next/router";

const Wallet = () => {
	const router = useRouter();

	/*
	State transitions here:
	Profile pc, name, PK
	Total Ether, equivalent AED amount
	*/

	let WalletBody = () => {
		return router.pathname == "/" ? (
			<WalletPortfolio />
		) : (
			<WalletTransactions />
		);
	};

	return (
		<div className="h-screen">
			<section className="w-3/5 h-4/5 mx-auto bg-gray-800 rounded-b-xl shadow-2xl flex flex-row items-center space-x4">
				<div className="h-full rounded-bl-xl w-2/5 bg-gray-900 divide-y divide-gray-600 px-6">
					{/* <FaUserAlt className="fill-current text-white mx-auto h-1/2 w-1/2" />

					<div className="">
					</div> */}
					<WalletProfile />
					{/* This div will be replaced by Credentials component for wallet ID and name of the account (fetched from metamask using web3) */}
				</div>
				<div className="h-full w-3/5 flex flex-col">
					<WalletDetails />
					<WalletBody />
				</div>
				<br />
			</section>
		</div>
	);
};

export default Wallet;
