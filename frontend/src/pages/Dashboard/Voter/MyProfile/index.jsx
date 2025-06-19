import { useState } from 'react';
import { Layout } from '../../../../components/Dashboard/Layout'
import { useGetVoterDetailQuery, useUpdateVoterMutation } from '../../../../redux/queries/voters';
import styles from "./index.module.css";
import { EditVoter } from './EditVoter';


export const MyProfile = () => {
    const email = localStorage.getItem('email');
    console.log(email)

    const { data: voterData, isLoading } = useGetVoterDetailQuery(email, { skip: !email })
    const [address, setAddress] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleChange = (e) => {
        setAddress(e.target.value);
    }

    const [updateVoterDetails] = useUpdateVoterMutation();
    const handleUpdate = async (e) => {
        e.preventDefault();
        const date = (new Date(voterData?.DOB))?.toISOString()?.split("T")?.[0];
        const data = { ...voterData, ["address"]: address, ["DOB"]: date };
        try {
            let res = await updateVoterDetails(data);
            res?.data && setIsEditModalOpen(false);
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <Layout type='voter'>
                <div className={styles.dataDisplay}>
                    <div className={styles.profileAndBtns}>
                        <div className={styles.profileFlex}>
                            <div className={styles.profileIcon}>
                                {voterData ?
                                    <p> {(voterData?.voter_name?.split(""))?.splice(0, 2)}</p>
                                    :
                                    ''
                                }
                            </div>
                            <div className={styles.name}>{voterData?.voter_name}</div>
                        </div>
                        <div className={styles.btnsFlex}>
                            <button className={`primaryButton ${styles.editBtn}`}
                                onClick={() => setIsEditModalOpen(true)}
                            >Edit</button>
                        </div>
                    </div>
                    <div className={styles.gridBox}>
                        {isLoading ?
                            <div>Loading...</div>
                            :
                            <>
                                <div className={styles.grid}>
                                    <div className={styles.label}>Name</div>
                                    <div>:</div>
                                    <div className={styles.value}>{voterData?.voter_name}</div>
                                </div>
                                <div className={styles.grid}>
                                    <div className={styles.label}>Email ID</div>
                                    <div>:</div>
                                    <div className={styles.value}>{voterData?.email}</div>
                                </div>
                                <div className={styles.grid}>
                                    <div className={styles.label}>Contact No</div>
                                    <div>:</div>
                                    <div className={styles.value}>{voterData?.contact_no || '---'}</div>
                                </div>
                                <div className={styles.grid}>
                                    <div className={styles.label}>Aadhar Id</div>
                                    <div>:</div>
                                    <div className={styles.value}>{voterData?.aadhar_id || '---'}</div>
                                </div>
                                <div className={styles.grid}>
                                    <div className={styles.label}>Date Of Birth</div>
                                    <div>:</div>
                                    <div className={styles.value}>{(new Date(voterData?.DOB))?.toISOString()?.split("T")?.[0] || '---'}</div>
                                </div>
                                <div className={styles.grid}>
                                    <div className={styles.label}>Gender</div>
                                    <div>:</div>
                                    <div className={styles.value}>{voterData?.gender || '---'}</div>
                                </div>
                                <div className={styles.grid}>
                                    <div className={styles.label}>Address</div>
                                    <div>:</div>
                                    <div className={styles.value}>{voterData?.address || '---'}</div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Layout>
            {isEditModalOpen &&
                <EditVoter
                    voterDetails={voterData}
                    handleChange={handleChange}
                    handleUpdate={handleUpdate}
                    onClose={() => setIsEditModalOpen(false)}
                />
            }
        </>
    )
}