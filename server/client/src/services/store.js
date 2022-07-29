import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {usersApi} from "./usersApi";

export default configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(usersApi.middleware);
    }
});