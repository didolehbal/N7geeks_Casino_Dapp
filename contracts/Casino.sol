pragma solidity >=0.5.0 <0.7.0;

contract Casino {

    event hasWon(address winner,uint8 bet ,uint256 amount);
    event unfortunate(uint8 bet, uint8 jackpot);

    uint64 constant MINIMUM_AMOUNT_TO_PLAY = 250 finney;
    address payable owner;
    uint8 constant WHEEL_LENGTH = 12;
    mapping(uint8 => bool) private POSSIBLE_BETS;
    uint8[] Wheel = [1,3,1,10,1,3,1,5,1,5,3,1,10,1,3,1,5,1,3,1,20,1,3,1,5];

    constructor() public {
        owner = msg.sender;
        POSSIBLE_BETS[1] = true;
        POSSIBLE_BETS[3] = true;
        POSSIBLE_BETS[5] = true;
        POSSIBLE_BETS[10] = true;
        POSSIBLE_BETS[20] = true;
    }

    function random() private view returns (uint8) {
        return
            uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(block.timestamp, block.difficulty)
                    )
                )%  251
            );
    }

    function play(uint8 bet) public payable returns(uint256 amount, uint8 jackpot ) {
        require(
            msg.value > MINIMUM_AMOUNT_TO_PLAY,
            "MINIMUM amount is 250 finney | 0.25 ETHER"
        );
        require(
            address(this).balance > bet * msg.value,
            "out of cash !"
        );
        require(POSSIBLE_BETS[bet], "bet out of Range");
        
        uint8 winningIndex = random() % WHEEL_LENGTH;
        jackpot = Wheel[winningIndex];
        
        if(bet == jackpot){
            amount = jackpot * msg.value + msg.value;
            msg.sender.transfer(amount);
            emit hasWon(msg.sender,bet,amount);
        }
        else{
            emit unfortunate(bet,jackpot);
        }
    }

}
