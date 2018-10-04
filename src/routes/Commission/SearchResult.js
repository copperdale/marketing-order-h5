import React, { Component } from 'react';
import { Table, Divider, Popconfirm, Spin } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment'

@connect((state) => ({
  searchResult: state.commission.searchResult,
  loading: !!state.loading.models.commission,
}))
export default class SearchResult extends Component {

  deleteCommission = (id) => {
    this.props.dispatch({
      type: 'commission/deleteCommission',
      payload: {
        id,
      },
    });
  }

  setStatus = (id, status) => {
    this.props.dispatch({
      type: 'commission/setCommissionStatus',
      payload: {
        id,
        status,
      },
    });
  }

  render() {
    const columns = [{
      title: '方案名称',
      dataIndex: 'planName',
    }, {
      title: '类型',
      dataIndex: 'planType',
      render: (text) => {
        const typeText = {
          1: '消费提成',
          2: '服务项目提成',
          3: '储值提成',
        };
        return typeText[text] || '其它';
      },
    }, {
      title: '创建时间',
      dataIndex: 'serverCreateTime',
      render: (text) => {
        return moment(Number(text)).format('YYYY-MM-DD HH:mm');
      },
    }, {
      title: '启动时间',
      dataIndex: 'serverUpdateTime',
      render: (text) => {
        return moment(Number(text)).format('YYYY-MM-DD HH:mm');
      },
    }, {
      title: '状态',
      dataIndex: 'enabledFlag',
      render: (text) => {
        return `${text}` === '1' ? '启用' : '禁用'; 
      },
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a
            className="primary-blue"
            href="javascript:;"
            onClick={() => { this.setStatus(record.id, `${record.enabledFlag}` === '1' ? 2 : 1) }}
          >
            {
              `${record.enabledFlag}` !== '1' ? '启用' : '禁用'
            }
          </a>
          <Divider type="vertical" />
          <Link
            className="primary-blue"
            href="javascript:;"
            to={{
              pathname: '/commission-new',
              search: `isEdit=true&id=${record.id}`,
            }}
          >
          编辑
          </Link>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要删除这条记录吗?" 
            onConfirm={() => {this.deleteCommission(record.id)}}
            okText="删除"
            cancelText="取消"
          >
            <a 
              className="primary-blue"
              href="javascript:;"
            >删除
            </a>
          </Popconfirm>
        </span>
      ),
    }];

    const data = this.props.searchResult;
    const pager = {
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['2', '5', '10', '20', '30', '40', '50', '100'],
      showTotal: (total, range) => { // eslint-disable-line
        return (
          <div>
            共{total}条&nbsp;
          </div>
        );
      },
      showQuickJumper: true,
      size: 'small',
    };
    // console.log(!!this.props.loadding);
    return (
      <Spin spinning={this.props.loading}>
        <Table
          columns={columns}
          dataSource={data.content}
          bordered
          size="small"
          pagination={pager}
        />
      </Spin>
    )
  }
}
