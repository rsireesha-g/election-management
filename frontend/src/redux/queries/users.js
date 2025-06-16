import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"

export const signUpApi = createApi({
    reducerPath: 'signUpApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API}/auth/signup` }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
        }),
    }),
})
