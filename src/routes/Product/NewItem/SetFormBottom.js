import React, { Component, Fragment } from 'react';
import { Button, Radio, Row, Col, Card, List } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SetFormBottomRight from './SetFormBottomRight'
import SetFormBottomAddModal from './SetFormBottomAddModal'


const RadioGroup = Radio.Group

@connect((state) => ({
    addtype: state['product-new'].addtype,
    dishSetmealGroupBos: state['product-new'].setFormData.dishSetmealGroupBos,
    selectedSetProductType: state['product-new'].selectedSetProductType,
    setFormData: state['product-new'].setFormData,
    isView: state['product-new'].isView,
    isEdit: state['product-new'].isEdit,
  }))
export default class NewItem extends Component {

  save = () => {
    this.props.dispatch({
      type: 'product-new/new',
    });
  }
  
  updateSelectedSetProductType = (selectedSetProductType) => {
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        selectedSetProductType: JSON.parse(JSON.stringify(selectedSetProductType)),
      },
    });
  }

  deleteProductType = (index) => {
    let setFormData = JSON.parse(JSON.stringify(this.props.setFormData));
    setFormData.dishSetmealGroupBos = setFormData.dishSetmealGroupBos.filter((item, cIndex) => cIndex !== index);
    debugger;
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        setFormData: JSON.parse(JSON.stringify(setFormData)),
        selectedSetProductType: {}
      }
    });
  }

  toggleShowSetFormBottomAddModal = (SetFormBottomAddModalFormData) => {
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        showSetFormBottomAddModal: !this.props.showSetFormBottomAddModal,
        SetFormBottomAddModalFormData: JSON.parse(JSON.stringify(SetFormBottomAddModalFormData))
      },
    });
  }

  render() {

    return (
      <Row gutter={8}>
        <Col span={6}>
          <Card bordered={false} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
            <Fragment>
              <div style={{ marginTop: '8px', padding: '0px 4px', backgroundColor: '#ccc', height: '32px', lineHeight: '32px', textAlign: 'right' }}>
                <span style={{ float: 'left' }}>子品项分组</span>
                {
                  !this.props.isView
                  &&
                  (
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => {
                        this.toggleShowSetFormBottomAddModal({
                          name: { value: '' },
                          orderMin: { value: '' },
                          orderMax: { value: '' },
                        })
                      }
                      }
                    >创建子品项
                    </Button>
                  )
                }
              </div>
              <List
                size="small"
                itemLayout="horizontal"
                split={false}
                locale={{
                  emptyText: '暂无下级分类',
                }}
                dataSource={this.props.dishSetmealGroupBos}
                renderItem={(subItem, index) => (
                  <List.Item actions={[
                    <a 
                      href="javascript:void(0)" 
                      onClick={() => { 
                        let keys = 'name orderMin orderMax'.split(' ');
                        const SetFormBottomAddModalFormData = {};
                        keys.forEach(item => {
                          SetFormBottomAddModalFormData[item] = { value: subItem[item] } ;
                        })
                        this.toggleShowSetFormBottomAddModal(SetFormBottomAddModalFormData)
                        }
                      }
                    >编辑</a>,
                    <a 
                      href="javascript:void(0)" 
                      onClick={() => { 
                        this.deleteProductType(index)
                      }}
                    >删除</a>,
                  ].filter(item => !this.props.isView)}
                  >
                    <span
                      className={
                        (
                          this.props.selectedSetProductType.name == subItem.name
                          || (this.props.selectedSetProductType.id && this.props.selectedSetProductType.id === subItem.id)
                        )
                        ? 'selected-type' : ''}
                      style={{ paddingLeft: '20px', cursor: 'pointer' }}
                      onClick={() => { this.updateSelectedSetProductType(subItem); }}
                    >{subItem.name}
                    </span>
                  </List.Item>
                )}
              />
            </Fragment>
            
            {/* <div style={{ marginTop: '8px', padding: '0px 4px 0px 16px', height: '18px', lineHeight: '18px', textAlign: 'right' }}>
              <span style={{ float: 'left', marginLeft: '4px' }}>护肤类</span>
              <a href="javascript:void(0)">编辑</a>&nbsp;
              <a href="javascript:void(0)">删除</a> &nbsp;
            </div> */}
          </Card>
          <SetFormBottomAddModal />
        </Col>
        <Col span={18}>
          <Card bordered={false} bodyStyle={{ padding: 0 }}>
            <SetFormBottomRight />
          </Card>
        </Col>
      </Row>
    );
  }
};