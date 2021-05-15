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
	const retrieveGraphData = async () => {
		try {
			const data = await axios.post(
				"https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
				{
					query: `
					{
						pairs (
						  orderBy: volumeUSD, 
						  orderDirection: desc
						  where: {
							token0_contains: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
						  },
						  first: 10
						) {
						  token0 {
							symbol
							tradeVolumeUSD
						  }
						  token1 {
							symbol
							tradeVolumeUSD
						  }
						}
					  }					  
					`,
				}
			);
			return data;
		} catch (e) {
			console.log("Error: ", e);
		}
	};

	return (
		<div className="bg-gray-100">
			{/* overflow hidden prevents Wallet contents from leaking into Footer */}
			{/* className={utilStyles} */}
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<Navbar />
			<Wallet graphdata={retrieveGraphData()} />
			<Footer />
		</div>
	);
}
