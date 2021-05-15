import React from "react";

const PendingTransactions = ({ userId }) => {
	const list = [1, 2, 3, 4, 5, 6, 7, 8];
	return (
		<>
			<select
				name="list"
				id="id"
				className="mx-auto w-4/5 rounded-md focus:outline-none cursor-pointer"
			>
				{list.map((item, idx) => {
					return <option value={idx}>{item}</option>;
				})}
			</select>
		</>
	);
};

export default PendingTransactions;
