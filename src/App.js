import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList'
import Header from './Header';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      var randid = Math.floor(Math.random() * 10000000000 );
      return[...prevTodos, {id:randid , name:name, complete:false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <Header />
      <div className="input-task-list">
        <input ref={todoNameRef} type="text" /><br></br>
        <button onClick={handleAddTodo}>Add ToDO</button>
        <button onClick={handleClearTodo}>Clear Todo</button>
        <div>{todos.filter(todo => !todo.complete).length} left todo</div>
      </div>
      <ToDoList todos={todos} toggleTodo={toggleTodo}/>
    </>
  )
}

export default App;
