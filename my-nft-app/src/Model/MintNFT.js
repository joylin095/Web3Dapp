import { MetadataSendToIPFS } from "./SendToIPFS.js";
import contractABI from "../Contract-abi.json";

const { Web3 } = require("web3");
const contractAddress = "0x44EE2461eb82B6A38D3C69614FABf4888d6AF835";

export const MintNft = async (imgurl, course, exam) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_API)
  );

  const metadata = {
    image: imgurl,
    course: course,
    exam: exam,
  };

  const pinataMetadataResponse = await MetadataSendToIPFS(metadata);
  if (!pinataMetadataResponse.success) {
    alert("上傳錯誤");
    return {
      success: false,
    };
  }

  const tokenURI = pinataMetadataResponse.pinataUrl;
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const userAddress = accounts[0];

  if (typeof window.ethereum === "undefined" || !window.ethereum.isMetaMask) {
    alert("Please install MetaMask or connect to an Ethereum-enabled browser");
    return {
      success: false,
    };
  }

  // load contract
  window.contract = await new web3.eth.Contract(
    contractABI.abi,
    contractAddress
  );
  // set up transaction
  const transactionParameters = {
    to: contractAddress,
    from: userAddress,
    data: window.contract.methods.safeMint(userAddress, tokenURI).encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      txHash: txHash,
    };
  } catch (e) {
    return {
      success: false,
    };
  }
};
