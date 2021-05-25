import Head from "next/head";
import { siteTitle } from "../Components/Layout";
import Navbar from "../Components/Navbar";
import Trade from "../Components/trade/Trade";
import Footer from "../Components/Footer";

/* 
	index 	--> trade			--> buy & sell dxt + fetch subgraph API data
			--> transactions	--> Fetch Buy & Sell events
*/

export default function Home() {
	return (
		<div className="bg-gray-100">
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<Navbar />
			<Trade />
			<Footer />
		</div>
	);
}
