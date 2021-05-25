import Head from "next/head";
import { siteTitle } from "../components/Layout";
import Navbar from "../components/Navbar";
import Trade from "../components/trade/Trade";
import Footer from "../components/Footer";

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
