import {
  FETCH_TARGETS,
  FETCH_EXECUTORS,
  START_TASK,
  END_TASK
} from '../constants/task'
import { axios } from 'taro-axios'
// import mqtt from 'mqtt/dist/mqtt.js'
// import mqtt from 'mqtt'
/**
 * 异步的action
 * 获取执行任务目标
 */
export function fetchTargets() {
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
  console.log('jieshu')

  return dispatch => {
    dispatch({
      type: END_TASK,
      payload: task
    })
  }
}

export function sendCommond(time: number, command: string, flyRoute: []) {
  const mqttMessage = {
    time: time,
    player: {
      mobileNumber: '13519122560',
      position: {
        longitude: 110.15535677691945,
        latitude: 19.967603568269162
      }
    },
    command: `[${command}]`,
    params: {
      route: flyRoute
    }
  }
  return mqttMessage
}

/**
 * 起飞
 */
export function tackOff() {
  // const client = mqtt.connect('ws://192.168.200.206:1888')
  // const MQTT_TOPIC_DRONE_COMMAND = 'sim/command/DRONE_ID'
  // client.publish(MQTT_TOPIC_DRONE_COMMAND, 'hello world!')
  // client.subscribe(MQTT_TOPIC_DRONE_COMMAND, function(err) {
  //   if (!client.connected) {
  //     client.reconnect()
  //   }
  // })
  // client.on('message', function(topic, payload) {
  //   console.log([topic, payload].join(': '))
  //   client.end()
  // })
}
