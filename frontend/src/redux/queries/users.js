import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const signUpApi = createApi({
    reducerPath: 'signUpApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
    endpoints: (builder) => ({
        getUsersData: builder.query({
            query: ({ email, user_type }) => `/auth/users?email=${email}&user_type=${user_type}`,
        }),

    }),

})

export const {
    useGetUsersDataQuery,
} = signUpApi



