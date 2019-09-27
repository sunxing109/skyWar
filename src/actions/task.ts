import { FETCH_TARGETS, FETCH_EXECTORS } from '../constants/task'
import { axios } from 'taro-axios'

/**
 * 异步的action
 * 获取执行任务目标
 */
export function fetchTargets() {
  console.log('fetchTargets_action')
  // Taro.showLoading({
  //   title: '加载中',
  //   mask: true
  // })
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
export function fetchExectors() {
  console.log('fetchExectors_action')
  return dispatch => {
    axios('http://mock-api.com/vzMMrdzG.mock/exectors')
      .then(data => {
        dispatch({
          type: FETCH_EXECTORS,
          payload: data.data
        })
      })
      .catch(err => console.log('错误：' + err))
  }
}

// // 异步的action
// export function asyncAdd() {

//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
