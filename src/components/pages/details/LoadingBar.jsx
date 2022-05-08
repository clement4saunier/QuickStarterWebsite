import React from "react";
import styles from './LoadingBar.module.css'

LoadingBar.defaultProps = {
    value: "10%"
}

export default function LoadingBar({value}) {
    const realValue = parseInt(value);

    return (
        <div className={styles.main}>   
            {value !== "0%" && <div className={styles.bar} style={{width: realValue >= 100 ? "100%" : value}}>
            </div>}
        </div>
    )
}