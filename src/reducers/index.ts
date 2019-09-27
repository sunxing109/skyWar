import { combineReducers } from 'redux'
import task, { TaskState } from './task'

export interface IRootState {
  task: TaskState
}

export default combineReducers<IRootState>({
  task
})
