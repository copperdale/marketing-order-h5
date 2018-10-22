import React, { Component } from 'react';
import { connect } from 'dva';
import IframeWrap from '../../components/IframeWrap'
import { commercialSetting } from '../../services/URL';

@connect((state) => ({
  // htmlString: state.commercialSetting.htmlString || '<b>hello</b>',
}))
export default class Report extends Component {

  render() {
    return (
      <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0 }}>
      	<IframeWrap
	      	// srcDoc={this.props.htmlString}
          src={commercialSetting}
	      />
      </div>
    );
  }
};