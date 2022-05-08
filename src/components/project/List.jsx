import React from "react";
import Card from "./Card";
import styles from "./List.module.css";
import { useStartonFundingContract } from "../hooks/useStartonFundingContract";
import useStartonState from "../hooks/useStartonState";

export default function List() {
  const { readValue } = useStartonFundingContract(
    "0xB8942E9e99C4F7eFF3B57Da5588661C76A7F6b6F"
  );
  const { projectSupply, projects } = useStartonState();
  
  return (
    <div>
      {projectSupply ?? "..."} projects launched
      <br />
      <div className={styles.list}>
        {projectSupply && [...Array(parseInt(projectSupply))].map((project, idx) => {
          return <Card key={idx} id={idx}/>;
        })}
      </div>
    </div>
  );
}
