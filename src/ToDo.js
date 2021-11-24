import React from 'react'

export default function ToDo({todo, toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    return (
        <div className="task-list">
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}></input>
            <p>{todo.name}</p>
        </div>
    )
}
