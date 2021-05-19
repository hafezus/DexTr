pragma solidity^0.8.0;

contract TradeHelper{
    uint256 public tradeRate; //= 0.0000000000000025 ether; //2500 wei trading reference
    uint256 public interestRate;
    address internal _owner;
    modifier onlyOwner() virtual {
        require(_owner == msg.sender, "Not owner of contract");
        _;
    }
    constructor() {
        tradeRate = 1000 wei;
        interestRate = 10000 wei;
        _owner = msg.sender;
    }
    function _convertToEth(uint256 _amount) public view returns(uint256) {
        return _amount * tradeRate;
    }
}