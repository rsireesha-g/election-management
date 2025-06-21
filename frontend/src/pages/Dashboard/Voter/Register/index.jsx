import { useSearchParams } from 'react-router-dom'
import { Layout } from '../../../../components/Dashboard/Layout'
import { useGetUsersDataQuery } from '../../../../redux/queries/users'
import styles from "./index.module.css"
import { useEffect, useState } from 'react'
import { useCreateVoterMutation, useGetVoterDetailQuery } from '../../../../redux/queries/voters'
import { useGetVoterDetails } from '../../../../redux/hooks/voter'

const initialData = {
    voter_name: '',
    aadhar_id: '',
    contact_no: '',
    gender: '',
    address: '',
    email: '',
    DOB: '',
    nationality: ''
}

export const Register = () => {
    const [searchParams] = useSearchParams();
    const user_id = searchParams.get('user_id');
    const { data, is_registered } = useGetVoterDetails(user_id);

    const [createVoter] = useCreateVoterMutation();
    const [details, setDetails] = useState(initialData);
    let [is_reg, setIsReg] = useState(false);

    const handleChange = (e) => {
        var { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log('first')
            let res = await createVoter({ ...details, is_registered: true, user_id: user_id });
            res?.data && setIsReg(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (data) {
            setDetails({ ...details, "voter_name": data?.user_name, "email": data?.email });
        }
    }, [data]);

    console.log(is_reg, is_registered);

    return (
        <Layout type='voter'>
            <h2 className={styles.title}>Welcome {data?.user_name || 'Voter'}!</h2>
            <h4 >Please, register your details.</h4>
            {(is_registered || is_reg) ?
                <div className={styles.message}>Already Registered!</div>
                :
                <form className={styles.form} onSubmit={(e) => handleRegister(e)}>
                    <div className={styles.details}>
                        <div className={styles.card}>
                            <div className={styles.detailsLabel}>Voter Name</div>
                            <input className={styles.inputField}
                                name="voter_name"
                                placeholder='Eg: Nehru'
                                defaultValue={details?.voter_name}
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
                                defaultValue={details?.email}
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
                            <div className={styles.detailsLabel}>Nationality</div>
                            <input className={styles.inputField} name="nationality"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                }}
                                placeholder="Indian" onChange={(e) => handleChange(e)} />
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
