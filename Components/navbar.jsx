import React from "react";
import { FaEthereum, FaUserAlt } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import Link from "next/link";
const Navbar = () => {
	return (
		<div className="flex bg-indigo-500 text-white relative">
			<div className="flex my-auto">
				<div className="container">
					<FaEthereum className="my-auto mx-5 h-20" />
				</div>
				<Link href="/">
					<a className="text-2xl align-middle my-auto px-2">
						De<span className="text-pink-400 text-2xl ">X</span>tr
					</a>
				</Link>
			</div>

			<div className="flex-grow"></div>
			<ul className="inline-flex flex-shrink my-auto mx-auto">
				<li className="px-5 h-full hover:underline mx-auto  font-semibold ">
					<Link href="/">
						<a>Wallet</a>
					</Link>
				</li>
				<li className="px-5 h-full hover:underline mx-auto  font-semibold ">
					<Link href="/transactions">
						<a>Transactions</a>
					</Link>
				</li>
			</ul>
			<div className="flex-grow"></div>
			<GrStatusGoodSmall className="my-auto mx-5 h-20 fill-current connected:text-green-500 text-red-500" />
		</div>
	);
};

export default Navbar;
