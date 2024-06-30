export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const UNDO_REMOVE_TODO = 'UNDO_REMOVE_TODO'


const initialState = {
    todos: [],
    lastRemovedTodo: null
}

export function todoReducer(state = initialState, action) {
    var newState = state
    var todos

    switch (action.type) {
        case SET_TODOS:
            newState = { ...state, todos: action.todos }
            break
        case REMOVE_TODO:
            const lastRemovedTodo = state.todos.find(todo => todo._id === action.todoId)
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            newState = { ...state, todos, lastRemovedTodo }
            break
        case ADD_TODO:
            newState = { ...state, todos: [...state.todos, action.todo] }
            break
        case UPDATE_TODO:
            todos = state.todos.map(todo => (todo._id === action.todo._id) ? action.todo : todo)
            newState = { ...state, todos }
            break

        case UNDO_REMOVE_TODO:
            if (state.lastRemovedTodo) {
                newState = { ...state, todos: [...state.todos, state.lastRemovedTodo], lastRemovedTodo: null }
            }
            break
        default:
    }
    return newState
}
