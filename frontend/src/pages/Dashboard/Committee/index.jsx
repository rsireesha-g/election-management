import { useEffect, useState } from 'react';
import { Layout } from '../../../components/Dashboard/Layout'
import { ListingGrid } from '../../../components/Dashboard/ListingGrid/ListingGrid'
import styles from "./index.module.css";
import {
    useAddCandidateDataMutation,
    useDeleteCandidateDataMutation,
    useGetCandidateDataByElectionTypeQuery,
    useGetCandidateDetailsByIdQuery,
    useGetVotersCountForCandidatesByElectionQuery,
    useUpdateCandidateDataMutation
} from '../../../redux/queries/candidates';
import { useGetElectionsDataQuery } from '../../../redux/queries/elections';
import { TabComponent } from '../../../components/Dashboard/TabComponent';
import { AddCandidate } from './AddCandidate';
import { EditCandidate } from './EditCandidate';

import { toast } from 'react-toastify';
import { Result } from './Result';

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
    DOB: '',
}

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Candidates');
    const [activeElectionType, setActiveElectionType] = useState('Parliament');
    const { data, error, isLoading } = useGetCandidateDataByElectionTypeQuery(activeElectionType, { skip: !activeElectionType });
    const { data: electionData, error: electionErr, isLoading: ElectionLoading } = useGetElectionsDataQuery();

    const [deleteCandidate] = useDeleteCandidateDataMutation();
    const [updateCandidate] = useUpdateCandidateDataMutation();

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModelOpen] = useState(false)
    const [id, setId] = useState();
    const { data: candidate, error: candidateErr, isLoading: candidateLoading } = useGetCandidateDetailsByIdQuery(id, { skip: !id });
    const [addCandidate] = useAddCandidateDataMutation();
    const { data: resultsData, isLoading: resultsLoading } = useGetVotersCountForCandidatesByElectionQuery({ skip: activeElectionType !== "Results" });

    const [candidateDetails, setCandidateDetails] = useState(initialData);

    const handleDeleteCandidate = async (id) => {
        try {
            const res = await deleteCandidate(id).unwrap()
            toast.success(res?.data?.message);
            setIsDeleteModelOpen(false);
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err?.message || err?.error)
        }
    }

    const handleChange = (e) => {
        var { name, value } = e.target;
        setCandidateDetails({ ...candidateDetails, [name]: value })
    }

    const handleUpdate = async () => {
        console.log(candidateDetails);
        try {
            const res = await updateCandidate({ id, candidate: candidateDetails }).unwrap();
            toast.success(res?.data?.message);
            setIsEdit(false);
            setId('');
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err?.message || err?.error)
        }
    }

    const handleAdd = async () => {
        // const isValidated = handleValidations();  
        try {
            console.log(candidateDetails);
            const data = { ...candidateDetails, "election_type": activeElectionType };
            const res = await addCandidate(data).unwrap();
            toast.success(res?.data?.message);
            setIsAdd(false);
            setId('');
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err?.message || err?.error)
        }
    }

    useEffect(() => {
        if (candidate?.[0]) {
            let x = new Date(candidate?.[0]?.DOB);
            let y = x?.toISOString()?.split("T")?.[0];
            setCandidateDetails({ ...candidate?.[0], "DOB": y });
        }
    }, [candidate]);


    return (
        <Layout type='committee' >
            <h2 className={styles.title}>Committee Dashboard</h2>
            <TabComponent
                tabType={'mainTabs'}
                tabs={['Candidates', 'Results']}
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
            {activeTab === 'Candidates' ?
                <>
                    <ListingGrid
                        electionType={activeElectionType}
                        headings={['S.No', 'Name', 'Place', 'Party', 'Actions']}
                        data={data || []}
                        isLoading={isLoading}
                        id={id}
                        setID={setId}
                        setEdit={(id) => {
                            setId(id)
                            setIsEdit(true)
                        }}
                        handleDelete={handleDeleteCandidate}
                        setIsAdd={() => setIsAdd((prev) => !prev)}
                        isDeleteModalOpen={isDeleteModalOpen}
                        setIsDeleteModelOpen={setIsDeleteModelOpen}
                    ></ListingGrid>

                    {isEdit &&
                        <EditCandidate
                            onClose={() => {
                                setId();
                                setIsEdit(false);
                                setCandidateDetails(initialData);
                            }}
                            isLoading={candidateLoading}
                            candidate={candidateDetails}
                            handleChange={handleChange}
                            handleUpdate={handleUpdate}
                        />
                    }

                    {isAdd &&
                        <AddCandidate
                            onClose={() => {
                                setIsAdd(false)
                            }}
                            handleAdd={handleAdd}
                            handleChange={handleChange}
                            activeElectionType={activeElectionType}
                        />
                    }
                </>
                :
                <Result {...{ electionData, activeElectionType, resultsData, resultsLoading }} />
            }
        </Layout >
    )
}

