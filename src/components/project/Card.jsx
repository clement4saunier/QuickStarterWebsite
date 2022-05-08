import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStartonProject from "../hooks/useStartonProject";
import styles from "./Card.module.css";
import { erc20Contract } from "../../contract/contract";
import { erc20Contracts } from "../../contract/contract";

export default function Card({ id }) {
  const { metadata, goal, fund, token, ongoing } = useStartonProject(id);
  const [funded, setFunded] = useState(false);
  
  useEffect(() => {
    if (fund > goal) setFunded(true);
  }, [goal, fund])

  let navigate = useNavigate();

  function onCardClick() {
    navigate("/funding/" + id);
  }

  return (
    <div
      onClick={onCardClick}
      style={{ cursor: "pointer" }}
      className={styles.card + " panel-shadow"}
    >
      <div>
        <h2>{metadata?.name ?? "..."}</h2>
        {funded ? "Funded!" : "Ongoing"}
        <br />
        {fund && goal && parseInt((fund/goal) * 100).toString()}{"% of "}
        {goal && goal} in ${erc20Contracts.find(({address}) => address === token)?.name ?? "???"}
      </div>
      <div>
        {metadata && (
          <img
            alt="campaign-preview"
            src={"https://ipfs.io/ipfs/" + metadata.image}
          ></img>
        )}
      </div>
    </div>
  );
}
