
export function TodoList({ todos, user, onAddTodo, onRemoveTodo, onUpdateTodo }) {



    return (
        <ul>
            <h1>{user.fullname} To-Do List</h1>
            <button onClick={onAddTodo}>Add New Todo</button>
            {todos.map(todo =>
                <li key={todo._id}>
                    {todo.done ? <strike>{todo.todo}</strike> : todo.todo}
                    <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                    <button onClick={() => onUpdateTodo(todo)}>Done</button>
                </li>
            )}
        </ul>
    )

}