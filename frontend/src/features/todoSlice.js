import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTask = createAsyncThunk("todos/addTask", async (task) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/addtodo",
            task
        );
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const fetchTask = createAsyncThunk("todos/fetchTask", async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/gettodos");
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateTask = createAsyncThunk(
    "todos/updateTask",
    async ({ id, completed }) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/updatetodo/${id}`,
                { completed }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteTask = createAsyncThunk(
    "todos/deleteTask",
    async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/deletetodo/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
)

const todosSlice = createSlice({
    name: "todoslist",
    initialState: {
        todos: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                // Update the specific todo in the todos array
                const updatedTodoIndex = state.todos.findIndex(
                    (todo) => todo.id === action.payload.id
                );
                if (updatedTodoIndex !== -1) {
                    state.todos[updatedTodoIndex] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default todosSlice.reducer;