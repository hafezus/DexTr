import Head from "next/head";
import Layout, { siteTitle } from "../Components/layout";
//import utilStyles from "../styles/utils.module.css";
import Navbar from "../Components/navbar";
import Wallet from "../Components/wallet/wallet";
import Footer from "../Components/footer";
import axios from "axios";

/* 

/				--->	wallet/Wallet	--->	WalletProfile	+	WalletDetails 	+	[WalletPortfolio]
/transactions	--->	wallet/Wallet	--->	WalletProfile	+	WalletDetails	+	[WalletTransactions]


Fix the directory structure 
(1) place walletTransactions within the wallet folder, delete transactions/wallet.jsx
(2) Remove pages/posts/ directory
*/

export default function Home() {
	return (
		<div className="bg-gray-100">
			{/* overflow hidden prevents Wallet contents from leaking into Footer */}
			{/* className={utilStyles} */}
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<Navbar />
			<Wallet />
			<Footer />
		</div>
	);
}
