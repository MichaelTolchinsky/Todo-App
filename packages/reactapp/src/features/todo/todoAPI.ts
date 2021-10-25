import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<any[], void>({
      query: () => '/',
      providesTags: ['Todo']
    }),
    addTodo: builder.mutation<any, { task: string }>({
      query: (task) => ({
        url: '/add',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['Todo']
    }),
    updateTodo: builder.mutation<void, { id: string, task: string }>({
      query: ({ id, task }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: { task }
      }),
    }),
    deleteTodo: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo']
    })
  })
})

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi