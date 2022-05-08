import { BigNumber, Contract } from "ethers";
import { Interface } from "ethers/lib/utils";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WalletContext } from "../context/Wallet";
import useStartonProject from "../hooks/useStartonProject";
import useWallet from "../hooks/useWallet";
import Page from "../layout/Page";
import styles from "./Details.module.css";
import LoadingBar from "./details/LoadingBar";
import { erc20Contract } from "../../contract/contract";
import ReactMarkdown from "react-markdown";

export default function Details() {
  let { id } = useParams();
  const { fundingContract, provider } = useContext(WalletContext);
  const { metadata, goal, fund, token } = useStartonProject(id);
  const [funded, setFunded] = useState("0%");
  const [amount, setAmount] = useState(1);
  const [tokenContract, setTokenContract] = useState();

  function onInputChange(event) {
    setAmount(parseInt(event.target.value));
  }

  useEffect(() => {
    if (!token) return;

    setTokenContract(
      new Contract(
        token,
        new Interface(erc20Contract.abi),
        provider.getSigner()
      )
    );
  }, [token]);

  useEffect(() => {
    if (!goal || !fund) return;

      setFunded(parseInt((fund / goal) * 100).toString() + "%");
  }, [goal, fund]);

  async function onFundButton() {
    await fundingContract.fund(id, amount, { gasLimit: 1000000 });
  }

  async function onApproveButton() {
    if (!tokenContract) return;

    await tokenContract.approve(fundingContract.address, amount);
  }

  return (
    <Page>
      <br />
      <br />
      <div className={[styles.card, "panel-shadow"].join(" ")}>
        <div className={styles.mediaCard}>
          {metadata && (
            <img
              className={styles.media}
              alt="campaign-media"
              src={"https://ipfs.io/ipfs/" + metadata.image}
            />
          )}
        </div>
        <h1>{metadata?.name ?? "..."}</h1>
        <div className={styles.funding}>
          <LoadingBar value={funded} />
          <div className="panel">{funded}</div>
        </div>
        <br />
        <div className={styles.fundIt}>
          <button onClick={onFundButton}>Fund it!</button>
          <button onClick={onApproveButton}>Approve</button>
          <input onChange={onInputChange} placeholder="amount"></input>
        </div>
      </div>
      <br />
      <br />
      <div className={[styles.card, "panel-shadow"].join(" ")}>
        {metadata && <ReactMarkdown>
            {metadata.description}
        </ReactMarkdown>}
      </div>
    </Page>
  );
}
