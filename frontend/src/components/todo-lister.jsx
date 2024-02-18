import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask, updateTask, deleteTask } from "../features/todoSlice";

const TodoLister = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.app.todos);
  const loading = useSelector((state) => state.app.loading);

  const handleCompletionToggle = (id, completed) => {
    dispatch(updateTask({ id, completed: !completed }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  return (
    <div
      id="task-input"
      className="bg-zinc-700 w-full max-h-80 flex flex-col justify-start items-center py-2 md:py-8 mt-2 rounded overflow-y-auto"
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="w-full">
          {todos
            .slice()
            .reverse()
            .map((todo, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-2 md:px-6 py-2 border-b border-white/10 mx-2 md:mx-6"
              >
                <div>
                  <p className="font-semibold text-white/80">{todo.name}</p>
                  <p className="text-white/50 text-sm font-normal">
                    {todo.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-2 rounded text-white/90 text-sm ${
                      todo.completed ? "bg-gray-400" : "bg-green-600"
                    }`}
                    onClick={() =>
                      handleCompletionToggle(todo._id, todo.completed)
                    }
                  >
                    {todo.completed ? "Mark Inompleted" : "Mark Completed"}
                  </button>
                  <button
                    className="px-3 py-2 bg-rose-500 rounded text-white/90 text-sm"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default TodoLister;
