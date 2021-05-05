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
    
    uint256 public total_supply;
    uint256 public reservedAmount;
    uint256 public remaining;
    uint256 public releasedTokens;
    address public owner;
    
    //mapping (address => mapping (address => uint256)) private _allowances;
    //mapping (address => uint256) private _balances;
    
    modifier onlyOwner() virtual {
        require(owner == msg.sender, "Not owner");
        require(msg.sender == 0x34d5F8c13E6B106f3fcbA178b444627f3b6a7E6d, "Not Owner");
        _;
    }
     
    constructor() ERC20("Dextr", "DXT") public payable {
        total_supply = 1_000_000;
        owner = msg.sender;
        _mint(owner, total_supply); //total supply = 1 mil
        reservedAmount = 250_000;
        remaining = total_supply - reservedAmount;
        releasedTokens = 0; //Must not exceed 750_000 at any point
    }
    
    //-----------------------------overridden functions from ERC20 contract-----------------------------//
    function transfer(address _account, uint256 _amount) public override returns (bool){
        //require(balanceOf(_account) + _amount <= totalSupply() && _amount >= remaining, "Transfer failed: Transfer amount exceeds remaining tokens or exceeds circulating amount (released tokens + remaining + _amount > 750,000 tokens.");
        require(releasedTokens + remaining <= 750_000, "Transfer failed: Transfer amount exceeds remaining tokens or attempting to transfer over total supply.");
        _transfer(_msgSender(), _account, _amount);
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
    
    // function transferFrom(address _sender, address _recipient, uint256 _amount) override public returns(bool) {
    //     _transfer(_sender, _recipient, _amount);

    //     uint256 currentAllowance = _allowances[_sender][_msgSender()];
    //     require(currentAllowance >= _amount, "ERC20: transfer amount exceeds allowance");
    //     _approve(_sender, _msgSender(), currentAllowance - _amount);
        
    //     return true;
    // }
    
    /*
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
    */
    
    function increaseAllowance(address spender, uint256 addedValue) public override returns (bool) {
        require(remaining+addedValue<=reservedAmount);
        super.increaseAllowance(spender, addedValue);
        return true;
    }
    
    function decreaseAllowance(address spender, uint256 subtractedValue) public override returns (bool) {
        // uint256 currentAllowance = _allowances[_msgSender()][spender];
        // require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        // _approve(_msgSender(), spender, currentAllowance - subtractedValue);
        
        //Double-check sequence of statement executions to ensure 'remaining' is deducted in the correct line.
        remaining+=subtractedValue;
        super.decreaseAllowance(spender, subtractedValue);

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
        require(_account != owner && _account != address(0) && _amount < remaining, "This minting is only for non-owner addresses");
        mintDex(_account, _amount);
        burnDex(owner, _amount);
        
        require(remaining>_amount, "Insufficient transferable tokens in contract");
        
        total_supply-=_amount;
        remaining-=_amount;
        releasedTokens+=_amount;
    }
    
    
    function userBurn(address _account, uint _amount) public {
        require(_account!=owner && _amount+remaining<= total_supply, "This burning is only for non-owner addresses");
        burnDex(_account, _amount);
        mintDex(owner, _amount);
        
        total_supply+=_amount;
        remaining+=_amount;
        releasedTokens-=_amount; //reclaim token into treasury
    }
    
    
    // function _burnFromRemaining(uint _amount) internal {
    //     remaining -= _amount;
    //     _burn(owner, _amount);
    // }
    
    
    
}