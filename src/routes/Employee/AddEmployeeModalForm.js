import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Spin } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

class BasicForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err) => {
      if (!err) {
        // debugger;
        this.props.dispatch({
          type: 'employee/saveEmployeeRole',
        })
      }

      // Should format date value before submit.

    });
  }

  toggleShowAddModal = () => {
    this.props.dispatch({
      type: 'employee/updateState',
      payload: {
        showAddModal: !this.props.showAddModal,
      },
    });
  }

  handleCancel = () => {
    this.toggleShowAddModal();
  }

  handleOk = () => {
    this.props.dispatch({
      type: 'employee/addProductType',
    });
    // this.toggleShowAddModal();
  }

  getPermissionCheckBoxes = (platform) => {
    return (
      <Row>
        {
          this.props.permissions.filter(item => item.platform === platform).map((item) => {
            return (
              // <Col span={20} offset={2}><Checkbox value={item.id}>{item.name}</Checkbox></Col>
              <Col span={8}>
                <Checkbox
                  checked={item.checked !== 0}
                  style={{ marginRight: '4px', marginLeft: '0px' }} 
                  onChange={(e) => {
                    const cPermissions = this.props.permissions;
                    cPermissions.forEach((permission) => {
                      if (`${permission.id}` === `${item.id}`) {
                        // eslint-disable-next-line
                        permission.checked = e.target.checked ? 1 : 0;
                      }
                    })
                    this.props.dispatch({
                      type: 'employee/updateState',
                      payload: {
                        permissions: JSON.parse(JSON.stringify(cPermissions)),
                      },
                    });
                  }}
                >
                  <span
                    title={item.name}
                  >{item.name.length > 10 ? `${item.name.substr(0, 10)}...` : item.name}</span>
                </Checkbox>
              </Col>
            );
          })
        }
      </Row>
    );
  } 

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      colon: false,
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Spin spinning={this.props.loading}>
          <FormItem
            {...formItemLayout}
            label="角色名称"
          >
            {getFieldDecorator('name', {
              rules: [{ max: 10, message: '最多输入10个字符。' }],
            })(
              <Input style={{ width: '100%' }} />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色编码"
          >
            {getFieldDecorator('code', {
              rules: [{ max: 20, message: '最多输入20个字符。' }],
            })(
              <Input style={{ width: '100%' }} />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span className="section-title-without-float">角色权限</span>
            }
          />
          <FormItem
            // {...formItemLayout}
            labelCol={{
              xs: { span: 24 },
              sm: { span: 8 },
            }}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 24 },
            }}
            colon={false}
            label={
              <span style={{ textAlign: 'left' }}>商家后台操作权限</span>
            }
          >
          
            <Row>
              <Col span={16} offset={6}>
                {this.getPermissionCheckBoxes(1)}
              </Col>
            </Row>
          </FormItem>
          <FormItem
            {...formItemLayout}
            labelCol={{
              xs: { span: 24 },
              sm: { span: 8 },
            }}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 24 },
            }}
            colon={false}
            label="POS前端操作权限"
          >
            <Row>
              <Col span={16} offset={6}>
                {this.getPermissionCheckBoxes(2)}
              </Col>
            </Row>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label=" "
            style={{ textAlign: 'right' }}
          >
            <Button onClick={this.toggleShowAddModal}>取消</Button>
            &nbsp;
            <Button type="primary" htmlType="submit">{this.props.isEditing ? '更新' : '保存'}</Button>
          </FormItem>
        </Spin>
      </Form>
    );
  }
}

const AddProductModalForm = Form.create({
  onFieldsChange(props, changedFields) {
    const addEmployeeModalFormData = props.addEmployeeModalFormData;
    Object.keys(changedFields).forEach((key) => {
      addEmployeeModalFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'product/updateState',
      payload: {
        addEmployeeModalFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'name code'.split(' ');
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.addEmployeeModalFormData[key],
        value: props.addEmployeeModalFormData[key].value,
      })
    })
    return result;
  },
})(BasicForm);

// @connect((state) => ({
//   addEmployeeModalFormData: state.product.addEmployeeModalFormData,
// }))
export default connect((state) => {
  return {
    addEmployeeModalFormData: state.employee.addEmployeeModalFormData,
    showAddModal: state.employee.showAddModal,
    permissions: state.employee.permissions,
    isEditing: state.employee.isEditing,
    editingRole: state.employee.editingRole,
    loading: !!state.loading.effects['employee/getEmployeeRole'],
  }
})(AddProductModalForm);
