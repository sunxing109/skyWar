import Taro from '@tarojs/taro'
import { axios } from 'taro-axios'
import { store } from '../app'
import {
  FETCH_TARGETS,
  FETCH_EXECUTORS,
  START_TASK,
  END_TASK,
  RECEIVE_WARNING,
  RESET_TASK
} from '../constants/task'

/**
 * 异步的action
 * 获取执行任务目标
 */
export function fetchTargets() {
  return dispatch => {
    axios('http://mock-api.com/vzMMrdzG.mock/tasks')
      .then(data => {
        dispatch({
          type: FETCH_TARGETS,
          payload: data.data
        })
      })
      .catch(err => console.log(err))
  }
}

/**
 * 异步的action
 * 获取执行任务的执行者
 */
export function fetchExecutors() {
  return dispatch => {
    axios('http://mock-api.com/vzMMrdzG.mock/executors')
      .then(data => {
        dispatch({
          type: FETCH_EXECUTORS,
          payload: data.data
        })
      })
      .catch(err => console.log('错误：' + err))
  }
}

/**
 * 开始任务
 * @param target 目标
 * @param startPostion 起飞位置
 * @param executor 那个飞机执行
 */
export function startTask(target, startPostion, executor) {
  let task = {}
  task['target'] = target
  task['startPostion'] = startPostion
  task['executor'] = executor
  task['taskStatus'] = 'started'
  return dispatch => {
    dispatch({
      type: START_TASK,
      payload: task
    })
  }
}
/**
 * 结束任务
 * @param target 目标
 * @param startPostion 起飞位置
 * @param executor 那个飞机执行
 */
export function endTask() {
  let task = {}
  task['taskStatus'] = 'ended'

  console.log('结束任务action11')
  return dispatch => {
    console.log('结束任务action12')
    dispatch({
      type: END_TASK,
      payload: task
    })
  }
}

/**
 * 重置任务
 */
export function resetTask() {
  return dispatch => {
    dispatch({
      type: RESET_TASK,
      payload: {}
    })
  }
}


// export function sendCommond(time: number, command: string, flyRoute: []) {
//   const mqttMessage = {
//     time: time,
//     player: {
//       mobileNumber: '13519122560',
//       position: {
//         longitude: 110.15535677691945,
//         latitude: 19.967603568269162
//       }
//     },
//     command: `[${command}]`,
//     params: {
//       route: flyRoute
//     }
//   }
//   return mqttMessage
// }
