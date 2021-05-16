import React from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import Wallet from "../Components/transactions/wallet";
import Head from "next/head";

import Layout, { siteTitle } from "../Components/layout";

const Transactions = () => {
	return (
		<div className="h-100 ">
			{/* className={utilStyles} */}
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<Navbar />
			{/* <Wallet /> */}
			<Footer />
		</div>
	);
};

export default Transactions;
