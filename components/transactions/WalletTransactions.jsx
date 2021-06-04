import React from "react";
import { useState, useEffect } from "react";
import { initializeContracts } from "../../web3.js";

const WalletTransactions = ({ data }) => {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		setEvents(data);
		return;
	}, [events]);
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
										className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Event
									</th>
									<th
										scope="col"
										className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										DXT Amount
									</th>
									<th
										scope="col"
										className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Wallet
									</th>
									<th
										scope="col"
										className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										TxHash
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{/* {console.log(data)} */}
								{data.map((data, index) => (
									<tr key={index}>
										<td className=" py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="ml-4">
													<div className="text-xs font-mono text-gray-900">
														{data.event}
													</div>
												</div>
											</div>
										</td>
										<td className=" py-4 whitespace-nowrap">
											<div className="text-xs font-mono text-gray-900 mx-10">
												{Number.parseInt(data.returnValues[1] * 10e-19)}
											</div>
										</td>
										<td className=" py-4 whitespace-nowrap">
											<span className="text-xs font-mono text-gray-900">
												{data.returnValues[0].slice(0, 20) + "..."}
											</span>
										</td>
										<td className=" py-4 whitespace-nowrap">
											<span className="text-xs font-mono text-gray-900">
												{data.transactionHash.slice(0, 20) + "..."}
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
