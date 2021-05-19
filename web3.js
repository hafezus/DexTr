const Web3 = require("web3");
const TradeDxt = require("./smart_contracts/build/contracts/TradeDxt.json");
const TradeHelper = require("./smart_contracts/build/contracts/TradeHelper.json");
const { networks } = require("./smart_contracts/truffle-config");

let web3js;
// let id;
let tradeContract;
let tradeHelperContract;
let accounts;
let contractBalance;
let eventsList = [];
// let network;
// let events = [];

const initializeWeb3 = async () => {
	if (window.ethereum) {
		await ethereum.request({ method: "eth_requestAccounts" });
		web3js = new Web3(window.ethereum);
		console.log(web3.currentProvider);
		return web3js;
	} else {
		return null;
	}
};

const initializeContracts = async () => {
	web3js = await initializeWeb3();
	if (web3js !== null) {
		tradeContract = new web3js.eth.Contract(
			TradeDxt.abi,
			"0x86FC74fc04bF37CD52e4688EE58DC3C791123D09"
		);
		tradeHelperContract = new web3js.eth.Contract(
			TradeHelper.abi,
			"0xca4663F49a439b617955101Bfd440cCC13E1bF4A"
		);
		accounts = await web3js.eth.getAccounts();
		contractBalance = await tradeContract.methods
			.balanceOf("0xE8Cdc28717eAE90F34197d662E36404C7cd70709")
			.call({
				from: accounts[0],
			});

		await tradeContract
			.getPastEvents(
				"NewPurchase",
				{
					filter: {}, // Using an array means OR: e.g. 20 or 23
					fromBlock: 0,
					toBlock: "latest",
				},
				function (error, events) {}
			)
			.then(function (events) {
				eventsList = eventsList.concat(events); // same results as the optional callback above
			});
		await tradeContract
			.getPastEvents(
				"NewSale",
				{
					filter: {}, // Using an array means OR: e.g. 20 or 23
					fromBlock: 0,
					toBlock: "latest",
				},
				async function (error, events) {}
			)
			.then(function (events) {
				//console.log(events); // same results as the optional callback above
				eventsList = eventsList.concat(events);
			});

		console.log(eventsList);

		return {
			tradeContract,
			tradeHelperContract,
			accounts,
			contractBalance,
			eventsList,
		};
	} else {
		return undefined;
	}
};

export { initializeWeb3, initializeContracts };
