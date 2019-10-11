import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtForm, AtRadio,AtFab } from 'taro-ui'
import { Target, Executor, StartPosition, Task } from '../../models/task'
import {
  fetchTargets,
  fetchExecutors,
  startTask,
  resetTask
} from '../../actions/task'
import './task.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  targets: Target[]
  executors: Executor[]
  startPostion: StartPosition[]
  task: Task
}

type PageDispatchProps = {
  fetchTargets: () => void
  fetchExecutors: () => void
  startTask: (
    target: Target,
    startPostion: StartPosition,
    executor: Executor
  ) => void
  resetTask: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface task {
  props: IProps
}
interface Istate {
  targetId: ''
  startPositionId: ''
  executorId: ''
}

@connect(
  ({ task }) => ({
    targets: task.targets,
    executors: task.executors,
    startPostion: task.startPostion,
    task: task.task
  }),
  dispatch => ({
    resetTask() {
      dispatch(resetTask())
    },
    fetchTargets() {
      dispatch(fetchTargets())
    },
    fetchExecutors() {
      dispatch(fetchExecutors())
    },
    startTask(target, startPostion, executor) {
      dispatch(startTask(target, startPostion, executor))
    }
  })
)
class task extends Component<IProps, Istate> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '创建任务'
  }
  constructor() {
    super(...arguments)
    this.state = {
      targetId: '',
      startPositionId: '',
      executorId: ''
    }
  }

  componentDidMount() {
    this.props.resetTask()
    // 初始化数据
    this.props.fetchTargets()
    this.props.fetchExecutors()
  }
  componentWillUpdate(nextProps) {
    if (nextProps.task.taskStatus === 'started') {
      Taro.redirectTo({
        url: '../task/task'
      })
    }
  }

  onSubmit() {
    let targetMap = {}
    this.props.targets.map(target => {
      targetMap[target.taskTargetId] = target
    })
    let positionMap = {}
    this.props.startPostion.map(position => {
      positionMap[position.startPositionId] = position
    })
    let executorMap = {}
    this.props.executors.map(executor => {
      executorMap[executor.executorId] = executor
    })
    // 开始任务
    this.props.startTask(
      targetMap[this.state.targetId],
      positionMap[this.state.startPositionId],
      executorMap[this.state.executorId]
    )
  }
  handleChangeTask(value) {
    this.setState({ targetId: value })
  }
  handleChangePosition(value) {
    this.setState({ startPositionId: value })
  }
  handleChangeExecutor(value) {
    this.setState({ executorId: value })
  }

  handleRedirect() {
    Taro.redirectTo({
      url: '../index/index'
    })
  }

  render() {
    let targetTaskData: any[] = []
    this.props.targets.map(task =>
      targetTaskData.push({
        label: task.taskTargetName,
        value: task.taskTargetId
      })
    )
    let startPostionData: any[] = []
    this.props.startPostion.map(position =>
      startPostionData.push({
        label: position.startPositionName,
        value: position.startPositionId
      })
    )
    let executorsData: any[] = []
    this.props.executors.map(executor =>
      executorsData.push({
        label: executor.executorName,
        value: executor.executorId,
        desc: executor.description
      })
    )

    return (
      <View className="index">
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          选择目标
          <AtRadio
            options={targetTaskData}
            value={this.state.targetId}
            onClick={this.handleChangeTask.bind(this)}
          />
          选择起飞地点
          <AtRadio
            options={startPostionData}
            value={this.state.startPositionId}
            onClick={this.handleChangePosition.bind(this)}
          />
          选择执行者
          <AtRadio
            options={executorsData}
            value={this.state.executorId}
            onClick={this.handleChangeExecutor.bind(this)}
          />
          <AtButton formType="submit">确定</AtButton>
          
        </AtForm>
        <AtFab className="atbu-fab" onClick={()=>Taro.redirectTo({url:"../auth/login"})}>首页</AtFab>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
// export default Index
export default task as ComponentClass<PageOwnProps, PageState>
