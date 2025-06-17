import { Modal } from '../../../components/Common/Modal'
import styles from "./index.module.css";

export const DeleteCandidate = ({ handleDeleteCandidate, handleCancel }) => {


    return (
        <Modal>
            <div className={styles.innerModal}>
                <div className={styles.heading}>Are you sure to delete the candidate?</div>
                <div className={styles.buttonFlex}>
                    <div className={`primaryButton ${styles.cancelBtn}`} onClick={handleCancel}>Cancel</div>
                    <div className={`primaryButton ${styles.deleteBtn}`} onClick={handleDeleteCandidate}>Delete</div>
                </div>
            </div>
        </Modal>
    )
}
