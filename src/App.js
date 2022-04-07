import React, {useEffect, useState} from "react";
import Todolist from "./Todo/Todolist";
import Context from "./context";
import Loader from "./Loader"
import Modal from "./Modal/Modal";

const AddTodo = React.lazy(
    () =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(import("./Todo/AddTodo"))
        })
    })
)

function App() {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
            .then(response => response.json())
            .then(todos => {
                setTodos(todos)
                setLoading(false)
            })
    }, [])

    function toggleTodo(id) {
      setTodos(
          todos.map( todo => {
              if (todo.id === id) {
                  todo.completed = !todo.completed
              }
              return todo
      }))
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function addTodo(title) {
        setTodos(todos.concat([{
            title,
            id: Date.now(),
            completed: false
        }]))
    }

    return (
      // wrapper мы сами написали в index.css
      <Context.Provider value={{ removeTodo }}>
          <div className="wrapper">
            <h1>React tutorial</h1>
              <React.Suspense fallback={<p>Loading</p>}>
                  <Modal/>
                  <AddTodo onCreate={addTodo}/>
              </React.Suspense>
              {loading && <Loader/>}
            {todos.length ? (
                <Todolist todos={todos} onToggle={toggleTodo}/>
            ) : (
                loading ? null : <p>No todos</p>
            )}
          </div>
      </Context.Provider>
  );
}

export default App;
