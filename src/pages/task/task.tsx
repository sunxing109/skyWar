import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtCard } from 'taro-ui'
import { Task } from '../../models/task'
import { endTask, tackOff } from '../../actions/task'
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
  task: Task
}

type PageDispatchProps = {
  endTask: () => void
  tackOff: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface task {
  props: IProps
}
interface Istate {}

@connect(
  ({ task }) => ({
    task: task.task
  }),
  dispatch => ({
    endTask() {
      dispatch(endTask())
    },
    tackOff() {
      dispatch(tackOff())
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
    navigationBarTitleText: '执行任务中'
  }

  componentDidMount() {}
  componentWillUpdate(nextProps) {
    if (nextProps.task.taskStatus === 'ended') {
      console.log('nextProps')
      console.log(nextProps)

      Taro.redirectTo({
        url: '../auth/login'
      })
    }
  }
  /**
   * 退出游戏
   */
  handleEndedTask() {
    this.props.endTask()
  }
  /**
   * 起飞
   */
  handleTackOff() {
    this.props.tackOff()
  }
  /**
   * 返航
   */
  handleGoHome() {
    this.props.endTask()
  }
  /**
   * 开火
   */
  handleFire() {
    this.props.endTask()
  }

  render() {
    const { task } = this.props
    return (
      <view>
        <View className="at-row">
          <View className="at-col at-col-16">
            <AtCard
              note=""
              extra=""
              title="正在执行任务"
              thumb="http://images.huanqiu.com/sarons/2014/03/7d64f08e045ed5a6b1abdda9815063cf.jpg"
            >
              您派出{task.executor.executorName} 执行紧急任务，进行
              {task.target.taskTargetName} ，从
              {task.startPostion.startPositionName} 出发
            </AtCard>
          </View>
        </View>
        <View className="at-row">
          <AtButton onClick={this.handleTackOff.bind(this)}>起飞</AtButton>
          <AtButton onClick={this.handleGoHome.bind(this)}>返航</AtButton>
          <AtButton onClick={this.handleFire.bind(this)}>开火</AtButton>
          <AtButton onClick={this.handleEndedTask.bind(this)}>
            退出游戏
          </AtButton>
        </View>
      </view>
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
