const Dextr = artifacts.require("./Dextr.sol");
const TradeHelper = artifacts.require("./TradeHelper.sol");
const TradeDxt = artifacts.require("./TradeDxt.sol");

module.exports = async function (deployer, accounts) {
	await deployer.deploy(Dextr);
	await deployer.deploy(TradeHelper);
	await deployer.deploy(TradeDxt); //, { value: "100000000000000000" }
};
