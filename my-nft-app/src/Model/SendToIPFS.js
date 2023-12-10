import axios from "axios";
const key = process.env.REACT_APP_PINATA_API_KEY;
const secret = process.env.REACT_APP_PINATA_API_SECRET;

export const ImageSendToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  return axios
    .post(url, formData, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (e) {
      return {
        success: false,
        message: e.message,
      };
    });
};

export const MetadataSendToIPFS = async (obj) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, obj, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (e) {
      return {
        success: false,
        message: e.message,
      };
    });
};
