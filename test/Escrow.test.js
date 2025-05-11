const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow Contract", function () {
  let escrow, payer, payee, arbiter;

  beforeEach(async () => {
    [payer, payee, arbiter, other] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("Escrow", payer);
    escrow = await Escrow.deploy(payee.address, arbiter.address, { value: ethers.utils.parseEther("1") });
    await escrow.deployed();
  });

  it("should deploy with correct parties", async () => {
    expect(await escrow.payer()).to.equal(payer.address);
    expect(await escrow.payee()).to.equal(payee.address);
    expect(await escrow.arbiter()).to.equal(arbiter.address);
  });

  it("should only allow arbiter to approve", async () => {
    await expect(escrow.connect(payer).approve()).to.be.revertedWith("Only arbiter can approve");
    await expect(escrow.connect(other).approve()).to.be.revertedWith("Only arbiter can approve");

    await expect(escrow.connect(arbiter).approve()).to.changeEtherBalances(
      [escrow, payee],
      [ethers.utils.parseEther("-1"), ethers.utils.parseEther("1")]
    );

    expect(await escrow.isApproved()).to.equal(true);
  });

  it("should not allow double approval", async () => {
    await escrow.connect(arbiter).approve();
    await expect(escrow.connect(arbiter).approve()).to.be.revertedWith("Already approved");
  });

  it("fuzz test: only arbiter can approve with random address", async () => {
    const wallets = await ethers.getSigners();
    for (const user of wallets) {
      if (user.address !== arbiter.address) {
        await expect(escrow.connect(user).approve()).to.be.revertedWith("Only arbiter can approve");
      }
    }
  });
});
