import { todoService } from '../../services/todo.service.local.js'
import { userService } from '../../services/user.service.js'
import { store } from '../../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UNDO_REMOVE_TODO, UPDATE_TODO } from '../reducers/todo.reducer.js'


// Action Creators:
export function getActionRemoveTodo(todoId) {
    return {
        type: REMOVE_TODO,
        todoId
    }
}
export function getActionAddTodo(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}
export function getActionUpdateTodo(todo) {
    return {
        type: UPDATE_TODO,
        todo
    }
}

export async function loadTodos() {
    try {
        const todos = await todoService.query()
        console.log('Todos from DB:', todos)
        store.dispatch({
            type: SET_TODOS,
            todos
        })

    } catch (err) {
        console.log('Cannot load todos', err)
        throw err
    }

}

export async function removeTodo(todoId) {
    try {
        await todoService.remove(todoId)
        store.dispatch(getActionRemoveTodo(todoId))
        return todoId
    } catch (err) {
        console.log('Cannot remove todo', err)
        throw err
    }
}

export async function addTodo(todo) {
    try {
        const savedTodo = await todoService.save(todo)
        console.log('Added todo', savedTodo)
        store.dispatch(getActionAddTodo(savedTodo))
        return savedTodo
    } catch (err) {
        console.log('Cannot add todo', err)
        throw err
    }
}

export async function updateTodo(todo) {
    try {
        const savedTodo = await todoService.save(todo)
        console.log('Updated todo:', savedTodo)
        store.dispatch(getActionUpdateTodo(savedTodo))
        return savedTodo
    } catch (err) {
        console.log('Cannot save todo', err)
        throw err
    }
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveTodoOptimistic(TodoId) {
    store.dispatch({
        type: REMOVE_TODO,
        TodoId
    })
    showSuccessMsg('todo removed')

    todoService.remove(TodoId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove todo')
            console.log('Cannot load todos', err)
            store.dispatch({
                type: UNDO_REMOVE_TODO,
            })
        })
}
