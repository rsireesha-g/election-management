import { useState } from 'react';
import { Layout } from '../../../../components/Dashboard/Layout'
import { useGetVoterDetailQuery, useUpdateVoterMutation } from '../../../../redux/queries/voters';
import styles from "./index.module.css";
import { EditVoter } from './EditVoter';
import { useGetVoterDetails } from '../../../../redux/hooks/voter';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export const MyProfile = () => {
    const email = localStorage.getItem('email');
    const [searchParams] = useSearchParams();
    const user_id = searchParams.get('user_id');

    // const { data: voterDetails, isLoading } = useGetVoterDetailQuery(email, { skip: !email })
    const [address, setAddress] = useState({ address: '', email: '' });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleChange = (e) => {
        var { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    }
    const { voterDetails, is_registered } = useGetVoterDetails(user_id);


    const [updateVoterDetails] = useUpdateVoterMutation();
    const handleUpdate = async (e) => {
        e.preventDefault();
        const date = (new Date(voterDetails?.[0]?.DOB))?.toISOString()?.split("T")?.[0];
        const data = { ...voterDetails?.[0], ["address"]: address?.address || voterDetails?.[0]?.address, ["DOB"]: date, 'email': address?.email };
        try {
            let res = await updateVoterDetails(data);
            res?.data && toast.success("Profile Updated Successfully!")
            res?.data && setIsEditModalOpen(false);
        } catch (err) {
            console.log(err)
        }
    }
    console.log(voterDetails, 'details')

    return (
        <>
            <Layout type='voter'>
                <div className={styles.dataDisplay}>
                    <div className={styles.profileAndBtns}>
                        <div className={styles.profileFlex}>
                            <div className={styles.profileIcon}>
                                {voterDetails ?
                                    <p> {(voterDetails?.[0]?.voter_name?.split(""))?.splice(0, 2)}</p>
                                    :
                                    ''
                                }
                            </div>
                            <div className={styles.name}>{voterDetails?.[0]?.voter_name}</div>
                        </div>
                        <div className={styles.btnsFlex}>
                            <button className={`primaryButton ${styles.editBtn}`}
                                onClick={() => setIsEditModalOpen(true)}
                            >Edit</button>
                        </div>
                    </div>
                    <div className={styles.gridBox}>
                        {/* {isLoading ?
                            <div>Loading...</div>
                            : */}
                        <>
                            <div className={styles.grid}>
                                <div className={styles.label}>Name</div>
                                <div>:</div>
                                <div className={styles.value}>{voterDetails?.[0]?.voter_name}</div>
                            </div>
                            <div className={styles.grid}>
                                <div className={styles.label}>Email ID</div>
                                <div>:</div>
                                <div className={styles.value}>{voterDetails?.[0]?.email}</div>
                            </div>
                            <div className={styles.grid}>
                                <div className={styles.label}>Contact No</div>
                                <div>:</div>
                                <div className={styles.value}>{voterDetails?.[0]?.contact_no || '---'}</div>
                            </div>
                            <div className={styles.grid}>
                                <div className={styles.label}>Aadhar Id</div>
                                <div>:</div>
                                <div className={styles.value}>{voterDetails?.[0]?.aadhar_id || '---'}</div>
                            </div>
                            <div className={styles.grid}>
                                <div className={styles.label}>Date Of Birth</div>
                                <div>:</div>
                                <div className={styles.value}>{voterDetails?.[0]?.DOB || '---'}</div>
                            </div>
                            <div className={styles.grid}>
                                <div className={styles.label}>Gender</div>
                                <div>:</div>
                                <div className={styles.value}>{voterDetails?.[0]?.gender || '---'}</div>
                            </div>
                            <div className={styles.grid}>
                                <div className={styles.label}>Address</div>
                                <div>:</div>
                                <div className={styles.value}>{voterDetails?.[0]?.address || '---'}</div>
                            </div>
                        </>
                        {/* /* } */}
                    </div>
                </div>
            </Layout>
            {isEditModalOpen &&
                <EditVoter
                    voterDetails={voterDetails?.[0]}
                    handleChange={handleChange}
                    handleUpdate={handleUpdate}
                    onClose={() => setIsEditModalOpen(false)}
                />
            }
        </>
    )
}