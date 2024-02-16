import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/todoSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTask = () => {
    console.log(task);
    dispatch(addTask(task));
  }

  return (
    <div
      id="task-input"
      className="bg-zinc-700 w-full flex flex-col justify-center items-center py-8 rounded"
    >
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <input
            className="px-4 py-2 bg-zinc-800 text-white/90 outline-none rounded"
            type="text"
            name="name"
            id="task-name"
            placeholder="Enter Task Name"
            value={task.name}
            onChange={handleInputChange}
          />
          <input
            className="px-4 py-2 bg-zinc-800 text-white/90 outline-none rounded"
            type="text"
            name="description"
            id="task-description"
            placeholder="Enter Task Description"
            value={task.description}
            onChange={handleInputChange}
          />
        </div>
        <button className="w-full px-2 py-2 bg-orange-500 text-white rounded" type="button" onClick={handleAddTask}>
          Add New Task
        </button>
      </div>
    </div>
  );
}

export default AddTask;