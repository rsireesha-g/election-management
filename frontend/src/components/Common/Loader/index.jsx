import React from 'react'
import styles from "./loader.module.css"

export const Loader = ({ size }) => {
    return (
        <div className={`${size === "small" ? styles.small : styles.default} ${styles.loader}`}></div>
    )
}
