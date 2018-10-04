import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Alert } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
import { getToken } from '../../utils/authority';

const { Shop, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    if (getToken('token')) {
      props.dispatch(routerRedux.push('/home'));
    }
  }

  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    const { dispatch } = this.props;
    if (true) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Shop name="shop" placeholder="请输入商户名称" />
          <UserName name="userName" placeholder="请输入用户名" />
          <Password name="password" placeholder="请输入密码" />
          <Submit loading={submitting}>登录</Submit>
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </Login>
      </div>
    );
  }
}
