import Head from "next/head";
import Layout, { siteTitle } from "../Components/layout";
//import utilStyles from "../styles/utils.module.css";
import Navbar from "../Components/navbar";
import Trade from "../Components/trade/trade";
import Footer from "../Components/footer";
import axios from "axios";

/* 
	index 	--> trade			--> buy & sell dxt + fetch subgraph API data
			--> transactions	--> Fetch Buy & Sell events
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
			<Trade />
			<Footer />
		</div>
	);
}
