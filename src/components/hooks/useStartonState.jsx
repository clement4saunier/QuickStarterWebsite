import { useEffect, useState } from "react";
import { useStartonFundingContract } from "./useStartonFundingContract";

export default function useStartonState() {
  const [projectSupply, setProjectSupply] = useState();
  const [projects, setProjects] = useState([]);
  const { readValue } = useStartonFundingContract(
    "0xB8942E9e99C4F7eFF3B57Da5588661C76A7F6b6F"
  );

  useEffect(() => {
    async function fetchProjectSupply() {
      setProjectSupply((await readValue("projectSupply", [])).raw);
    }

    fetchProjectSupply();
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      let projectArray = [];

      for (let i = 0; i< projectSupply; i++) {
        const project = await readValue("project", [i.toString()])
        projectArray[i] = project;
      }
      setProjects(projectArray);
    }

    projectSupply && fetchProjects();
  }, [projectSupply]);

  return { projectSupply, projects};
}
