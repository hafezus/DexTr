pragma solidity ^0.8.3;

// import './Ownable.sol';

//ERC20
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//SafeMath
//import "github.com/ConsenSysMesh/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol";

/* 
@Title: DexTr token contract
@auther: Verde 8)
@notice: contract for DexTr token -- transfer tokens (between user addresses or the contract itself)
Todo: check if approve function changes  
*/
contract Dextr is ERC20 {
    
    uint256 public reservedAmount;
    uint256 public remaining;
    uint256 public releasedTokens;
    address public owner;
    
    modifier onlyOwner() virtual {
        require(owner == msg.sender, "Not owner");
        require(msg.sender == 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, "Not Owner");
        _;
    }
     
    constructor() ERC20("Dextr", "DXT") public payable {
        owner = msg.sender;
        //_mint(owner, 1_000_000); //total supply = 1 mil
        _mint(address(this), 1000000*(10 ** uint256(decimals()))); //total supply = 1 mil
        reservedAmount = 250000*(10 ** uint256(decimals()));
        remaining = totalSupply() - reservedAmount;
        releasedTokens = 0; //Must not exceed 750_000 at any point
    }
    
    //-----------------------------overridden functions from ERC20 contract-----------------------------//
    function transfer(address _account, uint256 _amount) public override returns (bool){
        //require(balanceOf(_account) + _amount <= totalSupply() && _amount >= remaining, "Transfer failed: Transfer amount exceeds remaining tokens or exceeds circulating amount (released tokens + remaining + _amount > 750,000 tokens.");
        require(releasedTokens + remaining <= 750_000, "Transfer failed: Transfer amount exceeds remaining tokens or attempting to transfer over total supply.");
        _transfer(address(this), _account, _amount);
        remaining-=_amount;
        releasedTokens+=_amount;
        return true;
    }
    function approve(address _spender, uint256 _amount) public override returns (bool) {
        _approve(_msgSender(), _spender, _amount);
        //remaining -= _amount;
        releasedTokens+=_amount;
        return true;
    }
    //-----------------------------Dextr-----------------------------//
    
    //Mint DEX (must be less than 1 mil)
    function mintDex(address _account, uint _amount) onlyOwner public { //change to private after testing
        require(remaining + reservedAmount < 1_000_000 && totalSupply() <= 1_000_000, "Cannot exceed 1mil tokens at any given point");
        _mint(_account, _amount);
        remaining+=_amount;
    }
    
    //Burn DEX (must not exceed reservedAmount)
    function burnDex(address _account, uint _amount) onlyOwner public { //change to private after testing
        require(totalSupply()-_amount >= reservedAmount, "Burning token cannot exceed reserved amount"); //reserved
        _burn(_account, _amount);
        remaining-=_amount;
    }
    
    //Mint DEX for user, and burn from contract accordingly
    function userMint(address _account, uint _amount) public {
        require(_account != address(this) && _account != address(0) && _amount < remaining, "This minting is only for non-owner addresses");
        mintDex(_account, _amount);
        burnDex(address(this), _amount);
        
        require(remaining>_amount, "Insufficient transferable tokens in contract");
        remaining-=_amount;
        releasedTokens+=_amount;
    }
    
    
    function userBurn(address _account, uint _amount) public {
        require(_account!=address(this) && _amount+remaining<= totalSupply(), "This burning is only for non-owner addresses");
        burnDex(_account, _amount);
        mintDex(address(this), _amount);
        
        //total_supply+=_amount;
        remaining+=_amount;
        releasedTokens-=_amount; //reclaim token into treasury
    }
    
    
    function _burnFromRemaining(uint _amount) internal {
        remaining -= _amount;
        _burn(owner, _amount);
    }
}