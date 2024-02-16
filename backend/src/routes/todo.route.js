import express from "express";
import Todo from "../models/Todos.js";

const router = express.Router();

router.post("/addtodo", async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description || !name.length || !description.length) {
            return res.status(400).json({ error: "Please provide task name and description" });
        }

        const todo = await Todo.create({ name, description });
        console.log(todo);
        return res.status(201).json(todo);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/gettodos", async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/updatetodo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Todo ID is required" });
        }

        const todo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        return res.status(200).json(todo);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/deletetodo/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Todo ID is required" });
        }

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        return res.status(200).json(deletedTodo);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;