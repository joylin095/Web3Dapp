import { useEffect, useState } from "react";
import {
  ConnectWallet,
  GetCurrentWallet,
} from "../../Model/ConnectInteract.js";
import Button from "react-bootstrap/Button";

function ConnectButton() {
  const [account, setAccount] = useState("");

  const connectWalletHandler = async () => {
    const { address } = await ConnectWallet();
    setAccount(address);
  };

  const connectWalletButton = () => {
    return (
      <Button onClick={connectWalletHandler} variant="dark">
        Connect to a Wallet
      </Button>
    );
  };

  const showAccountButton = () => {
    const prefix = account.substr(0, 5);
    const suffix = account.substr(39, 42);
    return <Button variant="dark">{prefix + "..." + suffix}</Button>;
  };

  useEffect(() => {
    async function getWallet() {
      const { address } = await GetCurrentWallet();
      setAccount(address);
    }
    getWallet();
  }, []);

  return (
    <>{account.length > 0 ? showAccountButton() : connectWalletButton()}</>
  );
}

export default ConnectButton;
