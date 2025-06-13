import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";

export const Popup = ({ message }) => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        if (message?.msg) {
            setTimeout(() => {
                setShow(false);
            }, 3000)
        }
    }, [])
    return (
        <>{show &&
            <div className={`${styles.popupContainer} 
        ${message?.type === 'error' ? styles.error : ''}
        `}
            >{message?.msg}
            </div>
        }</>
    )
}
