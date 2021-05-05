import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "../../Components/layout";
import Navbar from "../../Components/navbar";
import Wallet from "../../Components/wallet/wallet";
const FirstPost = () => {
	return (
		<>
			<Head>
				<title>First post</title>
			</Head>
			<Navbar />
			{/* <h1>First Post!</h1>
			<h2>
				<Link href="/">
					<a className="text-blue-500">Back to home!</a>
				</Link>
			</h2> */}
			<Wallet />
			{/* <Image src="/images/profile.jpg" height={144} width={144} /> */}
		</>
	);
};

export default FirstPost;
