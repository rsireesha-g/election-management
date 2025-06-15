import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerMainContainer}>
                <div className={styles.title}>Election Management</div>
                <div className={styles.linksContainer}>
                    <div className={styles.linksFlex}>
                        <strong className={styles.linkHeading}>Contact</strong>
                        <div className={styles.link}>+91 9999999999</div>
                        <div className={styles.link}>abc@gmail.com</div>
                        <div className={styles.link}>address</div>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>@2025 All Rights Are Preserved</div>
        </div>
    )
}
