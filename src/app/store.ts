import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {tasksReducer} from '../model/tasks-reducer'
import {todolistsReducer} from '../model/todolists-reducer'

// TODO объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

// TODO создание store
export const store = configureStore({
    reducer: rootReducer,
})

// TODO автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// TODO автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// TODO для возможности обращения к store в консоли браузера
// TODO @ts-ignore
// @ts-ignore
window.store = store