import { useState } from "react"
import styles from "./ListingGrid.module.css"
import { DeleteCandidate } from "../DeleteConfirmation";
import { MdDelete, MdEdit } from "react-icons/md";

export const ListingGrid = ({
    setID,
    id,
    headings,
    data,
    isLoading,
    setEdit,
    handleDelete,
    setIsAdd,
    electionType
}) => {
    const [isDeleteModalOpen, setIsDeleteModelOpen] = useState(false);

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
                    {isLoading ? <div>Loading...</div>
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
                                            onClick={() => setEdit(detail?.ID)}
                                            title={'Edit'}
                                        ><MdEdit /></div>
                                        <span>|</span>
                                        <div className={styles.action}
                                            onClick={() => {
                                                setID(detail?.ID);
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

/*
Create a Candidate screen in Committee section
There will be 3 tabs for 3 different elections
in each tab there should be a grid which lists all the candidate enrolled in the associated election
there should be a button on the top right side of the grid, clicking on it will opens a form to add new candidate
in the last column of the grid there should be a button, clicking on it will opens an edit form which must have corresponding data pre-filled with current data . (the delete button can be beside the edit button or in the edit form)
*/