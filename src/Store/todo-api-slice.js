import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authActions } from "./auth-slice";
 
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    switch (result.error.status) {

      case 401:
        api.dispatch(authActions.signOut()); 
        break;

      case 404:
        const refreshResult = await api.dispatch(todoApi.endpoints.refresh.initiate({}));

        if (refreshResult.error) {
          api.dispatch(authActions.signOut());
          return; 
        }
        result = await baseQuery(args, api, extraOptions);
        break;
    }
  }
  return result;
};

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: baseQueryWithAuthCheck,
  tagTypes: ["Todos"],

  endpoints: (builder) => ({

    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        credentials: "include", 
      }),
    }),
    
    getTodos: builder.query({
      query: (userId) => `/todo/get-todo/${userId}`,
      providesTags: ["Todos"],
    }),

    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todo/add-todo",
        method: "POST",
        body: todo,
      }),

      async onQueryStarted(todo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodos",todo.user_id,(draft) => {
            draft.push(todo);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    
    updateTodo: builder.mutation({
      query: (updated) => ({
        url: "/todo/update-todo",
        method: "PUT",
        body: updated,
      }),

      async onQueryStarted(updated, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodos", updated.user_id, (draft) => {
            const index = draft.findIndex((todo) => todo._id === updated._id);
            if (index !== -1) {
              draft[index] = { ...draft[index], ...updated };
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    

    
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todo/delete-todo/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodos", undefined, (draft) => {
            return draft.filter((todo) => todo._id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
