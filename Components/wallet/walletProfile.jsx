import React from "react";
import { FaUserAlt } from "react-icons/fa";

const WalletProfile = () => {
	return (
		<>
			<FaUserAlt className="fill-current text-white mx-auto h-1/2 w-1/2" />

			<div className="flex flex-col p-3">
				{/* This div will be replaced by Credentials for name and wallet PK of the account (fetched from metamask using web3) */}
				<h1 className="text-gray-200 text-5xl mx-auto my-3">Name</h1>
				<code className="text-gray-200 text-xl mx-auto my-3">[Public Key]</code>
			</div>
		</>
	);
};

export default WalletProfile;
