import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Alert } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
import { getToken } from '../../utils/authority';

const { Shop, UserName, Password, Submit, Captcha } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
  verifyCode: login.verifyCode,
  verifyImage: login.verifyImage,
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

    // dispatch({
    //   type: 'login/login',
    //   payload: {
    //     ...values,
    //     type,
    //   },
    // });
    if (!err) {
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
    const { login, submitting } = this.props; // eslint-disable-line
    const { type, autoLogin } = this.state; // eslint-disable-line
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Shop name="storeId" placeholder="请输入商户门店编号" style={{ marginTop: '16px' }} />
          <UserName name="userName" placeholder="请输入用户名" style={{ marginTop: '16px' }} />
          <Password name="password" placeholder="请输入密码" style={{ marginTop: '16px' }} />
          <Captcha
            name="verifyCode"
            placeholder="请输入验证码"
            verifyCode={this.props.verifyCode}
            verifyImage={this.props.verifyImage}
            dispatch={this.props.dispatch}
          style={{ marginTop: '16px' }} />
          <Submit loading={submitting}>登录</Submit>
          <Link className={styles.register} to="/user/register">
            
          </Link>
        </Login>
      </div>
    );
  }
}
