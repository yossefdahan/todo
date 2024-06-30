import { useEffect } from "react"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addTodo, loadTodos, removeTodo, updateTodo } from "../store/actions/todo.actions"
import { TodoList } from "../cmps/TodoList"
import { todoService } from "../services/todo.service.local"

export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        loadTodos()
            .catch(err => {
                showErrorMsg('Cannot load todos!')
            })
    }, [])

    function onAddTodo() {
        const newTodo = todoService.getEmptyTodo()
        newTodo.todo = prompt('Enter todo:')
        addTodo(newTodo)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add todo')
            })
    }

    async function onRemoveTodo(todoId) {
        try {
            await removeTodo(todoId)
            showSuccessMsg('Todo removed')
        } catch (error) {
            showErrorMsg('Cannot remove todo')
        }
    }

    function onUpdateTodo(todo) {
        const updatedTodo = { ...todo, done: !todo.done }
        updateTodo(updatedTodo)
            .then(() => {
                showSuccessMsg('Todo updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update todo')
            })
    }

    return (
        <section className="todo-list">
            <TodoFilter />
            {todos.length ?
                <TodoList todos={todos} user={user} onAddTodo={onAddTodo} onRemoveTodo={onRemoveTodo} onUpdateTodo={onUpdateTodo} />
                : <div>Loading...</div>
            }
        </section>
    )
}
