import { FETCH_TARGETS, FETCH_EXECTORS } from '../constants/task'
import { TaskTarget, StartPosition, Executor } from 'src/models/task'

const INITIAL_STATE = {
  tasks: [
    {
      executorId: '1',
      executorName: '天乾一号UAV',
      description:
        '歼-20（1）远程空对空导弹：霹雳-21，中程空对空导弹：霹雳-12D，近程空对空导弹：霹雳-10，近程空对空格斗导弹：霹雳-8；（2）精确制导滑翔炸弹：雷石-6； （3）机炮：一门23毫米双管航空机炮。',
      picture:
        'http://images.huanqiu.com/sarons/2014/03/7d64f08e045ed5a6b1abdda9815063cf.jpg'
    }
  ],
  exectors: [],
  startPostion: []
}

export type TaskState = typeof INITIAL_STATE
// export type BloodPressureState = Readonly<typeof initialState>;

export default (state: TaskState = INITIAL_STATE, action): TaskState => {
  switch (action.type) {
    case FETCH_TARGETS:
      console.log('===========111111111111111==========')
      console.log(action.payload)
      console.log('===========111111111111111==========')

      console.log('FETCH_TARGETS_reducer')
      return {
        ...state,
        tasks: action.payload
      }
    case FETCH_EXECTORS:
      console.log('FETCH_EXECTORS_reducer')
      return {
        ...state,
        exectors: action.payload
      }
    default:
      return state
  }
}
