import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtCard } from 'taro-ui'
import { Task } from '../../models/task'
import { endTask, resetTask } from '../../actions/task'
import { closeConnect } from '../../utils'
import './task.scss'
let messageResult = ''

type PageStateProps = {
  task: Task
}

type PageDispatchProps = {
  endTask: () => void
  resetTask: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface taskResult {
  props: IProps
}
interface Istate {
  score: string
}

@connect(
  ({ task }) => ({
    task: task.task
  }),
  dispatch => ({
    endTask() {
      dispatch(endTask())
    },
    resetTask() {
      dispatch(resetTask())
    }
  })
)
class taskResult extends Component<IProps, Istate> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '任务结果'
  }
  constructor(props) {
    super(props)
    this.handleGoHome = this.handleGoHome.bind(this)
    this.handleOnceAgain = this.handleOnceAgain.bind(this)
  }
  componentDidMount() {
    closeConnect()
    const result = this.$router.params
    console.log('result:' + result.score)
    this.setState({
      score: result.score
    })
  }

  componentWillUpdate(nextProps) {
    if (nextProps.task.taskStatus === 'ended') {
      console.log('nextProps')
      console.log(nextProps)
    }
  }

  componentwillUnmount() {}

  /**
   * 返回首页
   */
  handleGoHome() {
    Taro.redirectTo({
      url: '../index/index'
    })
  }

  /**
   * 在玩一次
   */
  handleOnceAgain() {
    Taro.redirectTo({
      url: './createtask'
    })
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
              title="任务结束"
              thumb="http://images.huanqiu.com/sarons/2014/03/7d64f08e045ed5a6b1abdda9815063cf.jpg"
            >
              您派出{task.executor.executorName} 执行紧急任务，任务成功。
            </AtCard>
            本次得分{this.state.score}
          </View>
        </View>
        <View className="at-row">
          <AtButton onClick={this.handleOnceAgain}>在玩一次</AtButton>
          <AtButton onClick={this.handleGoHome}>首页</AtButton>
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
export default taskResult as ComponentClass<PageOwnProps, PageState>
