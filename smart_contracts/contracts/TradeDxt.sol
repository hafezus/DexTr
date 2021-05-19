pragma solidity ^0.8.0;
import "./Dextr.sol";
import "./TradeHelper.sol";

contract TradeDxt is Dextr, TradeHelper {
    modifier onlyOwner() override(Dextr, TradeHelper) {
        require(msg.sender == owner, "Not owner of contract, cannot call function.");
        _;
    }
    constructor() payable {
        owner = msg.sender;
        //payable(address(this)).send(1000000000000 wei);
        //_mint(address(this), 1000000 * (10 ** uint256(decimals())));
    }
    modifier nonZeroAddress(address _receiver) {
        require(_receiver!=address(0), "Non-zero address check");
        _;
    }
    function buyDxt(address _buyer, uint256 _amount) external payable {
        //call from buyer's address
        require(msg.sender == _buyer && _amount < totalSupply(), "Error: Not enough Ether in address"); // && _convertToEth(_amount) > msg.value
        _transfer(address(this), _buyer, _amount * (10 ** uint256(decimals())));
        require(msg.value>0, "No ether sent");
        //payable(address(this)).call{value: _convertToEth(msg.value)}("");
        emit NewPurchase(_buyer, _amount*(10 ** uint256(decimals())));
    }
    function sellDxt(address payable _seller, uint256 _amount) public { //call from deployer's address
        require(msg.sender == _seller && _amount*(10 ** uint256(decimals()))
        <= balanceOf(_seller) && address(_seller).balance > _convertToEth(_amount), "Error: Seller - not enough tokens / contract: not enough ether");
        _transfer(msg.sender, address(this), _amount);
        _seller.transfer(_convertToEth(_amount));
        emit NewSale(_seller, _amount*(10 ** uint256(decimals())));
    }
    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    // fallback() payable external {
    //     buyDxt(address _buyer, uint256 _amount);
    // }
    //Review: Complete TraderHelper to set dxt uint256 value wrt ether
    event NewPurchase(address indexed _buyer, uint256 indexed _amount);
    event NewSale(address indexed _seller, uint256 indexed _amount);
}
