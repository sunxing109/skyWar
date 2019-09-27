/**
 * 任务模型,防护半径单位:KM
 */
export interface TaskTarget {
  taskTargetId: string
  taskTargetName: string
  longitude: string
  latitude: string
  oneLevelDefenseRadius: number
  twoLevelDefenseRadius: number
  threeLevelDefenseRadius: number
}

/**
 * 起飞位置模型
 */
export interface StartPosition {
  startPositionName: string
  longitude: string
  latitude: string
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
