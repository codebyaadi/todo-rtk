import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/base";

export const addTask = createAsyncThunk("todos/addTask", async (task) => {
    try {
        const response = await api.post(
            "/addtodo",
            task
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || error.message;
    }
});

export const fetchTask = createAsyncThunk("todos/fetchTask", async () => {
    try {
        const response = await api.get("/gettodos");
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || error.message;
    }
});

export const updateTask = createAsyncThunk(
    "todos/updateTask",
    async ({ id, completed }) => {
        try {
            const response = await api.put(
                `/updatetodo/${id}`,
                { completed }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || error.message;
        }
    }
);

export const deleteTask = createAsyncThunk("todos/deleteTask", async (id) => {
    try {
        const response = await api.delete(
            `/deletetodo/${id}`
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || error.message;
    }
});

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
                const updatedTodoIndex = state.todos.findIndex(
                    (todo) => todo._id === action.payload._id
                );
                if (updatedTodoIndex !== -1) {
                    state.todos[updatedTodoIndex] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter(
                    (todo) => todo._id !== action.payload._id
                );
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default todosSlice.reducer;
