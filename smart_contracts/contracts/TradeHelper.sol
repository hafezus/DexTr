pragma solidity^0.8.0;

/// @title TradeHelper contract for rate DXT ether rate conversions
/// @author verdehile
/// @notice This contract is used as a helper to calculate the value of DXT tokens (1 DXT = 1000 Wei)
/// @dev The convertToEth method is used in: (1) rate conversions in buyDxt and sellDxt methods in TradeDxt (2) The frontend to dynamically calculate the buy or sell amount input
contract TradeHelper{
    uint256 public tradeRate; //= 0.0000000000000025 ether; //2500 wei trading reference
    uint256 public interestRate;
    address internal _owner;
    modifier onlyOwner() virtual {
        require(_owner == msg.sender, "Not owner of contract");
        _;
    }
    //set tradeRate of DXT to ETH to 1000 wei per token
    constructor() {
        tradeRate = 1000 wei;
        _owner = msg.sender;
    }
    //convert DXT amount to Eth
    function _convertToEth(uint256 _amount) public view returns(uint256) {
        return _amount * tradeRate;
    }
}