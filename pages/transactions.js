import React from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import WalletTransactions from "../Components/transactions/walletTransactions";
import Head from "next/head";
import { initializeContracts } from "../web3.js";
import Layout, { siteTitle } from "../Components/layout";
import { useState, useEffect } from "react";
const Transactions = () => {
	const [data, setData] = useState([]);

	useEffect(async () => {
		const contracts = await initializeContracts();
		setData(contracts.eventsList);
		// console.log(contracts.eventsList);
	}, []);

	return (
		<div className="bg-gray-100">
			{/* className={utilStyles} */}
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<Navbar />
			{/* <Wallet /> */}
			<WalletTransactions data={data} />
			<Footer />
		</div>
	);
};

export default Transactions;
