import styles from "./index.module.css";
import { BsPersonCircle } from "react-icons/bs";

export const CandidateCard = ({ candidate, disable, handleDragStart }) => {
    let dob = (new Date(candidate?.DOB));
    let date = dob?.toISOString()?.split("T")?.[0];
    const currYear = (new Date()).getFullYear();
    let dobYear = (new Date(candidate?.DOB)).getFullYear();
    const age = currYear - dobYear;
    console.log(disable)

    return (
        <div className={`${styles.card} ${disable && styles.disable}`} key={candidate?.id}
            draggable={!disable}
            onDragStart={() => handleDragStart(candidate)}
        >
            <div className={styles.gridProfile}>
                <BsPersonCircle className={styles.profileIcon} />
                <div className={styles.titleName}>{candidate?.candidate_name}</div>
            </div>
            <div className={styles.grid}>
                <div className={styles.label}>Age, DOB</div>
                <div>:</div>
                <div className={styles.title}>{age + ", " + date}</div>
            </div>
            <div className={styles.grid}>
                <div className={styles.label}>Gender</div>
                <div>:</div>
                <div className={styles.title}>{candidate?.gender}</div>
            </div>
            <div className={styles.grid}>
                <div className={styles.label}>Nationality</div>
                <div>:</div>
                <div className={styles.title}>{candidate?.nationality}</div>
            </div>
            <div className={styles.grid}>
                <div className={styles.label}>Address</div>
                <div>:</div>
                <div className={styles.title}>{candidate?.address}</div>
            </div>
        </div>
    )
}
