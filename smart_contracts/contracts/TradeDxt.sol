pragma solidity ^0.8.0;
import "./TradeHelper.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TradeDxt is ERC20, TradeHelper {
    modifier onlyOwner() override(TradeHelper) {
        require(msg.sender == _owner, "Not owner of contract, cannot call function.");
        _;
    }
    constructor() ERC20("Dextr", "DXT") public payable {
        _owner = msg.sender;
        _mint(address(this), 1000000*(10 ** uint256(decimals()))); //total supply = 1 mil
    }
    modifier nonZeroAddress(address _receiver) {
        require(_receiver!=address(0), "Non-zero address check");
        _;
    }
    function buyDxt(address _buyer, uint256 _amount) public payable nonZeroAddress(_buyer) {
        //buy dxt from contract (pay contract with ether amount specified in front-end)
        require(msg.sender == _buyer && _amount < totalSupply(), "Error: Not enough Ether in address");
        _transfer(address(this), _buyer, _amount * (10 ** uint256(decimals())));
        require(msg.value>0, "No ether sent");
        emit NewPurchase(_buyer, _amount*(10 ** uint256(decimals())));
    }
    function sellDxt(address payable _seller, uint256 _amount) public nonZeroAddress(_seller) {
        //sell dxt to contract (if contract has ether balance)
        require(_amount*(10 ** uint256(decimals())) <= balanceOf(_seller)
        && address(_seller).balance > _convertToEth(_amount), "Error: Seller - not enough tokens / contract: not enough ether");
        _transfer(_seller, address(this), _amount*(10 ** uint256(decimals())));
        _seller.transfer(_convertToEth(_amount));
        emit NewSale(_seller, _amount*(10 ** uint256(decimals())));
    }
    function contractBalance() public view returns (uint256) {
        //check contract's ether balance
        return address(this).balance;
    }
    event NewPurchase(address indexed _buyer, uint256 indexed _amount);
    event NewSale(address indexed _seller, uint256 indexed _amount);
}
