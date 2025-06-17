import { Modal } from "../../../components/Common/Modal";
import styles from "./index.module.css";


export const EditCandidate = ({ onClose, candidate, handleChange, handleUpdate }) => {
    return (
        <Modal >
            <div className={styles.innerModal}>
                <div className={styles.editForm}>
                    <div className={styles.top}>
                        <h2 className={styles.title}>Edit Candidate Details</h2>
                        <button onClick={onClose} className={styles.closeBtn}>✕</button>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Candidate Name</div>
                            <input className={styles.inputField} name="candidate_name" defaultValue={candidate?.candidate_name} disabled />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Aadhar Details</div>
                            <input className={styles.inputField} name="aadhar_id" defaultValue={candidate?.aadhar_id} disabled />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Contact Number</div>
                            <input className={styles.inputField} name="contact_no" defaultValue={candidate?.contact_no} disabled />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Email</div>
                            <input className={styles.inputField} name="email" defaultValue={candidate?.email} disabled />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Gender</div>
                            <input className={styles.inputField} name="gender" defaultValue={candidate?.gender} disabled />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Date Of Birth</div>
                            <input className={styles.inputField} name="DOB" defaultValue={candidate?.DOB} disabled />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Election Type</div>
                            <input className={styles.inputField} name="election_type" defaultValue={candidate?.election_type}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                }}
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Address</div>
                            <input className={styles.inputField}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                }}
                                name="address" defaultValue={candidate?.address} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Party</div>
                            <input className={styles.inputField}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                }}
                                name="party" defaultValue={candidate?.party} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Nomination Location</div>
                            <input className={styles.inputField}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                }}
                                name="nomination_location" defaultValue={candidate?.nomination_location} onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className={styles.button}>
                        <button className={`primaryButton ${styles.submitBtn}`} onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
