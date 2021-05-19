import React from "react";
import { useState, useEffect } from "react";
import { initializeContracts } from "../../web3.js";

const WalletTransactions = ({ data }) => {
	// const people = [
	// 	{
	// 		name: "Jane Cooper",
	// 		title: "Regional Paradigm Technician",
	// 		department: "Optimization",
	// 		role: "Admin",
	// 		email: "jane.cooper@example.com",
	// 		image:
	// 			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
	// 	},
	// 	// More people...
	// ];

	const [txType, setTxtype] = useState(0);

	//const [data, setData] = useState([]);
	//1 -> Buy Event
	//2 -> Sell Event
	//const contracts = await initializeContracts();
	// let data = [];
	// useEffect(async () => {
	// 	const contracts = initializeContracts();
	// 	console.log(contracts.events);
	// 	return;
	// }, []);

	return (
		<div className="flex flex-col w-2/3 mx-auto mt-32 shadow-xl">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden h-1/2 border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200 h-10">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Event
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										DXT Amount
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Wallet
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										TxHash
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{/* {console.log(data)} */}
								{data.map((data) => (
									<tr key={data.transactionHash}>
										<td className="px-2 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="ml-4">
													<div className="text-xs font-mono text-gray-900">
														{data.event}
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-xs font-mono text-gray-900">
												{data.returnValues[1] * 10e-19}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="text-xs font-mono text-gray-900">
												{data.returnValues[0]}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="text-xs font-mono text-gray-900">
												{data.transactionHash}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WalletTransactions;
