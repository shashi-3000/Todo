import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts/TodoContext.js'
import './App.css'
import TodoForm from './components/TodoForm.jsx'
import TodoItem from './components/TodoItem.jsx'

function App() {
  const [todos, setTodos] = useState([]) //by default empty array

  //ADD
  const addTodo=(todo)=>{
    // actually yaha hame 2 kaam krne h....first we need to made a new todo and second in order to add that todo we need to get access of all previous or old todops which already exist ....kiuki seedha setTodos se value erase ho jayegi puri
    // setTodos((prev)=>[{todo}, ...prev]()) //spread function and hum new todo starting of the array me add krre
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  //UPDATE
  const updateTodo = (id,todo) =>{
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
    //  prev.map((eachVal)=>{
    //      if(eachVal.id==id){
    //        todo
    //      }
    //      else prevTodo
    //  })
  }

  //DELETE
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))//jo jo match nhi krega vo aata jayega 
  }

  //TOGGLE
   const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }


  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])//state wala todos
  

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
