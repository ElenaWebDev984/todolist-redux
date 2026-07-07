import type {Task, TasksState} from '../app/App.tsx'
import {createTodolistAC,  deleteTodolistAC} from './todolists-reducer'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTask')
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')


const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTaskAC, (state, action) => {
        const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
        if (index !== -1) state[action.payload.todolistId].splice(index, 1)
      })
      .addCase(createTaskAC, (state, action) => {
        state[action.payload.todolistId].unshift({title: action.payload.title, isDone: false, id: nanoid()})
      })
      .addCase(changeTaskStatusAC, (state, action) => {
          const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
          if (task) task.isDone = action.payload.isDone
      })
      .addCase()
})

export const tasksReducer2 = (state: TasksState = initialState, action: Actions): TasksState => {
  switch (action.type) {
    case "change_task_status": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)
      }
    }
    case "change_task_title": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
      }
    }
  }
}


export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions =
    | DeleteTaskAction
    | CreateTaskAction
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction
