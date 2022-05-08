import React, { useEffect, useState } from "react";
import { erc20Contracts } from "../../../contract/contract";
import styles from "./ProjectInfo.module.css";

export default function ProjectInfo({ onStateChange }) {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [token, setToken] = useState(erc20Contracts[0].address);
  const [imageUrl, setImageUrl] = useState();

  function onImageUpload(e) {
    const file = e.target.files[0];
    setFile(file);
    setImageUrl(URL.createObjectURL(file));
  }

  useEffect(() => {
    onStateChange({file, name, goal, token});
  }, [file, name, goal, token]);

  return (
    <div className={[styles.projectInfo, "panel-shadow"].join(" ")}>
      <div>
        <h3>MEDIA</h3>
        <input type="file" accept="image/*" onChange={onImageUpload}></input>
        <img alt="" src={imageUrl} />
      </div>
      <div>
        <h3>NAME</h3>
        <input
          className={styles.input}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <h3>GOAL</h3>
        <select
          onChange={(e) => {
            setToken(e.target.value);
          }}
        >
          {erc20Contracts.map(({address, name}) => {
            return <option key={address} value={address}>{name}</option>
          })}
        </select>
        <input
          className={styles.input}
          placeholder="Amount"
          onChange={(e) => {
            setGoal(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
