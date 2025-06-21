import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const signUpApi = createApi({
    reducerPath: 'signUpApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
    endpoints: (builder) => ({
        getUsersData: builder.query({
            query: ({ user_id }) => `/auth/users?user_id=${user_id}`,
        }),

    }),

})

export const {
    useGetUsersDataQuery,
} = signUpApi



