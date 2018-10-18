import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductTypeLayout from './Layout';
import QueryForm from './QueryForm';
import SearchResult from './SearchResult';


@connect((state) => ({
  showNewButton: state.product.showNewButton,
  selectedDishName: state.product.selectedDishName,
}))
export default class Employee extends Component {

  render() {
    return (
      <ProductTypeLayout
        breadcrumbs={['店长', '员工列表']}
        actionButtons={
          (
            <Button
              size="small" 
              style={{ float: 'right' }} 
              className="primary-blue primary-blue-button"
              onClick={() => { this.props.dispatch(routerRedux.push('/employee-new?isView=false&isEdit=false')); }}
            >新建员工
            </Button>
          )
        }
      >
        <QueryForm />
        <SearchResult />
      </ProductTypeLayout>
    );
  }
};
