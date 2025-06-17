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
import { AddCandidate } from './AddCandidate';
import { EditCandidate } from './EditCandidate';

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

    const handleChange = (e) => {
        var { name, value } = e.target;
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
    // const handleValidations = () => {
    //     const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    // }
    const handleAdd = async () => {
        // const isValidated = handleValidations();
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
    }, [candidate, id]);


    return (
        <Layout title='Dashboard' >
            <h2 className={styles.title}>Committee Dashboard</h2>
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
                electionType={activeElectionType}
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
                <EditCandidate
                    onClose={() => {
                        setId();
                        setIsEdit(false);
                        setCandidateDetails(initialData);
                    }}
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