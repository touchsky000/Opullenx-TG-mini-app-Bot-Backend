const DatabaseController = require("./database.controller");
const { ethers } = require('ethers');
const abi = require("../abi/index.json")
exports.setWalletAddress = async (req, res) => {
  try {
    const { tgUserId, walletAddress, walletPrivateKey, walletPassword } =
      req.body;
    console.log(req.body);

    const isSaved = await DatabaseController.saveWalletAddress({
      tgUserId,
      walletAddress,
      walletPrivateKey,
      walletPassword,
    });
    isSaved
      ? res.status(200).json({ message: true })
      : res.status(200).json({ message: false });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "" });
  }
};

exports.walletAddress = async (req, res) => {
  try {
    const { tgUserId } = req.body;
    const data = await DatabaseController.getWalletAddress({ tgUserId });
    console.log(data);
    data
      ? res.status(200).json({ message: data })
      : res.status(200).json({ message: "" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "" });
  }
};

exports.faucet = async (req, res) => {
  const { amount, receiver } = req.body
  console.log("amount =>", amount)
  console.log("receiver =>", receiver)
  const privateKey = process.env.PRIVATE_KEY
  const tokenAddress = process.env.TOKEN_ADDRESS

  const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/a39ef62a5f764502981de09d9b38a6b8');

  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(tokenAddress, abi, wallet);
  const toAddress = receiver

  try {
    // Convert amount to the correct format based on token decimals
    const decimals = await contract.decimals();
    const amountInUnits = ethers.parseUnits(amount.toString(), decimals);

    // Send the transaction
    const txResponse = await contract.transfer(toAddress, amountInUnits);
    await txResponse.wait(); // Wait for the transaction to be mined

    res.json({ message: true })
  } catch (error) {
    res.json({ message: false })
  }
}
