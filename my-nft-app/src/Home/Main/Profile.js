import { useEffect, useState } from "react";
import { ConnectWallet } from "../../Model/ConnectInteract";
import Image from "react-bootstrap/Image";
import axios from "axios";

const key = process.env.REACT_APP_ALCHEMY_API_KEY;
const contractAddress = "0x44EE2461eb82B6A38D3C69614FABf4888d6AF835";

function Profile() {
  const [userAddress, setUserAddress] = useState("");
  const [ownedNfts, setOwnedNfts] = useState([]);
  const getOwnedNfts = async (options) => {
    try {
      const response = await axios.request(options);
      return response.data.ownedNfts;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const noImage = () => {
    return <div>No Image，請先上傳</div>;
  };

  const showImage = (ownedNfts) => {
    // console.log(ownedNfts[0].raw.metadata.exam);
    const ownedNftsList = ownedNfts.map((item) => (
      <div
        style={{
          height: "400px",
          width: "19%",
          borderRadius: "24px",
          border: "2px solid",
          overflow: "hidden",
          margin: "0.25rem",
        }}
      >
        <a
          href={item.image.cachedUrl}
          style={{ textDecoration: "None", width: "100%", height: "100%" }}
          target="blank"
        >
          <Image
            src={item.image.cachedUrl}
            style={{ width: "100%", height: "70%", objectFit: "cover" }}
          ></Image>
          <div style={{ backgroundColor: "#202020", height: "100%" }}>
            <h4 style={{ color: "white" }}>{item.raw.metadata.course}</h4>
            <h6 style={{ color: "white" }}>{item.raw.metadata.exam}</h6>
          </div>
        </a>
      </div>
    ));
    return (
      <div
        className="d-flex justify-content-center"
        style={{ margin: "0.5rem", flexWrap: "wrap" }}
      >
        {ownedNftsList}
      </div>
    );
  };

  useEffect(() => {
    async function getAddress() {
      const { address } = await ConnectWallet();
      setUserAddress(address);

      if (address !== "") {
        const options = {
          method: "Get",
          url: `https://eth-sepolia.g.alchemy.com/nft/v3/${key}/getNFTsForOwner`,
          params: {
            owner: address,
            "contractAddresses[]": `${contractAddress}`,
            withMetadata: "true",
            pageSize: "100",
          },
          headers: { accept: "application/json" },
        };
        setOwnedNfts(await getOwnedNfts(options));
      }
    }
    getAddress();
  }, []);
  return <div>{ownedNfts.length > 0 ? showImage(ownedNfts) : noImage()}</div>;
}

export default Profile;
