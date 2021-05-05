import React from "react";
import { BiCartAlt } from "react-icons/bi";
import { CgArrowsExchange } from "react-icons/cg";

const WalletDetails = () => {
	return (
		<div className="w-full h-1/4 bg-gray-600 flex flex-row ">
			<div className="flex flex-col w-5/6 bg-gray-700 p-6 justify-end">
				<span className="text-3xl ether-amount text-white">500 ETH</span>
				<span className="dollar-amount text-gray-400">1000</span>
			</div>
			<div className="flex flex-col w-1/6 bg-gray-800 my-auto">
				<button className="bg-blue-800 shadow-md text-gray-200 p-4 rounded-full mx-auto my-2 hover:bg-blue-900 transition duration-300 ease-in-out focus:outline-none">
					<BiCartAlt className="mx-3" />
				</button>
				<button className="bg-red-400 shadow-md text-gray-200 p-4 rounded-full mx-auto my-2 hover:bg-red-500 transition duration-300 ease-in-out focus:outline-none">
					<CgArrowsExchange className="mx-3" />
				</button>
			</div>
		</div>
	);
};

export default WalletDetails;
