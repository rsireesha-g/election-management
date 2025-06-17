import { Modal } from "../../../components/Common/Modal";
import styles from "./index.module.css";

export const AddCandidate = ({ onClose, handleAdd, handleChange, activeElectionType }) => {
    return (
        <Modal >
            <div className={styles.innerModal}>
                <div className={styles.editForm}>
                    <h2 className={styles.title}>Add Candidate Details</h2>
                    <button onClick={onClose} className={styles.closeBtn}>✕</button>

                    <div className={styles.details}>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Candidate Name</div>
                            <input className={styles.inputField} name="candidate_name" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Aadhar Details</div>
                            <input className={styles.inputField} name="aadhar_id" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Contact Number</div>
                            <input className={styles.inputField} name="contact_no" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Email</div>
                            <input className={styles.inputField} name="email" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Date Of Birth</div>
                            <input className={styles.inputField} name="DOB" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Gender</div>
                            <input className={styles.inputField} name="gender" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Election Type</div>
                            <input className={styles.inputField} name="election_type" defaultValue={activeElectionType} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Address</div>
                            <input className={styles.inputField} name="address" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Party</div>
                            <input className={styles.inputField} name="party" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Nomination Location</div>
                            <input className={styles.inputField} name="nomination_location" onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                        </div>

                    </div>
                    <button className={`primaryButton ${styles.submitBtn}`} onClick={handleAdd}>Update</button>
                </div>
            </div>
        </Modal>)
}
