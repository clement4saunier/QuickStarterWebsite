import React from "react";
import Page from "../layout/Page";
import { useStartonFundingContract } from "../hooks/useStartonFundingContract";
import useStartState from "../hooks/useStartonState";

const Contract = () => {
    const {readValue} = useStartonFundingContract("0xB8942E9e99C4F7eFF3B57Da5588661C76A7F6b6F");
    const {projectSupply} = useStartState();

    async function onProjectSupplyButton() {
        readValue("projectSupply", []);
        readValue("builder", ["0"]);
    }

    return (
        <Page>
            <h1>OUR SMART CONTRACT</h1>
            <br/>
            Project Supply: {projectSupply ?? "..."}
            <br/>
            Form to create a crowfunding
            <button onClick={onProjectSupplyButton}></button>
        </Page>
    )
}

export default Contract
