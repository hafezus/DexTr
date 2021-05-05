pragma solidity ^0.8.0;

import "./Dextr.sol";
import "./TradeHelper.sol";

//Why take out a loan for Dex?
//Shorting, longing?

contract TradeDxt is Dextr, TradeHelper {
    //Buy, sell, donate, loan, borrow dex for eth
    //Use timer calculator, interest rate setter, etc. in a helper contract in a separate file named like "DexHelper.sol"
    //address owner;
    struct PendingLoan {
        address _borrower;
        address _lender;
        uint256 _amount;
        uint32 _timeFrame;
    }

    struct PurchaseRequest {
        uint256 _amount;
        bool completed;
    }
    mapping (address => PurchaseRequest) public purchaseRequests;
    mapping (uint => PendingLoan) pendingLoans; //array manipulation would be expensive on the blockchain
    modifier onlyOwner() override(Dextr, TradeHelper) {
        require(msg.sender == owner, "Not owner of contract, cannot call function.");
        _;
    }
    constructor() payable {
        //owner = msg.sender;
    }
    modifier nonZeroAddress(address _receiver) {
        require(_receiver!=address(0), "Zero Address");
        _;
    }
    //Adds new purchase for given buyer
    function buyDxt(address _buyer, uint256 _amount) public payable {
        require(_convertToEth(_amount) > _buyer.balance);
        PurchaseRequest memory pendingPurchase = PurchaseRequest(_amount, false);
        purchaseRequests[_buyer] = pendingPurchase;
        emit NewPurchaseRequest(_buyer, _amount);
    }
    function sellDxt(address payable _buyer, address payable _seller, uint256 _amount) public nonZeroAddress(_buyer) payable {
        //check with shadab how to transfer ether between addresses
        9require(_amount == purchaseRequests[_buyer]._amount && purchaseRequests[_buyer].completed == false,
        "Sell amount and requested buy amount mismatch / already sold.");
        //PurchaseRequest memory purchaseReq = purchaseRequests[_buyer];
        emit CompletedTransaction(_buyer, _seller, _amount);
        _transfer(_seller, _buyer, _amount); //override transfer to include transaction fee
        _seller.transfer(_convertToEth(_amount));
        //_amount = 0; //for security, set amount to 0 right after transfer
        purchaseRequests[_buyer].completed = true;
    }
    //Review: Complete TraderHelper to set dxt uint256 value wrt ether
    //TODO: Update balances of accounts
    event CompletedTransaction(address indexed _buyer, address indexed _seller, uint256 indexed _amount);
    event NewPurchaseRequest(address indexed _buyer, uint256 indexed _amount);
}

//TODO:
//User can buy and sell Dex for ether //functional
//User can borrow ether from lender (lender benefits with interest)
//User can loan dex for ether to lender (lender benefits with interest) / Express in USDT in frontend
//User can view list of all loaners and their transaction history (for trustworthiness)

//Event for sale and purchase
//Event for loan/borrow

//Traderhelper Contract:

//Set Dex token's value w.r.t Eth/USDT
//Set transaction rate in Eth
//Calculate time frame now() vs. when loan agreement was made