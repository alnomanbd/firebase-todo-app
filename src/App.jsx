import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { db } from "./firebase.config";
import TodoList from "./components/TodoList";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  // Load the todo list from the database
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo })));
    });
    return () => unsubscribe();
  }, []);

  // Add Todo in Firebase
  const addTodo = async () => {
    if (input.trim() === "") return;  // Prevent empty tasks
    setLoading(true);  // Show the spinner
    try {
      await addDoc(collection(db, 'todos'), { todo: input });
      toast.success("Task added successfully!");
      setInput("");  // Reset input field
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to add task!");
    } finally {
      setLoading(false);  // Hide the spinner
    }
  };

  // Set the edit text into the input box
  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  // Update Todo in Firebase
  const updateTodo = async () => {
    if (input.trim() === "") return;  // Prevent empty tasks
    setLoading(true);  // Show the spinner
    try {
      const todoDocRef = doc(db, 'todos', todos[editIndex].id);
      await updateDoc(todoDocRef, { todo: input });
      toast.success("Task updated successfully!");
      setEditIndex(-1);
      setInput("");  // Reset input field
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update task!");
    } finally {
      setLoading(false);  // Hide the spinner
    }
  };

  // Delete Todo from Firebase
  const removeTodo = async (id) => {
    setLoading(true);  // Show the spinner
    try {
      await deleteDoc(doc(db, 'todos', id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete task!");
    } finally {
      setLoading(false);  // Hide the spinner
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center p-4 bg-custom-background bg-center bg-cover">
      {/* Input Task */}
      <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
        <h1 className="text-3xl font-bold text-center mb-4">Todo App</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a Task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="py-2 px-4 border rounded w-full focus:outline-none mr-2"
          />
          <button
            onClick={editIndex === -1 ? addTodo : updateTodo}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded"
          >
            {editIndex === -1 ? <FaPlus /> : <FaPencilAlt />}
          </button>
        </div>
      </div>

      {/* List Task */}
      {todos.length > 0 && (
        <TodoList todos={todos} setEdit={setEdit} removeTodo={removeTodo} />
      )}

      {/* Loading Spinner */}
      {loading && <Spinner />}
    </div>
  );
}
