import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const people = [
	{
		name: "Jane Cooper",
		title: "Regional Paradigm Technician",
		department: "Optimization",
		role: "Admin",
		email: "jane.cooper@example.com",
		image:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
	},
	// More people...
];
const GraphData = ({ graphdata }) => {
	//const axios = axios();
	const [data, setData] = useState([]);
	const retrieveGraphData = async () => {
		try {
			const data = await axios.post(
				"https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
				{
					query: `
					{
						pairs (
						  orderBy: volumeUSD, 
						  orderDirection: desc
						  where: {
							token0_contains: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
						  },
						  first: 25
						) {
						  token0 {
							symbol
							tradeVolumeUSD
						  }
						  token1 {
							symbol
							tradeVolumeUSD
						  }
						}
					  }					  
					`,
				}
			);
			console.log(data.data.data.pairs);
			setData(data.data.data.pairs);
			return data;
		} catch (e) {
			console.log("Error: ", e);
		}
	};

	useEffect(async () => {
		await retrieveGraphData();
	}, [data]);

	return (
		<div className="flex flex-col w-auto mx-32 mt-32 shadow-xl">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Token
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Trade Volume (USD)
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Status
									</th>
									{/* <th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Role
									</th> */}
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{console.log(data)}
								{data.map((pair) => (
									<tr key={pair.token1.symbol}>
										<td className="px-2 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="ml-4">
													<div className="text-sm font-medium text-gray-900">
														{pair.token1.symbol}
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{(Math.round(pair.token1.tradeVolumeUSD * 100) / 100)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
												Active
											</span>
										</td>
									</tr>
								))}
							</tbody>
							{/* <tbody className="bg-white divide-y divide-gray-200">
								{people.map((person) => (
									<tr key={person.email}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
													<img
														className="h-10 w-10 rounded-full"
														src={person.image}
														alt=""
													/>
												</div>
												<div className="ml-4">
													<div className="text-sm font-medium text-gray-900">
														{person.name}
													</div>
													<div className="text-sm text-gray-500">
														{person.email}
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{person.title}
											</div>
											<div className="text-sm text-gray-500">
												{person.department}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
												Active
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{person.role}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<a
												href="#"
												className="text-indigo-600 hover:text-indigo-900"
											>
												Edit
											</a>
										</td>
									</tr>
								))}
							</tbody> */}
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GraphData;
