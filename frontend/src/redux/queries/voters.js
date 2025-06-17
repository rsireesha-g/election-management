import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const votersApi = createApi({
    reducerPath: 'votersApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
    tagTypes: ['voters'],
    endpoints: (builder) => ({
        getVoterDetail: builder.query({
            query: (email) => ({
                url: '/voters',
                params: { email }
            }),
            providesTags: ['voters']
        }),
        createVoter: builder.mutation({
            query: (data) => ({
                url: '/voters',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['voters']
        })
    })
})

export const {
    useGetVoterDetailQuery,
    useCreateVoterMutation

} = votersApi;