import { Loader } from "../../../../components/Common/Loader";
import { Modal } from "../../../../components/Common/Modal";
import styles from "./index.module.css";


export const EditCandidate = ({ onClose, candidate, handleChange, handleUpdate, isLoading }) => {
    return (
        <Modal >
            <div className={styles.innerModal}>
                <div className={styles.editForm}>
                    <div className={styles.top}>
                        <h2 className={styles.title}>Edit Candidate Details</h2>
                        <button onClick={onClose} className={styles.closeBtn}>✕</button>
                    </div>
                    {isLoading ? <Loader /> :
                        <>
                            <div className={styles.details}>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Candidate Name</div>
                                    <input className={styles.inputField} name="candidate_name" placeholder="Enter candidate name" defaultValue={candidate?.candidate_name} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Aadhar Details</div>
                                    <input className={styles.inputField} name="aadhar_id" placeholder="Enter aadhar Id" defaultValue={candidate?.aadhar_id} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Contact Number</div>
                                    <input className={styles.inputField} name="contact_no" placeholder="Enter contact number" defaultValue={candidate?.contact_no} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Email</div>
                                    <input className={styles.inputField} name="email" placeholder="Enter email address" defaultValue={candidate?.email} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Gender</div>
                                    <input className={styles.inputField} name="gender" placeholder="Enter Gender" defaultValue={candidate?.gender} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Date Of Birth</div>
                                    <input className={styles.inputField} name="DOB" placeholder="Eg: YYYY/MM/DD" defaultValue={candidate?.DOB} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Election Type</div>
                                    <input className={styles.inputField} name="election_type" placeholder="Enter election type" defaultValue={candidate?.election_type}
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
                                        name="address" placeholder="Enter address" defaultValue={candidate?.address} onChange={(e) => handleChange(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Party</div>
                                    <input className={styles.inputField}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                        }}
                                        name="party" placeholder="Enter party name" defaultValue={candidate?.party} onChange={(e) => handleChange(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Nomination Location</div>
                                    <input className={styles.inputField}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                        }}
                                        name="nomination_location" placeholder="Enter nomination location" defaultValue={candidate?.nomination_location} onChange={(e) => handleChange(e)} />
                                </div>
                                <div>
                                </div>
                            </div>
                            <div className={styles.button}>
                                <button className={`primaryButton ${styles.submitBtn}`} onClick={handleUpdate}>Update</button>
                            </div>
                        </>}
                </div>
            </div>
        </Modal>
    )
}
