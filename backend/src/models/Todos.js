import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Todo = mongoose.model("todos", todoSchema);

export default Todo;