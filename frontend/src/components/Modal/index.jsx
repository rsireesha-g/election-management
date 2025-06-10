import styles from './Modal.module.css'

export const Modal = ({ title, onClose, children }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.innerModal}>
                <h2 className={styles.title}>{title}</h2>
                <button onClick={onClose} className={styles.closeBtn}>✕</button>
                {children}
            </div>
        </div>
    )
}
