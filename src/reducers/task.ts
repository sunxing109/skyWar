import { FETCH_TARGETS, FETCH_EXECUTORS, START_TASK, END_TASK } from '../constants/task'
import { Task, Target, StartPosition, Executor } from 'src/models/task'
const INITIAL_STATE = {
  targets: [] as Target[],
  executors: [] as Executor[],
  startPostion: [
    {
      startPositionId: '1',
      startPositionName: '一号地点',
      longitude: 110.15535677691945,
      latitude: 19.967603568269162,
      altitude: 9.3487548828125
    }
  ] as StartPosition[],
  task: {} as Task
}

// export type TaskState = typeof INITIAL_STATE
// export type BloodPressureState = Readonly<typeof initialState>;
// export default function counter (state = INITIAL_STATE, action) {
export default function task(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TARGETS:
      return {
        ...state,
        targets: action.payload
      }
    case FETCH_EXECUTORS:
      return {
        ...state,
        executors: action.payload
      }
    case START_TASK:
      return {
        ...state,
        task: action.payload
      }
    case END_TASK:
      return {
        ...state,
        task: action.payload
      }
    default:
      return state
  }
}
