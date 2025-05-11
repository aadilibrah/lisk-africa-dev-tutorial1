const { ethers } = require ("hardhat");
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Contract = await ethers.getContractFactory("TodoList");
    const contract = await Contract.deploy(); // Add constructor args if needed
  
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });