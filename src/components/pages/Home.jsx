import React from "react";
import Page from "../layout/Page";
import styles from "./Home.module.css"

export default function Home() {
    return (
        <Page>
            <div>
                <h1>Finance projects,<br />the <span style={{ "color": "#008770" }}>decentralized</span> way</h1>
                <h2>An on-chain crowdfunding plateform<br />completely decentralized and managed by smart contracts</h2><br />
            </div>
            <div className={styles.container}>
                <div className="panel-shadow">
                    <h2><span style={{ "color": "#008770" }}>Raise</span> funds in crypto</h2>
                    <p>Raise funds in USDC, WETH, MATIC etc. without intermediary</p>
                </div>
                <div className="panel-shadow">
                    <h2><span style={{ "color": "#008770" }}>Achieve</span> your goal</h2>
                    <p>You will receive your donations once the goal is reached</p>
                </div>
                <div className="panel-shadow">
                    <h2><span style={{ "color": "#008770" }}>Dedicated</span> funding page</h2>
                    <p>The service generates a dedicated website hosted on IPFS to present your project and engage people</p>
                </div>
                <div className="panel-shadow">
                    <h2><span style={{ "color": "#008770" }}>Govern</span> the projects you fund</h2>
                    <p>Each project has its own token that you can get by funding them. Those tokens will unlock you advantages as a founder of the project</p>
                </div>
            </div>
        </Page>
    )
}
