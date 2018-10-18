import React, { Component, Fragment } from 'react';
import { Row, Col, Input, Button, Icon } from 'antd';
import { cloneDeep } from 'lodash/lang';

export default class CommissionTypesSelect extends Component {
  constructor(props) {
    super(props);

    let value = props.value || [];
    const planMode = props.planMode || '1';
    const planType = props.planType || '1';
    value = value.map((item) => {
      return {
        ruleType: item.ruleType,
        ruleValue: item.ruleValue,
        ruleCommission: item.ruleCommission,
      };
    })
    this.state = {
      ruleList: value,
      // ruleList: [{
      //   ruleValue: '1000',
      //   ruleCommission: '5',
      //   ruleCommissionType: '%',
      // }],
      planType,
      planMode,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    // Should be a controlled component.
    if ('value' in nextProps) {
      let value = nextProps.value || [];
      value = value.map((item) => {
        return {
          ...item,
          ruleType: item.ruleType,
          ruleValue: item.ruleValue,
          ruleCommission: item.ruleCommission,
        };
      })
      this.setState({ ruleList: value });
    }
    if ('planType' in nextProps && this.state.planType !== nextProps.planType) {
      const planType = nextProps.planType || '1';
      this.setState({ planType, ruleList: [] });
    }

    if ('planMode' in nextProps && this.state.planMode !== nextProps.planMode) {
      const planMode = nextProps.planMode || '1';
      this.setState({ planMode, ruleList: [] });
    }

  }

  addRules = () => {
    const rules = this.state.ruleList;
    rules.push({
      ruleValue: '',
      ruleCommission: '',
      ruleCommissionType: this.getValueCommissionSymbol(),
    });
    this.setState({
      ruleList: cloneDeep(rules),
    })
    this.triggerChange(rules);
  }

  handleChange  = (key, value, index) => {
    const rules = this.state.ruleList;
    rules.forEach((item, cIndex) => {
      if (index === cIndex) {
        item[key] = value;
      }
    });
    this.setState({
      ruleList: cloneDeep(rules),
    });
    this.triggerChange(rules);
  }

  deleteRule = (index) => {
    let rules = this.state.ruleList;
    rules = rules.filter((item, cIndex) => index !== cIndex);
    this.setState({
      ruleList: cloneDeep(rules),
    });
    this.triggerChange(rules);
  }

  triggerChange = (value = []) => {
    const result = value;
    // result.forEach((item) => {
    //   item.ruleCommission = `${item.ruleCommission}`;
    // });
    this.props.onChange(cloneDeep(result));
  }

  getValueCommissionSymbol = () => {
    if (this.props.planType === '2' ) {
      return '￥';
    } else if (this.props.planMode === '1') {
      return "￥";
    } else {
      return '%';
    }
  }

  getTitle = () => {
    if (this.state.planType === '2' ) {
      return (
        <Row key="title">
          <Col key="key1" span={12}>
            提成商品
          </Col>
          <Col key="key2" span={12}>
            提成金额（每件）
          </Col>
        </Row>
      );
    } else if (this.state.planMode === '1') {
      return (
        <Row key="title">
          <Col key="key1" span={12}>
            订单实收金额
          </Col>
          <Col key="key2" span={12}>
            提成金额（每单）
          </Col>
        </Row>
      );
    } else {
      return (
        <Row key="title">
          <Col key="key1" span={12}>
            订单实收金额
          </Col>
          <Col key="key2" span={12}>
            提成比例（每单）
          </Col>
        </Row>
      );
    }
  }
  
  render() {
    return (
      <Fragment>
        {this.getTitle()}
        {
          this.state.ruleList.map((item, index) => {
            return (
              <Row>
                <Col span={12}>
                  <Input
                    key={`ruleValue${index * 2}`}
                    value={item.ruleValue}
                    onChange={(e) => {
                      this.handleChange('ruleValue', e.target.value, index);
                    }}
                    addonBefore={`>=￥`}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    value={item.ruleCommission}
                    key={`ruleCommission${index * 2}`}
                    onChange={(e) => {
                      this.handleChange('ruleCommission', e.target.value, index);
                    }}
                    addonBefore={`${this.getValueCommissionSymbol()}`}
                    addonAfter={<Icon style={{ cursor: 'pointer' }} type="delete" onClick={() => { this.deleteRule(index); }} />}
                  />
                </Col>
              </Row>
            );
          })
        }
        <Row key="action">
          <Col key="action" span={12}>
            <Button onClick={this.addRules}>Add</Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
};