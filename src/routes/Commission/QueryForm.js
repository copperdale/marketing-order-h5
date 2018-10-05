import React from 'react';
import { Form, Select, Button } from 'antd';
import { connect } from 'dva';
import CommissionTypesSelect from './CommissionComponent/CommissionTypesSelect'

const FormItem = Form.Item;

class BasicForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err) => {
      if (!err) {
        this.props.dispatch({
          type: 'commission/queryPlan',
        });
      }

      // Should format date value before submit.

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <FormItem
          {...formItemLayout}
          label="类型"
        >
          {getFieldDecorator('planType', {
            // rules: [{ required: true, message: 'Please input your note!' }],
            initialValue: '',
          })(
            <CommissionTypesSelect needAll style={{ width: '120px' }} />
            )}
        </FormItem>
        {/* <FormItem
          {...formItemLayout}
          label="状态"
        >
          {getFieldDecorator('name', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="small" style={{ width: '120px' }} />
            )}
        </FormItem> */}
        <FormItem
          {...formItemLayout}
          label="状态"
        >
          {getFieldDecorator('enableFlag', {
            initialValue: '',
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Select size="small" style={{ width: '120px' }}>
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="1">启用</Select.Option>
              <Select.Option value="2">禁用</Select.Option>
            </Select>
            )}
        </FormItem>
        <FormItem>
          <Button size="small" type="primary" htmlType="submit">查询</Button>
        </FormItem>
      </Form>
    );
  }
}

const QueryForm = Form.create({
  onFieldsChange(props, changedFields) {
    const queryFormData = props.queryFormData;
    Object.keys(changedFields).forEach((key) => {
      queryFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'commission/updateState',
      payload: {
        queryFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'planType enableFlag'.split(' ');
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.queryFormData[key],
        value: props.queryFormData[key].value,
      })
    })
    return result;
  },
})(BasicForm);

export default connect((state) => {
  return {
    queryFormData: state.commission.queryFormData,  
  }
})(QueryForm);
