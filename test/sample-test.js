const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const FiredGuys = await ethers.getContractFactory("FiredGuys");
    const firedguys = await FiredGuys.deploy();
    await firedguys.deployed();

    const recipient = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
    const metadataURI = 'cid/test.png';

    let balance = await firedguys.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await firedguys.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.01') });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await firedguys.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await firedguys.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await firedguys.payToMint(recipient, 'foo', { value: ethers.utils.parseEther('0.05') });
  });
});