import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authActions } from "./auth-slice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
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
        const refreshResult = await api.dispatch(
          todoApi.endpoints.refresh.initiate({})
        );

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
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Todos", id: _id })), // Tag each todo individually
              { type: "Todos", id: userId }, // Tag for the entire list
            ]
          : [{ type: "Todos", id: userId }],
    }),

    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todo/add-todo",
        method: "POST",
        body: todo,
      }),

      async onQueryStarted(todo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodos", todo.userId, (draft) => {
            draft.push(todo);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: (result, error, todo) => [{ type: "Todos", id: todo.userId }],
    }),

    updateTodo: builder.mutation({
      query: (updated) => ({
        url: "/todo/update-todo",
        method: "PUT",
        body: updated,
      }),

      async onQueryStarted(updated, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodos", updated.userId, (draft) => {
            const index = draft.findIndex((todo) => todo._id === updated._id);
            if (index !== -1) {
              Object.assign(draft[index], updated);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: (result, error, updated) => [{ type: "Todos", id: updated._id }],
    }),

    deleteTodo: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/todo/delete-todo/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted({ id, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodos", userId, (draft) => {
            const index = draft.findIndex((todo) => todo._id === id);
            if (index !== -1) draft.splice(index, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: (result, error, { id }) => [{ type: "Todos", id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
