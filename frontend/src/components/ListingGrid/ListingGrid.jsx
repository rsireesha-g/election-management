import { useEffect } from "react"
import styles from "./ListingGrid.module.css"
import axios from "axios";
import { TabComponent } from "../TabComponent";
import { ElectionTabComponent } from "../ElectionTabComponent";

export const ListingGrid = ({
    tabs,
    handleTabSelect,
    activeTab,
    electionTypes,
    activeType,
    handleTypeSelect,
    headings,
    data,
    isLoading,
    setEdit,
    handleDelete,
    setIsAdd
}) => {

    return (
        <>
            <div className={styles.listingComponent}>
                <TabComponent
                    tabs={tabs}
                    handleTabSelect={handleTabSelect}
                    activeTab={activeTab}
                />
                <ElectionTabComponent
                    types={electionTypes}
                    handleTypeSelect={activeTab ? handleTypeSelect : () => { }}
                    activeType={activeType}
                />
                {isLoading ? <div>Loading...</div>
                    :
                    <div className={styles.gridOuterComponent}>
                        <button className={`primaryButton ${styles.addBtn}`} onClick={setIsAdd}>Add Candidate</button>
                        <div className={styles.gridComponent}>
                            {headings?.map((title, ind) => (
                                <div key={ind} className={styles.tab}>{title}</div>
                            ))}
                        </div>
                        <div className={styles.gridInnerComponent}>
                            {data?.map((detail, ind) => (
                                <div className={styles.gridComponent} key={ind}>
                                    <div className={styles.details}>{ind + 1} </div>
                                    <div className={styles.details}>{detail?.candidate_name} </div>
                                    <div className={styles.details}>{detail?.nomination_location} </div>
                                    <div className={styles.details}>{detail?.party} </div>
                                    <div className={`${styles.details} ${styles.actions}`}>
                                        <div className={styles.action} onClick={() => setEdit(detail?.ID)}>Edit</div>
                                        <span>/</span>
                                        <div className={styles.action} onClick={() => handleDelete(detail?.ID)}>Delete</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
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