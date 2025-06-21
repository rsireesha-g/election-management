import { Modal } from "../../../../../components/Common/Modal";
import styles from "./index.module.css";


export const EditVoter = ({ onClose, voterDetails, handleChange, handleUpdate }) => {
    console.log(voterDetails, 'edit voter')
    return (
        <Modal >
            <div className={styles.innerModal}>
                <div className={styles.editForm}>
                    <div className={styles.top}>
                        <h2 className={styles.title}>Edit Voter Details</h2>
                        <button onClick={onClose} className={styles.closeBtn}>✕</button>
                    </div>
                    <form className={styles.form} onSubmit={(e) => handleUpdate(e)}>
                        <div className={styles.details}>
                            <div className={styles.card}>
                                <div className={styles.detailsLabel}>Voter Name</div>
                                <input className={styles.inputField}
                                    name="voter_name"
                                    placeholder='Eg: Nehru'
                                    defaultValue={voterDetails?.voter_name}
                                    disabled
                                />
                            </div>
                            <div className={styles.card}>
                                <div className={styles.detailsLabel}>Aadhar Details</div>
                                <input className={styles.inputField}
                                    disabled
                                    defaultValue={voterDetails?.aadhar_id}
                                    name="aadhar_id" placeholder="Eg:9999-9999-9999"
                                />
                            </div>
                            <div className={styles.card}>
                                <div className={styles.detailsLabel}>Contact Number</div>
                                <input className={styles.inputField}
                                    disabled
                                    defaultValue={voterDetails?.contact_no}
                                    name="contact_no" placeholder='Eg: 9999999999'
                                />
                            </div>
                            <div className={styles.card}>
                                <div className={styles.detailsLabel}>Email</div>
                                <input className={styles.inputField}
                                    defaultValue={voterDetails?.email}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^\w.@+-]/g, '').toLowerCase();
                                    }}
                                    name="email" placeholder="Eg: abc@gmail.com" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className={styles.card}>
                                <div className={styles.detailsLabel}>Date Of Birth (YYYY-MM-DD)</div>
                                <input className={styles.inputField} maxLength={10} name="DOB" placeholder="Eg: 2020-02-02"
                                    defaultValue={voterDetails?.DOB}
                                    disabled />
                            </div>
                            <div className={styles.card}>
                                <div className={styles.detailsLabel}>Gender</div>
                                <input className={styles.inputField} name="gender"
                                    disabled
                                    defaultValue={voterDetails?.gender}
                                    placeholder="Gender" />
                            </div>
                            <div className={styles.card}>
                                <div className={styles.detailsLabel}>Nationality</div>
                                <input className={styles.inputField} name="nationality"
                                    disabled
                                    defaultValue={voterDetails?.gender}
                                    placeholder="Indian" />
                            </div>
                            <div className={styles.card}>
                                <div className={styles.detailsLabel}>Full Address</div>
                                <input className={styles.inputField} name="address"
                                    defaultValue={voterDetails?.address}
                                    placeholder="Enter Full address" onChange={(e) => handleChange(e)} />
                            </div>
                            <div>
                            </div>

                        </div>
                        <input type="submit" value='Update' className={`${styles.submitBtn} primaryButton`} />
                    </form>
                </div>
            </div>
        </Modal>
    )
}
