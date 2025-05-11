require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

//const { json } = require('hardhat/internal/core/params/argumentTypes');

module.exports = {
  solidity: "0.8.28",

networks: {  
  liskSepolia: {  
      url: 'https://rpc.sepolia-api.lisk.com',  
      chainId: 4202,  
      accounts: [process.env.PRIVATE_KEY],  
  },  
  liskMainnet: {  
      url: 'https://rpc.api.lisk.com',  
      chainId: 204,  
      accounts: [process.env.PRIVATE_KEY],  
  },  
}  
};

if (!process.env.RPC_URL) {  
throw new Error("Please set your RPC_URL in a .env file");  
}  

if (!process.env.PRIVATE_KEY) {  
throw new Error("Please set your PRIVATE_KEY in a .env file");  
}  

