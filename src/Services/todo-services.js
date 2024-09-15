import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk('user/todos', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo/get-todo/${id}`)

    if (!response.ok) {
      const errData = await response.json();
      console.log(errData.message);
      return rejectWithValue(errData.message);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});


export const addTodo = createAsyncThunk(
  "user/todo/add",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todo/add-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        const errData = await response.json();
        return rejectWithValue(errData.message);
      }

      const data = await response.json();
      return data;

    } catch (err) {
      return rejectWithValue("Something went wrong");
    }
  }
);


export const updateTodo = createAsyncThunk(
  "user/todo/update",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todo/update-todo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        const errData = await response.json();
        return rejectWithValue(errData.message);
      }

      const data = await response.json();
      return data;

    } catch (err) {
      return rejectWithValue("Something went wrong");
    }
  }
);



export const deleteTodo = createAsyncThunk('user/todo/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo/delete-todo/${id}`,{
      method:"DELETE"
    })

    if (!response.ok) {
      const errData = await response.json();
      console.log(errData.message);
      return rejectWithValue(errData.message);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
 

