import { useSearchParams } from 'react-router-dom'
import { Layout } from '../../../../components/Dashboard/Layout'
import { useGetUsersDataQuery } from '../../../../redux/queries/users'
import styles from "./index.module.css"
import { useEffect, useState } from 'react'
import { useCreateVoterMutation, useGetVoterDetailQuery } from '../../../../redux/queries/voters'

const initialData = {
    voter_name: '',
    aadhar_id: '',
    contact_no: '',
    gender: '',
    address: '',
    email: '',
    DOB: ''
}

export const Register = () => {
    const email = localStorage.getItem("email");
    const user_type = localStorage.getItem("user_type");
    const emailEncoded = encodeURIComponent(email);


    const { data, isLoading, error } = useGetUsersDataQuery({ email: emailEncoded, user_type }, { skip: !emailEncoded || !user_type })
    const [voterDetails, setVoterDetails] = useState(initialData);
    const [createVoter] = useCreateVoterMutation();
    const [isSuccessfullyRegistered, setIsSuccessfullyRegistered] = useState(false);
    const { data: voterData } = useGetVoterDetailQuery(email, { skip: !isSuccessfullyRegistered })
    console.log(isSuccessfullyRegistered, 'register', voterData)
    const handleChange = (e) => {
        var { name, value } = e.target;
        setVoterDetails({ ...voterDetails, [name]: value })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            let res = await createVoter({ ...voterDetails, is_registered: true });
            res?.data && setIsSuccessfullyRegistered(true);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (data) {
            setVoterDetails({ ...voterDetails, "voter_name": data?.user_name, "email": decodeURIComponent(data?.email) });
        }
    }, [data]);

    return (
        <Layout type='voter'>
            <h2 className={styles.title}>Welcome {voterDetails?.voter_name || 'Voter'}!</h2>
            <h4 >Please, register your details.</h4>
            {voterData ?
                <div className={styles.message}>Already Registered!</div>
                : <form className={styles.form} onSubmit={(e) => handleRegister(e)}>
                    <div className={styles.details}>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Voter Name</div>
                            <input className={styles.inputField}
                                name="voter_name"
                                placeholder='Eg: Nehru'
                                defaultValue={voterDetails?.voter_name}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                }}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Aadhar Details</div>
                            <input className={styles.inputField}
                                onInput={(e) => {
                                    let enteredVal = e.target.value.replace(/\D/g, '').slice(0, 12);
                                    let changedVal = enteredVal.match(/.{1,4}/g)?.join('-') || '';
                                    e.target.value = changedVal;
                                }}
                                maxLength={14} name="aadhar_id" placeholder="Eg:9999-9999-9999" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Contact Number</div>
                            <input className={styles.inputField}

                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                }}
                                maxLength={10} name="contact_no" placeholder='Eg: 9999999999' onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Email</div>
                            <input className={styles.inputField}
                                defaultValue={voterDetails?.email}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^\w.@+-]/g, '').toLowerCase();
                                }}
                                name="email" placeholder="Eg: abc@gmail.com" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Date Of Birth (YYYY-MM-DD)</div>
                            <input className={styles.inputField} maxLength={10} name="DOB" placeholder="Eg: 2020-02-02" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Gender</div>
                            <input className={styles.inputField} name="gender"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                }}
                                placeholder="Gender" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Full Address</div>
                            <input className={styles.inputField} name="address" placeholder="Enter Full address" onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                        </div>

                    </div>
                    <input type="submit" value='Register' className={`${styles.submitBtn} primaryButton`} />
                </form>
            }
        </Layout>
    )
}
