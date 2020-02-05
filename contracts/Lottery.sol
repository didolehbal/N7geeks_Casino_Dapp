pragma solidity >=0.5.0 <0.7.0;
import "./Types.sol";

contract Lottery {
    uint8 constant NB_PLAYERS_PER_ROUND = 2;
    uint56 constant MINIMUM_ETHER = 1 finney ;

    address payable owner;
    mapping(address => Types.Member) members;

    address[NB_PLAYERS_PER_ROUND] playersPool;
    uint8 playersCount = 0;


    constructor() public {
        owner = msg.sender;
    }
    function random() private view returns (uint8) {
        return
            uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(block.timestamp, block.difficulty)
                    )
                ) %
                    251
            );
    }
    function joinRound() public payable {
        require(msg.value >= MINIMUM_ETHER, "minimum is 1 finney");
        require(playersCount < NB_PLAYERS_PER_ROUND, "this Round is full, try later again.");
        members[msg.sender].balance += msg.value;
        playersPool[playersCount] = msg.sender;
        playersCount++;
        if (playersCount == NB_PLAYERS_PER_ROUND) {
            uint8 winnerIndex = random() % NB_PLAYERS_PER_ROUND;
            address winner = playersPool[winnerIndex];
            for (uint8 i = 0; i < NB_PLAYERS_PER_ROUND; i++) {
                if (i == winnerIndex) continue;
                members[playersPool[i]].balance -= 1000;
            }
            members[winner].balance += (NB_PLAYERS_PER_ROUND - 1) * 1000 - 500;
            playersCount = 0;
        }
    }
    function deposit() public payable {
        require(msg.value > 0, "amount must be greater than 0");
        members[msg.sender].balance += msg.value;
    }
    function withdraw() public {
        Types.Member storage current = members[msg.sender];
        require(current.balance > 0, "unsufficient balance !");
        uint amount = current.balance;
        current.balance = 0;
        msg.sender.transfer(amount);
    }
    function consultBalance() public view returns (uint256) {
        Types.Member storage current = members[msg.sender];
        uint256 balance = current.balance;
        return balance;
    }

    function checkProfit() public view returns (uint256) {
        return address(this).balance;
    }
}
