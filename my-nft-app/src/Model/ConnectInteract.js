export const ConnectWallet = async () => {
  const { ethereum } = window;
  if (ethereum) {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        return { address: accounts[0] };
      }
    } catch (e) {
      alert("錯誤");
      return { address: "" };
    }
  } else {
    alert("請安裝Metamask!");
    return { address: "" };
  }
};

export const GetCurrentWallet = async () => {
  const { ethereum } = window;
  if (ethereum) {
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        return { address: accounts[0] };
      } else {
        return { address: "" };
      }
    } catch (e) {
      alert("錯誤");
      return { address: "" };
    }
  } else {
    alert("請安裝Metamask!");
    return { address: "" };
  }
};
