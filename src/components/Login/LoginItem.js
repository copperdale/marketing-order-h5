import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import map from './map';

const FormItem = Form.Item;

function generator({ defaultProps, defaultRules, type }) {
  return WrappedComponent => {
    return class BasicComponent extends Component {
      static contextTypes = {
        form: PropTypes.object,
        updateActive: PropTypes.func,
      };

      static defaultProps = {
        buttonText: '获取验证码',
      };

      constructor(props) {
        super(props);
        this.state = {
          count: 0,
        };
      }

      componentDidMount() {
        const { updateActive } = this.context;
        const { name, verifyCode } = this.props;
        console.log(verifyCode);
        if (updateActive) {
          updateActive(name);
        }
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

      onGetCaptcha = (disptach) => {
        // debugger;
        disptach({
          type: 'login/getVerifyCode'
        });
      };

      render() {
        const { form } = this.context;
        const { getFieldDecorator } = form;
        const options = {};
        let otherProps = {};
        const { onChange, defaultValue, buttonText, rules, name, ...restProps } = this.props;
        const { count } = this.state;
        options.rules = rules || defaultRules;
        if (onChange) {
          options.onChange = onChange;
        }
        if (defaultValue) {
          options.initialValue = defaultValue;
        }
        otherProps = restProps || otherProps;
        if (type === 'Captcha') {
          const inputProps = omit(otherProps, ['onGetCaptcha']);
          return (
            <FormItem>
              <Row gutter={8}>
                <Col span={12}>
                  <div
                    className={styles.getCaptcha}
                    onClick={() => { this.onGetCaptcha(otherProps.dispatch) }}
                  >
                    <img alt="" src={`data:image/png;base64,${otherProps.verifyImage}`} style={{ height: '40px', width: '100%' }} />
                  </div>
                </Col>
                <Col span={12}>
                  {getFieldDecorator(name, options)(
                    <WrappedComponent {...defaultProps} {...inputProps} />
                  )}
                </Col>
              </Row>
            </FormItem>
          );
        }
        return (
          <FormItem>
            {getFieldDecorator(name, options)(
              <WrappedComponent {...defaultProps} {...otherProps} />
            )}
          </FormItem>
        );
      }
    };
  };
}

const LoginItem = {};
Object.keys(map).forEach(item => {
  LoginItem[item] = generator({
    defaultProps: map[item].props,
    defaultRules: map[item].rules,
    type: item,
  })(map[item].component);
});

export default LoginItem;
