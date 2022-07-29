import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => "users",
            transformResponse: (res) => res.reverse(),
            providesTags: ["Users"]
        }), 
        getUser: builder.query({
            query: (id) => ({
                url: `users/${id}`
            }),
            providesTags: ["Users"]
        }),
        addUser: builder.mutation({
            query: (userInput) => ({
                url: "users", 
                method: "POST",
                body: userInput
            }), 
            invalidatesTags: ["Users"]                
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE"                
            }),
            invalidatesTags: ["Users"]
        }), 
        updateUser: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `users/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Users"]
        })
    })
});

export const {useGetAllUsersQuery, useAddUserMutation, useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation} = usersApi;

