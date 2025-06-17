import { useEffect, useState } from 'react';
import { Layout } from '../../components/Dashboard/Layout'
import { ListingGrid } from '../../components/Dashboard/ListingGrid/ListingGrid'
import styles from "./index.module.css";
import {
    useAddCandidateDataMutation,
    useDeleteCandidateDataMutation,
    useGetCandidateDataByElectionTypeQuery,
    useGetCandidateDetailsByIdQuery,
    useGetCandidatesDataQuery,
    useUpdateCandidateDataMutation
} from '../../redux/queries/candidates';
import { useGetElectionsDataQuery } from '../../redux/queries/elections';
import { Modal } from '../../components/Common/Modal';
import { TabComponent } from '../../components/Dashboard/TabComponent';

const initialData = {
    candidate_name: '',
    aadhar_id: '',
    contact_no: '',
    gender: '',
    election_type: '',
    address: '',
    party: '',
    nomination_location: '',
    email: '',
    DOB: ''
}

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Committee');
    const [activeElectionType, setActiveElectionType] = useState('Parliament');
    const { data, error, isLoading } = useGetCandidateDataByElectionTypeQuery(activeElectionType, { skip: !activeElectionType });
    const { data: electionData, error: electionErr, isLoading: ElectionLoading } = useGetElectionsDataQuery();

    const [deleteCandidate] = useDeleteCandidateDataMutation();
    const [updateCandidate] = useUpdateCandidateDataMutation();

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState();
    const { data: candidate, error: candidateErr, isLoading: candidateLoading } = useGetCandidateDetailsByIdQuery(id, { skip: !id });
    const [addCandidate] = useAddCandidateDataMutation();

    const [candidateDetails, setCandidateDetails] = useState(initialData);

    const handleDeleteCandidate = async (id) => {
        try {
            const res = await deleteCandidate(id)
            res?.data && alert(res?.data?.message);
        } catch (err) {
            console.log(err)
        }
    }

    const handleEditCandidate = (e) => {
        const { name, value } = e.target;
        setCandidateDetails({ ...candidateDetails, [name]: value })
    }

    const handleUpdate = async () => {
        console.log(candidateDetails);
        try {
            const res = await updateCandidate({ id, candidate: candidateDetails });
            res?.data && alert(res?.data?.message);
            setIsEdit(false);
            setId('');
        } catch (err) {
            console.log(err)
        }
    }

    const handleAdd = async () => {
        try {
            console.log(candidateDetails);
            const data = candidateDetails;
            const res = await addCandidate(data);
            res?.data && alert(res?.data?.message);
            setIsAdd(false);
            setId('');
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (candidate?.[0]) {
            let x = new Date(candidate?.[0]?.DOB);
            let y = x?.toISOString()?.split("T")?.[0];
            setCandidateDetails({ ...candidate?.[0], "DOB": y });
        }
    }, [id])

    return (
        <Layout title='Commitee Dashboard' >
            <h2 className={styles.title}>Welcome User!</h2>
            <TabComponent
                tabType={'mainTabs'}
                tabs={['Committee', 'Candidates']}
                activeTab={activeTab}
                handleTabSelect={(tab) => setActiveTab(tab === activeTab ? "" : tab)}
            />
            <TabComponent
                tabType={'electionTab'}
                tabs={electionData || []}
                activeTab={activeElectionType}
                handleTabSelect={(type) => {
                    setActiveElectionType(activeElectionType === type ? '' : type)
                }}
            />
            <ListingGrid
                headings={['S.No', 'Name', 'Place', 'Party', 'Actions']}
                data={data || []}
                isLoading={isLoading}
                setEdit={(id) => {
                    setId(id)
                    setIsEdit((prev) => !prev)
                }}
                handleDelete={handleDeleteCandidate}
                setIsAdd={() => setIsAdd((prev) => !prev)}
            ></ListingGrid>
            {isEdit &&
                <Modal >
                    <div className={styles.innerModal}>
                        <div className={styles.editForm}>
                            <h2 className={styles.title}>Edit Candidate Details</h2>
                            <button onClick={() => {
                                setId('');
                                setIsEdit(false);
                                setCandidateDetails(initialData);
                            }} className={styles.closeBtn}>✕</button>

                            <div className={styles.details}>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Candidate Name</div>
                                    <input className={styles.inputField} name="candidate_name" defaultValue={candidateDetails?.candidate_name} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Aadhar Details</div>
                                    <input className={styles.inputField} name="aadhar_id" defaultValue={candidateDetails?.aadhar_id} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Contact Number</div>
                                    <input className={styles.inputField} name="contact_no" defaultValue={candidateDetails?.contact_no} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Email</div>
                                    <input className={styles.inputField} name="email" defaultValue={candidateDetails?.email} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Gender</div>
                                    <input className={styles.inputField} name="gender" defaultValue={candidateDetails?.gender} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Date Of Birth</div>
                                    <input className={styles.inputField} name="DOB" defaultValue={candidateDetails?.DOB} disabled />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Election Type</div>
                                    <input className={styles.inputField} name="election_type" defaultValue={candidateDetails?.election_type} onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Address</div>
                                    <input className={styles.inputField} name="address" defaultValue={candidateDetails?.address} onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Party</div>
                                    <input className={styles.inputField} name="party" defaultValue={candidateDetails?.party} onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Nomination Location</div>
                                    <input className={styles.inputField} name="nomination_location" defaultValue={candidateDetails?.nomination_location} onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div>
                                </div>
                            </div>
                            <button className={'primaryButton'} onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </Modal>
            }

            {isAdd &&
                <Modal >
                    <div className={styles.innerModal}>
                        <div className={styles.editForm}>
                            <h2 className={styles.title}>Add Candidate Details</h2>
                            <button onClick={() => {
                                setIsAdd(false)
                            }} className={styles.closeBtn}>✕</button>

                            <div className={styles.details}>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Candidate Name</div>
                                    <input className={styles.inputField} name="candidate_name" onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Aadhar Details</div>
                                    <input className={styles.inputField} name="aadhar_id" onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Contact Number</div>
                                    <input className={styles.inputField} name="contact_no" onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Email</div>
                                    <input className={styles.inputField} name="email" defaultValue={candidateDetails?.email} onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Date Of Birth</div>
                                    <input className={styles.inputField} name="DOB" defaultValue={candidateDetails?.DOB} onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Gender</div>
                                    <input className={styles.inputField} name="gender" onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Election Type</div>
                                    <input className={styles.inputField} name="election_type" defaultValue={activeElectionType} onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Address</div>
                                    <input className={styles.inputField} name="address" onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Party</div>
                                    <input className={styles.inputField} name="party" onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.detailsLabel}>Nomination Location</div>
                                    <input className={styles.inputField} name="nomination_location" onChange={(e) => handleEditCandidate(e)} />
                                </div>
                                <div>
                                </div>

                            </div>
                            <button className={'primaryButton'} onClick={handleAdd}>Update</button>
                        </div>
                    </div>
                </Modal>
            }
        </Layout >
    )
}



/*
ID
: 
4
aadhar_id
: 
"4567-8912-3456"
address
: 
"19 Rajaji Nagar, Bengaluru, KA"
candidate_name
: 
"Neha Raut"
contact_no
: 
"9001234567"
election_type
: 
"State Assembly"
email
: 
"neha.raut@partyD.com"
gender
: 
"Female"
nomination_location
: 
"Yelanka"
party
: 
"Congress"
*/