import styles from "./ListingGrid.module.css"
import { DeleteCandidate } from "../DeleteConfirmation";
import { MdDelete, MdEdit } from "react-icons/md";
import { Loader } from "../../Common/Loader"

export const ListingGrid = ({
    setID,
    id,
    headings,
    data,
    isLoading,
    setEdit,
    handleDelete,
    setIsAdd,
    electionType,
    isDeleteModalOpen, setIsDeleteModelOpen
}) => {

    return (
        <>
            <div className={styles.listingComponent}>
                <div className={styles.top}>
                    <div className={styles.heading}>List of {electionType} Candidates</div>
                    <button className={`primaryButton ${styles.addBtn}`} onClick={setIsAdd} title='Add Candidate'>Add Candidate</button>
                </div>
                <div className={styles.gridOuterComponent}>
                    <div className={styles.gridComponent}>
                        {headings?.map((title, ind) => (
                            <div key={ind} className={styles.tab}>{title}</div>
                        ))}
                    </div>
                    {isLoading ? <Loader />
                        :
                        <div className={styles.gridInnerComponent}>
                            {data?.map((detail, ind) => (
                                <div className={styles.gridComponent} key={ind}>
                                    <div className={styles.details}>{ind + 1} </div>
                                    <div className={styles.details} title={detail?.candidate_name}>{detail?.candidate_name} </div>
                                    <div className={styles.details}>{detail?.nomination_location} </div>
                                    <div className={styles.details}>{detail?.party} </div>
                                    <div className={`${styles.details} ${styles.actions}`}>
                                        <div className={styles.action}
                                            onClick={() => setEdit(detail?.id)}
                                            title={'Edit'}
                                        ><MdEdit /></div>
                                        <span>|</span>
                                        <div className={styles.action}
                                            onClick={() => {
                                                setID(detail?.id);
                                                setIsDeleteModelOpen(true)
                                            }}
                                            title="Delete"
                                        ><MdDelete /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
            {isDeleteModalOpen &&
                <DeleteCandidate
                    handleDeleteCandidate={() => handleDelete(id)}
                    handleCancel={() => {
                        setID();
                        setIsDeleteModelOpen(false)
                    }}
                />
            }
        </>
    )
}

