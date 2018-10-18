import React, { Component, Fragment } from 'react';
import { Button, Radio, Tabs, Card, Icon, Input, Modal } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { routerRedux } from 'dva/router';

const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

@connect((state) => ({
  tables: state.setting.tables,
  selectedTableAreaId: state.setting.selectedTableAreaId,
  tableArea: state.setting.tableArea,
  isEdit: state.setting.isEdit,
}))
export default class NewItem extends Component {

  addTempArea = () => {
    const tableArea = this.props.tableArea;
    tableArea.push({ areaName: '' });
    this.props.dispatch({
      type: 'setting/updateState',
      payload: {
        tableArea: JSON.parse(JSON.stringify(tableArea)),
      },
    });
  }

  addTempTable = () => {
    const tables = this.props.tables;
    tables.push({ tableName: '' });
    this.props.dispatch({
      type: 'setting/updateState',
      payload: {
        tables: JSON.parse(JSON.stringify(tables)),
      },
    });
  }

  addTable = (tableName = '') => {
    if (tableName.trim().length) {
      const props = this.props;
      Modal.confirm({
        title: '真的要保存这个工作台吗?',
        content: null,
        onOk() {
          props.dispatch({
            type: 'setting/addTable',
          });
        },
        onCancel() {},
      });
    } else {
      Modal.confirm({
        title: '朋友，要不要这么调皮，名字都不输入就来骗我?',
        content: null,
        onOk() {},
        onCancel() {},
      });
    }
  }

  addArea = (areaName = '') => {
    if (areaName.trim().length) {
      const props = this.props;
      Modal.confirm({
        title: '真的要保存这个工作区域吗?',
        content: null,
        onOk() {
          props.dispatch({
            type: 'setting/addArea',
          });
        },
        onCancel() {},
      });
    } else {
      Modal.confirm({
        title: '朋友，要不要这么调皮，名字都不输入就来骗我?',
        content: null,
        onOk() {},
        onCancel() {},
      });
    }
  }

  updateTable = (tableName, table) => {
    if (tableName.trim().length) {
      const props = this.props;
      Modal.confirm({
        title: '真的要保存这个工作台吗?',
        content: null,
        onOk() {
          props.dispatch({
            type: 'setting/updateTable',
            payload: {
              table,
            },
          });
        },
        onCancel() {},
      });
    }
  }

  updateArea = (areaName, area) => {
    if (areaName.trim().length) {
      const props = this.props;
      Modal.confirm({
        title: '真的要保存这个工作区域吗?',
        content: null,
        onOk() {
          props.dispatch({
            type: 'setting/updateArea',
            payload: {
              area,
            },
          });
        },
        onCancel() {},
      });
    }
  }

  updateTableName = (tableName, table) => {
    const tables = this.props.tables;
    tables.forEach((item) => {
      if (item.id === table.id) {
        item.tableName = tableName;
      }
    })
    this.props.dispatch({
      type: 'setting/updateState',
      payload: {
        tables: JSON.parse(JSON.stringify(tables)),
      },
    });
  }

  updateAreaName = (areaName, area) => {
    const tableArea = this.props.tableArea;
    tableArea.forEach((item) => {
      if (item.id === area.id) {
        item.areaName = areaName;
      }
    })
    this.props.dispatch({
      type: 'setting/updateState',
      payload: {
        tableArea: JSON.parse(JSON.stringify(tableArea)),
      },
    });
  }

  setTableEditable = (tableId) => {
    const tables = this.props.tables;
    tables.forEach((item) => {
      item.isEdit = false;
      if (item.id === tableId) {
        item.isEdit = true;
      }
    });
    this.props.dispatch({
      type: 'setting/updateState',
      payload: {
        tables: JSON.parse(JSON.stringify(tables)),
      },
    });
  }

  setAreaEditable = (areaId) => {
    const tableArea = this.props.tableArea;
    tableArea.forEach((item) => {
      item.isEdit = false;
      if (item.id == areaId) {
        item.isEdit = true;
      }
    });
    this.props.dispatch({
      type: 'setting/updateState',
      payload: {
        tableArea: JSON.parse(JSON.stringify(tableArea)),
      },
    });
  }

  cancelTableEditable = () => {
    const tables = this.props.tables;
    tables.forEach((item) => {
      item.isEdit = false;
    });
    this.props.dispatch({
      type: 'setting/updateState',
      payload: {
        tables: JSON.parse(JSON.stringify(tables)),
      },
    });
  }

  cancelAreaEditable = () => {
    const tableArea = this.props.tableArea;
    tableArea.forEach((item) => {
      item.isEdit = false;
    });
    this.props.dispatch({
      type: 'setting/updateState',
      payload: {
        tableArea: JSON.parse(JSON.stringify(tableArea)),
      },
    });
  }

  deleteTable = (table) => {
    const props = this.props;
    if (!table.id) {
      props.dispatch({
        type: 'setting/deleteTable',
        payload: {
          table,
        },
      });
      return;
    }
    Modal.confirm({
      title: '真的要删除这个工作台吗?',
      content: null,
      onOk() {
        props.dispatch({
          type: 'setting/deleteTable',
          payload: {
            table,
          },
        });
      },
      onCancel() {},
    });
    
  }

