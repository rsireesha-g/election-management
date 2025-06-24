import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const votesApi = createApi({
    reducerPath: 'votesApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
    tagTypes: ['votes'],
    endpoints: (builder) => ({
        createVote: builder.mutation({
            query: (data) => ({
                url: `/votes`,
                method: "post",
                body: data
            }),
            invalidatesTags: ['votes']
        }),
        getVotesData: builder.query({
            query: () => '/votes',
            providesTags: ['votes']
        })
    }),
});

export const {
    useCreateVoteMutation,
    useGetVotesDataQuery
} = votesApi;