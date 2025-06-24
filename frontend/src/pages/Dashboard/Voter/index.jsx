import { useEffect, useRef, useState } from "react";
import { Layout } from "../../../components/Dashboard/Layout"
import { TabComponent } from "../../../components/Dashboard/TabComponent";
import { CandidateCard } from "../../../components/Dashboard/Voter/CanidateCard"
import styles from "./index.module.css";
import { useGetElectionsDataQuery } from "../../../redux/queries/elections";
import { useGetCandidateDataByElectionTypeQuery, useGetCandidateDetailsByVoterIdQuery } from "../../../redux/queries/candidates";
import { useSearchParams } from "react-router-dom";
import { useGetVoterDetails } from "../../../redux/hooks/voter";
import { useCreateVoteMutation, useGetVotesDataQuery } from "../../../redux/queries/votes";
import { useGetVoterDetailQuery } from "../../../redux/queries/voters";
import styles2 from "../../../components/Dashboard/ListingGrid/ListingGrid.module.css";
import ballotImg from "../../../assests/dashboard/ballot-box.png";
import ballotImgSealed from "../../../assests/dashboard/ballot-box-sealed.jpg";

export const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const user_id = searchParams.get('user_id');
    const { voterDetails, is_registered } = useGetVoterDetails(user_id);

    const [activeTab, setActiveTab] = useState('Elections');
    const [activeElectionType, setActiveElectionType] = useState('Parliament');

    const { data: electionData, error: electionErr, isLoading: ElectionLoading } = useGetElectionsDataQuery();
    const { data, error, isLoading } = useGetCandidateDataByElectionTypeQuery(activeElectionType, { skip: !activeElectionType });

    const { data: votedCandidateDetails, isLoading: votedCandidateLoading } = useGetCandidateDetailsByVoterIdQuery(
        voterDetails?.[0]?.id,
        {
            skip:
                (!voterDetails?.[0]?.id)
        }
    )

    const [draggableItem, setDraggableItem] = useState(null);
    const [list, setList] = useState([]);
    // const { data: votesData } = useGetVotesDataQuery();

    const [handleCreateVote] = useCreateVoteMutation();

    const handleDragStart = (candidate) => {
        if (is_registered) {
            setDraggableItem(candidate);
        } else {
            alert("Voter is not registered!")
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDragDrop = async (e) => {
        e.preventDefault();
        try {
            const election = electionData?.find((ele) => ele.election_type === activeElectionType);
            const data = {
                voter_id: Number(voterDetails?.[0]?.id),
                candidate_id: draggableItem?.id || draggableItem?.ID,
                election_id: election?.id || election?.ID
            }
            console.log(data, electionData?.find((ele) => ele.election_type === activeElectionType), electionData);
            let res = await handleCreateVote(data)
            console.log(res, 'response')
            if (res?.data) {
                setList([...list, { ...draggableItem }]);
            }
        } catch (err) {
            console.log(err)
        }
        setDraggableItem(null);
    }
    console.log(!(voterDetails?.[0]?.id), activeTab !== 'Receipt', voterDetails);




    // useEffect(()=>{
    //  if(activeTab==='Receipt')
    //    handleGetVoteCastedCandidateDetails()
    // },[activeTab])
    return (
        <Layout type='voter'>
            <div className={styles.mainTitle}>Welcome Voter!</div>
            <TabComponent
                tabType={'mainTabs'}
                tabs={['Elections', 'Receipt']}
                activeTab={activeTab}
                handleTabSelect={(tab) => setActiveTab(tab === activeTab ? "" : tab)}
            />
            {activeTab === 'Elections' ?
                <>
                    <TabComponent
                        tabType={'electionTab'}
                        tabs={electionData || []}
                        activeTab={activeElectionType}
                        handleTabSelect={(type) => {
                            setActiveElectionType(activeElectionType === type ? '' : type)
                        }}

                    />

                    <div className={styles.displayGrid}>
                        {isLoading ? <div>Loading...</div> :
                            <div className={styles.cardContainer}>
                                {data?.map((candidate) => (
                                    <CandidateCard
                                        candidate={candidate}
                                        disable={votedCandidateDetails?.find((ele) => ele.election_type === activeElectionType)}
                                        handleDragStart={() => handleDragStart(candidate)}
                                    />
                                ))}
                            </div>
                        }
                        <div className={styles.dragDropContainer}
                            onDragOver={handleDragOver}
                            onDrop={handleDragDrop}
                        >
                            <div className={styles.draggedListContainer}>
                                {(votedCandidateDetails?.find((ele) => ele.election_type === activeElectionType)) ?
                                    <div>
                                        <img src={ballotImgSealed} className={styles.ballotBox} alt='cast your vote here' />
                                        <div>Vote has been already casted</div>
                                    </div>
                                    :
                                    <img src={ballotImg} className={styles.ballotBox} alt='cast your vote here' />
                                }
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={styles2.gridOuterComponent}>
                        <div className={styles2.gridComponent}>
                            {['S.No', 'Candidate Name', 'Election Type', 'Place', 'Party']?.map((title, ind) => (
                                <div key={ind} className={styles2.tab}>{title}</div>
                            ))}
                        </div>
                        {votedCandidateLoading ? <>Loading...</>
                            : <div className={styles2.gridInnerComponent}>
                                {votedCandidateDetails?.map((detail, ind) => (
                                    <div className={styles2.gridComponent} key={ind}>
                                        <div className={styles2.details}>{ind + 1} </div>
                                        <div className={styles2.details} title={detail?.candidate_name}>{detail?.candidate_name} </div>
                                        <div className={styles2.details}>{detail?.election_type} </div>
                                        <div className={styles2.details}>{detail?.nomination_location} </div>
                                        <div className={styles2.details}>{detail?.party} </div>
                                        <div className={`${styles2.details} ${styles2.actions}`}>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </>
            }
        </Layout>
    )
}
