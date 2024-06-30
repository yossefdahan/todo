export function TodoList({ todos, user }) {



    return (
        <ul>
            <h1>{user.fullname} To-Do List</h1>
            <button onClick={() => { addTodo() }}>Add New Todo</button>
            {todos.map(todo =>
                <li key={todo._id}>{todo.todo}</li>
            )}
        </ul>
    )

}