/**
 * 任务模型
 * 任务状态：started ended
 */
export interface Task {
  taskId: string
  target: Target
  startPostion: StartPosition
  executor: Executor
  result: string
  taskStatus: string
  warningMessage: string
  warningModal: boolean
}

/**
 * 任务模型,防护半径单位:KM
 */
export interface Target {
  taskTargetId: string
  taskTargetName: string
  longitude: number
  latitude: number
  altitude: number
  oneLevelDefenseRadius: number
  twoLevelDefenseRadius: number
  threeLevelDefenseRadius: number
}

/**
 * 起飞位置模型
 */
export interface StartPosition {
  startPositionId: string
  startPositionName: string
  longitude: number
  latitude: number
  altitude: number
}

/**
 * 执行者模型
 */
export interface Executor {
  executorId: string
  executorName: string
  description: string
  picture: string
}
