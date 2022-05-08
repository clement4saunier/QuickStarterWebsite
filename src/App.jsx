import "./App.css";
import Header from "./components/layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/pages/Create";
import Home from "./components/pages/Home";
import Funding from "./components/pages/Funding";
import Details from "./components/pages/Details";
import useWallet from "./components/hooks/useWallet";
import { WalletContext } from "./components/context/Wallet";
import Contract from "./components/pages/Contract";
import { Contract as EthContract } from "ethers";
import { contract } from "./contract/contract";
import { utils } from "ethers";

function App() {
  const wallet = useWallet();
  const { abi, address } = contract;
  const fundingContract =
    wallet.chainId &&
    new EthContract(
      address,
      new utils.Interface(abi.abi),
      wallet.readOnly ? wallet.provider : wallet.provider.getSigner()
    );

  return (
    <div className="App">
      <WalletContext.Provider value={{fundingContract, ...wallet}}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/funding" element={<Funding />} />
            <Route path="/funding/:id" element={<Details />} />
            <Route path="/contract" element={<Contract />} />
          </Routes>
        </BrowserRouter>
      </WalletContext.Provider>
    </div>
  );
}

export default App;
