import { useGetUsersDataQuery } from "../queries/users";
import { useCreateVoterMutation, useGetVoterDetailQuery } from "../queries/voters";

export const useGetVoterDetails = (user_id) => {
    console.log(user_id, 'hooksss')
    const { data, isLoading, error } = useGetUsersDataQuery({ user_id }, { skip: !user_id });
    const { data: voterDetails, isLoading: voterDetailsLoading, error: voterDetailsError } = useGetVoterDetailQuery({ user_id }, { skip: !data });
    console.log(voterDetails, 'hooks')
    return {
        data,
        voterDetails,
        is_registered: voterDetails?.length != 0
    }

}

export const useGetVoterDetailsAfterCreate = async (details, user_id) => {
    const [createVoter] = useCreateVoterMutation();
    let res = await createVoter({ ...details, is_registered: true });
    const { data: voterDetails, isLoading: voterDetailsLoading, error: voterDetailsError } = useGetVoterDetailQuery({ user_id }, { skip: !res?.data });
    return {
        voterDetails
    }
}