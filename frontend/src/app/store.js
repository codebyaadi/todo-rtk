import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "../features/todoSlice";

export const store = configureStore({
    reducer: {
        app: todosSlice
    }
})