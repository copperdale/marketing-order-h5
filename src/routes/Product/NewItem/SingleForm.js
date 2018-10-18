import React, { Fragment } from 'react';
import { Form, Input, Select, Button, Icon } from 'antd';
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

  addAddon = () => {
    let singleFormData = JSON.parse(JSON.stringify(this.props.singleFormData));
    singleFormData.addons.push({ name: '', price: '' });
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        singleFormData
      }
    });
  }

  deleteAddons = (index) => {
    let singleFormData = JSON.parse(JSON.stringify(this.props.singleFormData));
    singleFormData.addons = singleFormData.addons.filter((item, cIndex) => index !== cIndex);
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        singleFormData
      }
    });
  }

  updateAddons = (index, key, value) => {
    let singleFormData = JSON.parse(JSON.stringify(this.props.singleFormData));
    singleFormData.addons = singleFormData.addons.map((item, cIndex) => {
      let result = JSON.parse(JSON.stringify(item));
      if (cIndex === index) {
        result[key] = value;
      }
      return result;
    });
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        singleFormData
      }
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
            <span className={styles['section-title']}>加项</span>
          }
        >
          {
            !this.props.isView
            &&
            <Button onClick={this.addAddon} className="primary-blue primary-blue-button">添加加项</Button>
          }
        </FormItem>
        {
          this.props.singleFormData.addons.map((item, index) => {
            return (
              <Fragment>
                <FormItem
                  {...formItemLayout}
                  label="加项名称"
                  required
                >
                  <Input 
                    
                    disabled={this.props.isView}
                    value={item.name}
                    onChange={(e) => {this.updateAddons(index, 'name', e.target.value)}}
                    addonAfter={!this.props.isView && <Icon onClick={() => { this.deleteAddons(index) }} type="delete" />} 
                  />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="加项价格"
                  required
                >
                  <Input
                    disabled={this.props.isView}
                    value={item.price}
                    onChange={(e) => {this.updateAddons(index, 'price', e.target.value)}}
                  />
                </FormItem>
              </Fragment>
            );
          })
        }
      </Form>
    );
  }
}

const SingleForm = Form.create({
  onFieldsChange(props, changedFields) {
    const singleFormData = props.singleFormData;
    Object.keys(changedFields).forEach((key) => {
      singleFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'product-new/updateState',
      payload: {
        singleFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'name code type price unit amount'.split(' ');
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.singleFormData[key],
        value: props.singleFormData[key].value,
      })
    })
    return result;
  },
})(BasicForm);

export default connect((state) => {
  return {
    singleFormData: state['product-new'].singleFormData,
    addtype: state['product-new'].addtype,
    isView: state['product-new'].isView,
  }
})(SingleForm);
