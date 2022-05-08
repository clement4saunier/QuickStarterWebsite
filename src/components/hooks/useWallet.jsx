import { providers } from "ethers";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";

export default function useWallet() {
  const [readOnly, setReadOnly] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [chainId, setChainId] = useState(undefined);

  useEffect(() => {
    async function handleBrowserProvider() {
      const provider = new providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();

      setProvider(provider);
      try {
        const address = await signer.getAddress();

        setReadOnly(false);
        setAccount(address);
        console.log("🦊 Browser Wallet connected as", address);
      } catch (_) {
        console.log("🦊 Browser Wallet not connected");
        setReadOnly(true);
      }
      console.log("⛽ Using Browser Wallet as provider");
    }

    window.ethereum && handleBrowserProvider();
  }, []);

  useEffect(
    () => {
      async function waitForProviderReady() {
        const { chainId: chain } = await provider.ready;

        setChainId(chain);
        console.log("🔗 ChainId", chain);
      }

      provider && waitForProviderReady();
    },
    [provider]
  );

  function handleChainChanged(arg) {
    const newChainId = BigNumber.from(arg).toNumber();
    setChainId(newChainId);
    console.log("🔗 Now on ChainId", newChainId);
  }

  function handleAccountChanged(accounts) {
    if (accounts.length <= 0) {
      setReadOnly(true);
      setAccount("");
      console.log("👤 Account disconnected");
    } else {
      setAccount(accounts[0]);
      console.log("👤 Connected as", accounts[0]);
      !readOnly && setReadOnly(false);
    }
  }

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.on("chainChanged", handleChainChanged);
    window.ethereum.on("accountsChanged", handleAccountChanged);
    return () => {
      if (!window.ethereum) return;

      window.ethereum.removeListener("chainChanged", handleChainChanged);
      window.ethereum.removeListener("accountsChanged", handleAccountChanged);
    };
  }, []);

  return {
    readOnly,
    account,
    provider,
    chainId
  };
}
