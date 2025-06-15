import { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout'
import { ListingGrid } from '../../components/ListingGrid/ListingGrid'
import styles from "./dashboard.module.css";
import axios from 'axios';

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Committee');
    const [activeElectionType, setActiveElectionType] = useState('');
    const [data, setData] = useState([]);

    console.log(process.env.REACT_APP_API)
    const getData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API}/candidates`);
        console.log(res?.data);
        setData(res?.data)
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <Layout title='Commitee Dashboard' >
            <h2 className={styles.title}>Welcome User!</h2>
            <ListingGrid
                tabs={['Committee', 'Candidates']}
                electionTypes={['Muncipal', 'Parliament', 'State Assembly']}
                activeTab={activeTab}
                handleTabSelect={(tab) => setActiveTab(tab === activeTab ? "" : tab)}
                activeType={activeElectionType}
                handleTypeSelect={(type) => {
                    setActiveElectionType(activeElectionType === type ? '' : type)
                }}
                headings={['S.No', 'Name', 'Place', 'Party', 'Actions']}
                data={data}
            ></ListingGrid>
        </Layout >
    )
}



