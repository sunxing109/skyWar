import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtCard } from 'taro-ui'
import { Task } from '../../models/task'
import { endTask } from '../../actions/task'
import { webSocketConnect } from '../../utils'
import './task.scss'

type PageStateProps = {
  task: Task
  isOpenedModal: boolean
}

type PageDispatchProps = {
  endTask: () => void
  tackOff: () => void
  receiveMessage: (message: string) => void
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
  constructor(props) {
    super(props)

    this.handleTackOff = this.handleTackOff.bind(this)
    this.handleGoHome = this.handleGoHome.bind(this)
    this.handleFire = this.handleFire.bind(this)
    webSocketConnect()
  }
  componentDidMount() {}

  componentWillUpdate(nextProps) {
    if (nextProps.task.taskStatus === 'ended') {
      console.log('nextProps')
      console.log(nextProps)

      Taro.redirectTo({
        url: '../index/index'
      })
    }
  }
  componentwillUnmount() {}
  /**
   * 退出游戏
   */
  // handleEndedTask() {
  //   Taro.sendSocketMessage({
  //     data: 'goHome'
  //   })
  //   Taro.redirectTo({ url: './taskResult' })
  // }

  /**
   * 起飞
   */
  handleTackOff() {
    Taro.sendSocketMessage({
      data: 'tackOff'
    })
  }

  /**
   * 返航
   */
  handleGoHome() {
    Taro.sendSocketMessage({
      data: 'goHome'
    })
  }

  /**
   * 开火
   */
  handleFire() {
    Taro.sendSocketMessage({
      data: 'fire'
    })
  }

  render() {
    const { task } = this.props
    Taro.onSocketMessage(function(res) {
      const data = res.data
      let message: Object = JSON.parse(data)

      if (message['score']) {
        Taro.redirectTo({ url: './taskResult?score=' + message['score'] })
      }
      if (message['warningMessage']) {
        Taro.showModal({
          title: '警告',
          content: message['warningMessage'] + '是否返航'
        }).then(res => {
          if (res.confirm) {
            Taro.sendSocketMessage({
              data: 'goHome'
            })
          }
        })
      }
    })
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
          <AtButton onClick={this.handleTackOff}>起飞</AtButton>
          <AtButton onClick={this.handleGoHome}>返航</AtButton>
          <AtButton onClick={this.handleFire}>开火</AtButton>
          {/* <AtButton onClick={this.handleEndedTask}>退出游戏</AtButton> */}
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
