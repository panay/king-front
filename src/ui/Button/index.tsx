import React from "react";
import styles from './Button.module.css';

function Button({value}: {value: string}) {
    return (
        <>
            <input type="button" value={value} className={styles.btn} />
        </>
    )
}

export default Button;
