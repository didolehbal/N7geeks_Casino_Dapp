import CasinoContract from './contracts/Casino.json'

const options = {
  contracts: [CasinoContract],
  events: {
    Casino: ['hasWon',"unfortunate"],
},
syncAlways:true
};

export default options;