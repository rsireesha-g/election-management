
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { candidatesApi } from './queries/candidates';
import { signUpApi } from './queries/users';
import { electionsApi } from './queries/elections';
import { votersApi } from './queries/voters';
import { votesApi } from './queries/votes';

const rootReducer = combineReducers({
    [candidatesApi.reducerPath]: candidatesApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
    [electionsApi.reducerPath]: electionsApi.reducer,
    [votersApi.reducerPath]: votersApi.reducer,
    [votesApi.reducerPath]: votesApi.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(candidatesApi.middleware)
            .concat(signUpApi.middleware)
            .concat(electionsApi.middleware)
            .concat(votersApi.middleware)
            .concat(votesApi.middleware)
});
