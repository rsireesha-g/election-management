import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const votersApi = createApi({
    reducerPath: 'votersApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
    tagTypes: ['voters'],
    endpoints: (builder) => ({
        getVoterDetail: builder.query({
            query: ({ user_id }) => `/voters?user_id=${user_id}`,
            providesTags: ['voters']
        }),
        createVoter: builder.mutation({
            query: (data) => ({
                url: '/voters',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['voters']
        }),
        updateVoter: builder.mutation({
            query: (data) => ({
                url: `/voters/${data?.id}`,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['voters']
        })
    })
})

export const {
    useGetVoterDetailQuery,
    useCreateVoterMutation,
    useUpdateVoterMutation

} = votersApi;