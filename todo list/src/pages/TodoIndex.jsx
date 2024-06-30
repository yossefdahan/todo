import { useEffect } from "react"
import { showErrorMsg } from "../services/event-bus.service"
import { useSelector } from "react-redux"

import { loadTodos } from "../store/actions/todo.actions"
import { TodoList } from "../cmps/TodoList"
export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const user = useSelector(storeState => storeState.userModule.user)
    useEffect(() => {
        loadTodos()
            .catch(err => {
                showErrorMsg('Cannot load todos!')
            })
    }, [])



    console.log(todos, user);
    return (
        <section className="todo-list">

            {todos.length ?
                <TodoList todos={todos} user={user} />
                : <div>loading</div>
            }
        </section>)
}