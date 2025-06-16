import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const candidatesApi = createApi({
    reducerPath: 'candidatesApi',
    tagTypes: ['candidates'],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
    endpoints: (builder) => ({
        getCandidatesData: builder.query({
            query: () => '/candidates',
        }),
        addCandidateData: builder.mutation({
            query: (data) => ({
                url: '/candidates',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['candidates']
        }),
        getCandidateDetailsById: builder.query({
            query: (id) => `/candidates/${id}`
        }),
        updateCandidateData: builder.mutation({
            query: ({ id, candidate }) => ({
                url: `/candidates/${id}`,
                method: 'put',
                body: candidate,
            }),
            invalidatesTags: ['candidates'],
        }),
        deleteCandidateData: builder.mutation({
            query: (id) => ({
                url: `/candidates/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['candidates']
        }),
        getCandidateDataByElectionType: builder.query({
            query: (election_type) => `/candidates/election/${election_type}`,
            providesTags: ['candidates']
        })
    }),
});

export const {
    useGetCandidatesDataQuery,
    useAddCandidateDataMutation,
    useGetCandidateDetailsByIdQuery,
    useUpdateCandidateDataMutation,
    useDeleteCandidateDataMutation,
    useGetCandidateDataByElectionTypeQuery
} = candidatesApi;