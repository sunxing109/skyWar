import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtForm, AtInput } from 'taro-ui'

import { add, minus, asyncAdd } from '../../actions/task'

// import './index.scss'

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
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

// interface Login {
//   props: IProps
// }

interface Istate {
  value: string
}

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add())
    }
  })
)
class Login extends Component<IProps, Istate> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '登录'
  }

  constructor() {
    super(...arguments)
    this.state = {
      value: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange(value) {
    this.setState({
      value: value
    })
  }

  onSubmit(event) {
    console.log(event)
  }
  onReset() {
    this.setState({
      value: ''
    })
  }
  handleRedirect() {
    Taro.redirectTo({
      url: '../index/index'
    })
  }
  render() {
    const { value } = this.state
    return (
      <View className="index">
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name="value"
            title="文本"
            type="text"
            placeholder="单行文本"
            value={value}
            onChange={this.handleChange.bind(this)}
          />
          <AtButton formType="submit">提交</AtButton>
          <AtButton formType="reset">重置1</AtButton>
          <AtButton onClick={this.handleRedirect.bind(this)}>返回</AtButton>
        </AtForm>
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

export default Login as ComponentClass<PageOwnProps, PageState>
