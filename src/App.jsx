import { useState } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

export default function App() {
  const [todos, setTodos] = useState([{id: 1, todo: "Learn React"}]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1)

  // Add Todo
  const addTodo = async () => {
    try {
      if (input.trim() != "") {
        setTodos([...todos, { id: new Date(), todo: input }]);
        setInput("");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const setEdit = async (index) => {
    setInput(todos[index].todo)
    setEditIndex(index)
  }

  // Update the todo
  const updateTodo = async () => {
    try {
      if (input.trim() != '') {
        const updatedTodos = [...todos]
        updatedTodos[editIndex].todo = input
        setTodos(updatedTodos)
        setEditIndex(-1)
        setInput('')
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  // Delete todo from the todo list
  const removeTodo = async (id) => {
    let filteredTodos = todos.filter((todo) => todo.id !== id)
    setTodos(filteredTodos)
    setInput('')
  }

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
            {editIndex === -1 ? <FaPlus/> : <FaPencilAlt/>}
          </button>
        </div>
      </div>

      {/* List Task */}
      {todos.length > 0 && (
        <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
          <ul>
            {todos.map((todo, index) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-white p-3 rounded shadow-mg mb-3"
              >
                <span className="text-lg">{todo.todo}</span>
                <div>
                  <button onClick={() => setEdit(index)} className="mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded hover:from-gray-500 hover:to-gray-700">
                    <FaPencilAlt />
                  </button>
                  <button onClick={() => removeTodo(todo.id)} className="mr-2 p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:from-red-500 hover:to-red-700">
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
