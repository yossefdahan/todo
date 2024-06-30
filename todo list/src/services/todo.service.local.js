
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todo'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    // addTodoMsg
}
// window.cs = todoService


async function query() {
    var todos = await storageService.query(STORAGE_KEY)

    return todos
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

async function remove(todoId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, todoId)
}

async function save(todo) {
    var savedTodo
    if (todo._id) {
        savedTodo = await storageService.put(STORAGE_KEY, todo)
    } else {
        // Later, owner is set by the backend
        todo.owner = userService.getLoggedinUser()
        savedTodo = await storageService.post(STORAGE_KEY, todo)
    }
    return savedTodo
}

function getEmptyTodo() {
    return {
        todo: '',
        isDone: false,
    }
}
// async function addTodoMsg(todoId, txt) {
//     // Later, this is all done by the backend
//     const todo = await getById(todoId)
//     if (!todo.msgs) todo.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     todo.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, todo)

//     return msg
// }




// TEST DATA
// storageService.post(STORAGE_KEY, { todo: 'buy milk' }).then(x => console.log(x))




