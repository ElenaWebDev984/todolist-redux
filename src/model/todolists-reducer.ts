import type {FilterValues, Todolist} from '../app/App.tsx'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";


export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')
export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{id: string, filter: FilterValues}>('todolists/changeTodolistFilter')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: { title, id: nanoid() }}
})

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(deleteTodolistAC,(state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index!== -1) state.splice(index, 1)
      })
      .addCase(changeTodolistTitleAC, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state[index].title = action.payload.title
      })
      .addCase(changeTodolistFilterAC, (state, action) => {
          const todolist = state.find(todo => todo.id === action.payload.id)
          if (todolist) todolist.filter = action.payload.filter
      })
      .addCase()
})


export const todolistsReducer2 = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
    case 'create_todolist': {
      const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
      return [...state, newTodolist]
    }
    case 'change_todolist_filter': {
      return state.map(todolist => todolist.id === action.payload.id ? {...todolist, filter: action.payload.filter} : todolist)
    }
    default:
      return state
  }
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type Actions =
    | DeleteTodolistAction
    | CreateTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction
