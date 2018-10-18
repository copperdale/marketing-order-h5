import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less'

const FormItem = Form.Item;
const Option = Select.Option;

class BasicForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        this.props.dispatch({
          type: 'queryProductType'
        });
      }

      // Should format date value before submit.

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      colon: false,
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
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={
            <span className={styles['section-title']}>基础信息</span>
          }
        />
        <FormItem
          {...formItemLayout}
          label="品项名称"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入品项名称' }],
          })(
            <Input disabled={this.props.isView} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="品项编码"
        >
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入品项编码' }],
          })(
            <Input disabled={this.props.isView} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="品项分类"
        >
          {this.props.addtype === '0' ? '单品' : '套餐'}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="售卖价格"
        >
          {getFieldDecorator('price', {
            rules: [{ required: true, message: '请输入售卖价格' }],
          })(
            <Input disabled={this.props.isView} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="库存数量"
        >
          {getFieldDecorator('amount', {
            // rules: [{ required: true, message: '请输入售卖价格' }],
          })(
            <Input type="number" style={{width: '120px'}} disabled={this.props.isView} />
            )}
          <span style={{ float: 'right' }}>
            单位&nbsp;
            {getFieldDecorator('unit', {
              // rules: [{ required: true, message: '请输入售卖价格' }],
            })(
              <Input style={{width: '120px'}} disabled={this.props.isView} />
              )}
          </span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span className={styles['section-title']}>子品项</span>
          }
        />
      </Form>
        // <FormItem>
        //   <Button type="primary" htmlType="submit">查询</Button>
        // </FormItem>
    );
  }
}

const SetForm = Form.create({
  onFieldsChange(props, changedFields) {
    const setFormData = props.setFormData;
    Object.keys(changedFields).forEach((key) => {
      setFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'product-new/updateState',
      payload: {
        setFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'name code type price unit amount'.split(' ');
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.setFormData[key],
        value: props.setFormData[key].value,
      })
    })
    return result;
  },
})(BasicForm);

export default connect((state) => {
  return {
    setFormData: state['product-new'].setFormData,
    addtype: state['product-new'].addtype,
    isEdit: state['product-new'].isEdit,
    isView: state['product-new'].isView,
  }
})(SetForm);
