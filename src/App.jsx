import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { db } from "./firebase.config";
import TodoList from "./components/TodoList";

export default function App() {
  // const [todos, setTodos] = useState([{id: 1, todo: "Learn React"}]);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1)


  // Load the todo list from database
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({id: doc.id, todo: doc.data().todo})))
    })
    return () => unsubscribe()
  },[])


  // Add Todo Manual
  // const addTodo = async () => {
  //   try {
  //     if (input.trim() != "") {
  //       setTodos([...todos, { id: new Date(), todo: input }]);
  //       setInput("");
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // Add Todo in Firebase
  const addTodo = async () => {
      try {
        if (input.trim() != "") {
          await addDoc(collection(db, 'todos'), { todo: input })
          setInput("");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

  // To set the edit text into input box
  const setEdit = async (index) => {
    setInput(todos[index].todo)
    setEditIndex(index)
  }

  // Update the todo manual
  // const updateTodo = async () => {
  //   try {
  //     if (input.trim() != '') {
  //       const updatedTodos = [...todos]
  //       updatedTodos[editIndex].todo = input
  //       setTodos(updatedTodos)
  //       setEditIndex(-1)
  //       setInput('')
  //     }
  //   } catch (error) {
  //     console.error(error.message)
  //   }
  // }

  // Update todo into firebase
  const updateTodo = async () => {
    try {
      if (input.trim() != '') {
        const todoDocRef = doc(db, 'todos', todos[editIndex].id)
        await updateDoc(todoDocRef, {todo: input})
        setEditIndex(-1)
        setInput('')
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  // // Delete todo from the todo list manual
  // const removeTodo = async (id) => {
  //   let filteredTodos = todos.filter((todo) => todo.id !== id)
  //   setTodos(filteredTodos)
  //   setInput('')
  // }

  // Delete todo  from firebase
  const removeTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id))
    } catch (error) {
      console.error(error.message)
    }
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
        <TodoList todos={ todos } setEdit={setEdit} removeTodo={removeTodo} />
      )}
    </div>
  );
}
