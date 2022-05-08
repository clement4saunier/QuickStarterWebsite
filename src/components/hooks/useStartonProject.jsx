import { useEffect, useState } from "react";
import { useStartonFundingContract } from "./useStartonFundingContract";
import { BigNumber } from "ethers";

export default function useStartonProject(id) {
  const [metadata, setMetadata] = useState();
  const [goal, setGoal] = useState();
  const [token, setToken] = useState();
  const [fund, setFund] = useState();
  const [ongoing, setOngoing] = useState();
  const { readValue } = useStartonFundingContract(
    "0xB8942E9e99C4F7eFF3B57Da5588661C76A7F6b6F"
  );

  useEffect(() => {
    async function fetchContractData() {
      const [_metadata, _ongoing, _token, _goal, _fund] = await readValue("project", [id.toString()]);

      setOngoing(_ongoing);
      setToken(_token);
      setGoal(BigNumber.from(_goal).toString());
      setFund(BigNumber.from(_fund).toString());
      const ipfs = await fetch(_metadata);
      setMetadata(await ipfs.json());
    }

    fetchContractData();
  }, [id]);
  return { metadata, goal, fund, token, ongoing };
}
