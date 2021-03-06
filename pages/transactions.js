import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import WalletTransactions from "../Components/transactions/WalletTransactions";
import Head from "next/head";
import { initializeContracts } from "../web3.js";
import Layout, { siteTitle } from "../Components/Layout";
import { useState, useEffect } from "react";
const Transactions = () => {
	const [data, setData] = useState([]);

	useEffect(async () => {
		const contracts = await initializeContracts();
		setData(contracts.eventsList);
	}, []);

	return (
		<div className="bg-gray-100">
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<Navbar />
			<WalletTransactions data={data} />
			<Footer />
		</div>
	);
};

export default Transactions;
