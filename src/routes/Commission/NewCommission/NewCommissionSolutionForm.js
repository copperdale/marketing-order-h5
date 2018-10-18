import React from 'react';
import { Form, Input, Row, Col, Radio, DatePicker, Select, Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
// import styles from '../../Product/NewItem/index.less';
import CommissionTypeSelect from '../CommissionComponent/CommissionTypesSelect.js'
import CommissionRuleInput from '../CommissionComponent/CommissionRuleInput.js'

const FormItem = Form.Item;
const Option = Select.Option;

export const getFieldsConfig = (props = { }) => {
  // const latestInfo = '';
  let planMode = '1';
  let planType = '1';
  try {
    planMode=props.newCommissionSolutionFormData.planMode.value;
    planType=props.newCommissionSolutionFormData.planType.value;
  } catch(e) {
    console.log(e);
  }
  const result = [{
    sectionTitle: '基础信息',
    fields: [{
      label: '方案名称',
      placeholder: '请输入方案名称',
      dataIndex: 'planName',
      // rules: [{ required: true, message: '请输入姓名' }],
      render:<Input maxLength={20} />,
    },{
      label: '方案类型',
      placeholder: '',
      dataIndex: 'planType',
      // rules: [{ required: true, message: '请输入姓名' }],
      render:(
        <CommissionTypeSelect style={{ width: '100%' }} />
      ),
    }],
  },
  {
    sectionTitle: '提成分配',
    fields: [{
      label: '选择参与提成分配身份',
      placeholder: '',
      dataIndex: 'talentRoleBoList',
      // rules: [{ required: true, message: '请输入工号' }],
      render:(
        <Select style={{ width: '100%' }} mode="multiple">
          <Option value="1">试用期</Option>
          <Option value="2">正式</Option>
          <Option value="3">外聘</Option>
        </Select>
      ),
    }],
  },{
    sectionTitle: '提成算法',
    fields: [{
      label: '提成方式',
      placeholder: '',
      dataIndex: 'planMode',
      rules: [{ required: true, message: '请输入手机号' }],
      render: (
        <Select style={{ width: '100%' }}>
          <Option value="1">固定金额提成</Option>
          <Option value="2">消费比例提成</Option>
        </Select>
      ),
    }, {
      label: ' ',
      placeholder: '',
      dataIndex: 'talentRuleBos',
      // rules: [{ required: true, message: '请输入姓名' }],
      render: (
        <CommissionRuleInput
          planMode={planMode}
          planType={planType}
        />
      ),
    }],
  }];
  return result;
};

class BasicForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err) => {
      if (!err) {
        this.props.dispatch({
          type: 'commission-new/newOrUpdate',
        });
      }
    });
  }

  

  getFormContent = () => {
    const configs = getFieldsConfig(this.props);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
      colon: false,
    };
    // <Row gutter={16}>
    const cols = configs.map((item) => {
      return (
        <Row gutter={16}>
          <Col span={18}>
            <FormItem
              {...formItemLayout}
              label={
                <span
                  style={{ borderLeft: '4px solid #ee5e1f', paddingLeft: '4px' }}
                  /* className={styles['section-title']} */
                >{item.sectionTitle}
                </span>
              }
            />
            {
              item.fields.map((subItem) => {
                return (
                  <FormItem
                    {...formItemLayout}
                    label={subItem.label}
                  >
                    {
                      typeof subItem.render === 'string'
                      ?
                      subItem.render
                      :
                      getFieldDecorator(subItem.dataIndex, {
                        rules: subItem.rules || [],
                      })(
                        subItem.render
                        )}
                  </FormItem>
                );
              })
            }
          </Col>
        </Row>
      )
    })

    return cols;
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
      colon: false,
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        {
          !this.props.isView
          &&
          (
            <Row gutter={16}>
              <Col span={18}>
                <FormItem
                  {...formItemLayout}
                  label=" "
                  style={{ textAlign: 'right' }}
                >
                  <Button
                    onClick={() => {
                      this.props.dispatch(routerRedux.push('/commission'))
                    }}
                  >取消
                  </Button>
                  &nbsp;
                  <Button htmlType="submit" type="primary">保存</Button>
                </FormItem>
              </Col>
            </Row>
          )
        }
        {
          this.getFormContent()
        }
      </Form>
    );
  }
}

export const fieldsKeys = getFieldsConfig().reduce((result, item) => {
  if (item.fields.length) {
    item.fields.forEach((field) => {
      result.push(field.dataIndex);
    });
  }
  return result;
}, []);

const NewCommissionSolutionForm = Form.create({
  onFieldsChange(props, changedFields) {
    const newCommissionSolutionFormData = props.newCommissionSolutionFormData;
    console.log(changedFields);
    Object.keys(changedFields).forEach((key) => {
      newCommissionSolutionFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'commission-new/updateState',
      payload: {
        newCommissionSolutionFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = fieldsKeys;
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.newCommissionSolutionFormData[key],
        value: props.newCommissionSolutionFormData[key].value,
      })
    })
    return result;
  },
})(BasicForm);

// @connect((state) => ({
//   newCommissionSolutionFormData: state.product.newCommissionSolutionFormData,
// }))
export default connect((state) => {
  return {
    newCommissionSolutionFormData: state['commission-new'].newCommissionSolutionFormData,
    isView: state['commission-new'].isView,
    EmployeeRoleList: state['commission-new'].EmployeeRoleList,
  }
})(NewCommissionSolutionForm);
