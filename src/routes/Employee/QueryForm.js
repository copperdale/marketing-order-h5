import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;

class BasicForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err) => {
      if (!err) {
        this.props.dispatch({
          type: 'employee/queryEmployee',
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
      <Form onSubmit={this.handleSubmit} layout="inline" style={{ marginBottom: '8px' }}>
        <FormItem
          {...formItemLayout}
          label="员工类型"
        >
          {getFieldDecorator('jobEmployeeType', {
            // rules: [{ required: true, message: 'Please input your note!' }],
            initialValue: '1',
          })(
            <Select style={{ width: '120px' }}>
              <Option value="1">试用期</Option>
              <Option value="2">正式</Option>
              <Option value="3">外聘</Option>
            </Select>
            )}
        </FormItem>
        {/* <FormItem
          {...formItemLayout}
          label="状态"
        >
          {getFieldDecorator('name', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input style={{ width: '120px' }} />
            )}
        </FormItem> */}
        <FormItem
          {...formItemLayout}
          label="员工名称"
        >
          {getFieldDecorator('name', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input style={{ width: '120px' }} />
            )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">查询</Button>
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
      type: 'employee/updateState',
      payload: {
        queryFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'name jobEmployeeType'.split(' ');
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
    queryFormData: state.employee.queryFormData,
  }
})(QueryForm);
