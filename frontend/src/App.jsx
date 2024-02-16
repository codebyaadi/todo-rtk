import "./App.css";
import AddTask from "./components/add-task";
import TodoLister from "./components/todo-lister";

function App() {
  return (
    <main className="bg-zinc-800 w-full h-screen font-prompt">
      <header className="font-bold text-3xl text-white uppercase w-full text-center py-12">
        My Todos
      </header>
      <div className="max-w-2xl mx-auto">
        <AddTask />
        <TodoLister />
      </div>
    </main>
  );
}

export default App;
