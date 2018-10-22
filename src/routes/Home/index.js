import React, { Component } from 'react';
import { connect } from 'dva';
import IframeWrap from '../../components/IframeWrap'
import { homePage } from '../../services/URL';

// @connect((state) => ({
//   htmlString: state.home.htmlString || '<b>hello</b>',
// }))
export default class NewItem extends Component {

  render() {
    return (
      <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0 }}>
      	<IframeWrap
	      	src={homePage}
	      />
      </div>
    );
  }
};