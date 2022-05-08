export default function useWalletRequest() {
  const { ethereum } = window;

  function walletExists() {
    if (!ethereum) {
      console.error(
        "😞 Can't find a browser wallet, please install one and try again"
      );
    }
    return ethereum !== undefined;
  }

  async function requestAccounts() {
    if (!walletExists()) return;
    ethereum.request({ method: "eth_requestAccounts" });
  }

  async function signMessage(from, message) {
    const msgParams = [
      {
        type: "string",
        name: "Message",
        value: "You confirm voting for!"
      },
      {
        type: "uint32",
        name: "A number",
        value: "1337"
      }
    ];

    if (!walletExists()) return;
    return ethereum.request({
      method: "eth_signTypedData",
      params: [message, from]
    });
  }

  const switchChain = async (id, name, rpcUrl) => {
    if (!walletExists()) return;
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: id }]
      });
    } catch (switchError) {
      // 4902 == the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: id,
                chainName: name,
                rpcUrls: [rpcUrl]
              }
            ]
          });
        } catch (addError) {
          throw new Error("Failed to add network");
        }
      } else {
      }
    }
  };

  return {
    switchChain,
    requestAccounts,
    signMessage
  };
}