  deleteArea = (area) => {
    const props = this.props;
    if (!area.id) {
      props.dispatch({
        type: 'setting/deleteArea',
        payload: {
          area,
        },
      });
      return;
    }
    Modal.confirm({
      title: '真的要删除这个工作台吗?',
      content: null,
      onOk() {
        props.dispatch({
          type: 'setting/deleteArea',
          payload: {
            area,
          },
        });
      },
      onCancel() {},
    });
    
  }
  
  render() {
    console.log(this.props.tableArea, this.props.tables);
    return (
      <Fragment>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={this.addTempArea} className="primary-blue primary-blue-button">添加区域</Button>
        </div>
        <Tabs
          activeKey={`${this.props.selectedTableAreaId}`}
          onChange={(activeKey) => {
            if (activeKey === '-1') return;
            this.props.dispatch({
              type: 'setting/updateState',
              payload: { selectedTableAreaId: Number(activeKey) },
            });
            this.props.dispatch({
              type: 'setting/loadTablesByAreaId',
            });
          }}
        >
          {
            this.props.tableArea.map((area) => {
              return area.id ?
              (
                <TabPane
                  tab={
                    !area.isEdit
                    ?
                    area.areaName
                    :
                    (
                      <Input
                        style={{ width: '200px' }} 
                        value={area.areaName} 
                        onChange={(e) => {
                          this.updateAreaName(e.target.value, area);
                        }}
                        onPressEnter={(e) => { this.updateArea(e.target.value, area); }}
                      />
                    )
                  }
                  key={`${area.id}` || '-1'}
                >
                  {
                    !area.isEdit
                    ?
                    (
                      <Button icon="edit" onClick={() => { this.setAreaEditable(area.id) }} size="default" title="编辑区域" />
                    )
                    :
                    (
                      <Button icon="rollback" onClick={() => { this.cancelAreaEditable() }} size="default" title="取消编辑" />
                    )
                  }
                  &nbsp;
                  <Button onClick={() => { this.deleteArea(area); }} icon="delete" size="default" title="删除区域" />
                  <hr />
                  {
                    `${area.id}` === `${this.props.selectedTableAreaId}`
                    &&
                    this.props.tables.map((table) => {
                      if (table.id) {
                        return (
                          <Card
                            title={
                              table.isEdit
                              ?
                              (
                                <Input
                                  size="small"
                                  value={table.tableName}
                                  onChange={(e) => {
                                    this.updateTableName(e.target.value, table);
                                  }}
                                  onPressEnter={(e) => {
                                    this.updateTable(e.target.value, table);
                                  }}
                                />
                              )
                              :
                              (
                                <span title={table.tableName}>
                                  {table.tableName}
                                </span>
                              )
                            }
                            bordered={false}
                            style={{ width: 200, display: 'inline-block', marginTop: '16px', marginRight: '16px' }}
                          >
                            {
                              table.isEdit
                              ?
                              (
                                <Icon
                                  style={{ fontSize: '26px', cursor: 'pointer', color: '#ee5e1f' }}
                                  type="rollback"
                                  title="放弃当前操作"
                                  theme="outlined"
                                  onClick={() => {
                                    this.cancelTableEditable();
                                  }}
                                />
                              )
                              :
                              (
                                <Icon
                                  style={{ fontSize: '26px', cursor: 'pointer', color: '#ee5e1f' }}
                                  type="edit"
                                  theme="outlined"
                                  onClick={() => {
                                    this.setTableEditable(table.id);
                                  }}
                                />
                              )
                            }
                            &nbsp;
                            &nbsp;
                            <Icon
                              style={{ fontSize: '26px', cursor: 'pointer', color: '#ee5e1f' }}
                              type="delete"
                              theme="outlined"
                              onClick={() => {
                                this.deleteTable(table);
                              }}
                            />
                          </Card>
                        )
                      } else {
                        return (
                          <Card
                            title={
                              <Input
                                size="small"
                                value={table.tableName}
                                onChange={(e) => {
                                  this.updateTableName(e.target.value, table);
                                }}
                                onPressEnter={(e) => { this.addTable(e.target.value); }}
                              />
                            }
                            bordered={false}
                            style={{ width: 200, display: 'inline-block', marginTop: '16px', marginRight: '16px' }}
                          >
                            <Icon
                              style={{ fontSize: '26px', cursor: 'pointer', color: '#ee5e1f' }}
                              type="delete"
                              theme="outlined"
                              onClick={() => {
                                this.deleteTable(table);
                              }}
                            />
                          </Card>
                        )
                      }
                    })
                  }
                  
                  {
                    this.props.tables.filter((item) => {
                      return !item.id;
                    }).length === 0
                    &&
                    (
                      <Icon
                        onClick={this.addTempTable}
                        style={{ fontSize: '48px', cursor: 'pointer' }}
                        className="primary-blue"
                        type="plus-circle"
                        theme="outlined"
                        title="添加工作台"
                      />
                    )
                  }
                </TabPane>
              )
              :
              (
                <TabPane
                  tab={
                    (
                      <Input
                        size="small"
                        style={{ width: '200px' }} 
                        value={area.areaName} 
                        onChange={(e) => {
                          this.updateAreaName(e.target.value, area);
                        }}
                        onPressEnter={(e) => { this.addArea(e.target.value); }}
                        addonAfter={
                          <Icon
                            size="small"
                            type="rollback"
                            title="放弃当前操作"
                            theme="outlined"
                            onClick={() => {
                              this.deleteArea(area);
                            }}
                          />
                        }
                      />
                    )
                  }
                  key={area.id || '-1'}
                />
              );
            })
          }
          
        </Tabs>
      </Fragment>
    );
  }
};