import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const electionsApi = createApi({
    reducerPath: 'electionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
    endpoints: (builder) => ({
        getElectionsData: builder.query({
            query: () => '/elections',
        }),
    }),
});

export const {
    useGetElectionsDataQuery
} = electionsApi;