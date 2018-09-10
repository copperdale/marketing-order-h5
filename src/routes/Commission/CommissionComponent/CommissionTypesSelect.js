import React, { Component } from 'react';
import { Select } from 'antd';

export default class CommissionTypesSelect extends Component {
  
  render() {
    return (
      <Select size="small" value={this.props.value} onChange={this.props.onChange} {...this.props} style={{ width: '120px' }}>
        {
          this.props.needAll
          &&
          <Select.Option value="">全部</Select.Option>
        }
        <Select.Option value="1">消费提成</Select.Option>
        <Select.Option value="2">服务项目提成</Select.Option>
        <Select.Option value="3">储值提成</Select.Option>
      </Select>
    );
  }
};