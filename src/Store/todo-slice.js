import { createSlice } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../Services/todo-services";

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    error: null,
    loading: false,
    todos: [],
    sort:false,
  },
  reducers: {

    updatingTodo: (state, action) => {

      console.log(action.payload)

      state.todos = state.todos.map( (todo) =>
      {

        if(todo._id === action.payload.id)
        {
          return {...todo,updating:action.payload.status};
        }

        const {updating,...nonUpdating} = todo;
        return nonUpdating;

      }) 
    },

    emptyTodos: (state,action) =>
    {
      state.todos = [];
    } 

  },

  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, handlePending)
      .addCase(getTodos.rejected, handleRejected)
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos = action.payload;
      })
      
      .addCase(addTodo.rejected, handleRejected)
      .addCase(addTodo.pending, handlePending)
      .addCase(addTodo.fulfilled,(state,action)=>
      {
        state.loading = false;
        state.error = null;
        state.todos = [...state.todos,action.payload];
      })
      .addCase(deleteTodo.rejected, handleRejected)
      .addCase(deleteTodo.pending, handlePending)
      .addCase(deleteTodo.fulfilled,(state,action)=>
      {
        state.loading = false;
        state.error = null;
        state.todos = state.todos.filter(todo => todo._id !== action.payload.deletedTodo._id);
      })
      .addCase(updateTodo.fulfilled,(state,action)=>
      {     
        const updatedTodo = action.payload.updatedTodo;
        state.todos = state.todos.map(todo => todo._id === updatedTodo._id ? {...todo,...updatedTodo} : todo)
      })
      .addCase(updateTodo.pending,handleRejected)
      .addCase(updateTodo.rejected,handlePending)
      
    },
});


export default todoSlice.reducer;
export const todoActions = todoSlice.actions;
