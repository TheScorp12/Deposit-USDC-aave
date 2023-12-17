import json from "./contract.json";
const { ethers } = require("ethers");

// this one is for FlashLoan.sol
const DEPLOYED_CONTRACT_ADDRESS = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8";
const reciever_Contract_Address = "0x058b6Bc4AB234Ba1d8e285f022bec0548aeFeAE3"
async function getAbi() {
	const abi = json;
	return abi;
}

async function sendamount(signer, amount) {
	amount = amount * 1000000;
	console.log(amount);
	const abi = await getAbi();
	console.log(abi);
	const flashloancontract = new ethers.Contract(
		DEPLOYED_CONTRACT_ADDRESS,
		abi,
		signer
	);
	let sendamount = flashloancontract.connect(signer);
	let tx = await sendamount.transfer(reciever_Contract_Address, amount,{
        gasLimit: 30000000,
      }); //1000000 = 1 USDC
	await tx.wait();
    console.log(tx);
}

export default sendamount;
