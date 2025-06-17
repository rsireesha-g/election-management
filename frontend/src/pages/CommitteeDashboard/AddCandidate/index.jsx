import { Modal } from "../../../components/Common/Modal";
import styles from "./index.module.css";

export const AddCandidate = ({ onClose, handleAdd, handleChange, activeElectionType }) => {
    return (
        <Modal >
            <div className={styles.innerModal}>
                <div className={styles.editForm}>
                    <div className={styles.top}>
                        <h2 className={styles.title}>Add Candidate Details</h2>
                        <button onClick={onClose} className={styles.closeBtn}>✕</button>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Candidate Name</div>
                            <input className={styles.inputField} name="candidate_name" placeholder='Eg: Nehru' onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Aadhar Details</div>
                            <input className={styles.inputField} name="aadhar_id" placeholder="Eg:9999-9999-9999" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Contact Number</div>
                            <input className={styles.inputField} name="contact_no" placeholder='Eg: 9999999999' onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Email</div>
                            <input className={styles.inputField} name="email" placeholder="Eg: abc@gmail.com" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Date Of Birth (YYYY-MM-DD)</div>
                            <input className={styles.inputField} name="DOB" placeholder="Eg: 2020-02-02" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Gender</div>
                            <input className={styles.inputField} name="gender" placeholder="Gender" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Election Type</div>
                            <input className={styles.inputField} name="election_type" placeholder="Election Type" defaultValue={activeElectionType} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Full Address</div>
                            <input className={styles.inputField} name="address" placeholder="Enter Full address" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Party Name</div>
                            <input className={styles.inputField} name="party" placeholder="Party Name" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Nomination Location</div>
                            <input className={styles.inputField} name="nomination_location" placeholder="Nomination location" onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                        </div>

                    </div>
                    <div className={styles.button}>
                        <button className={`primaryButton ${styles.submitBtn}`} onClick={handleAdd}>Update</button>
                    </div>
                </div>
            </div>
        </Modal>)
}
