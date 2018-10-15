import React, { Component, Fragment } from 'react';

export default class IframeWrap extends Component {

  render() {
    return (
      <Fragment>
        <iframe
          marginWidth="0"
          marginHeight="0"
          id={this.props.id}
          srcDoc={this.props.srcDoc}
          allowTransparency="true"
          scrolling="auto"
          title="title"
          height="100%"
          width="100%"
          frameborder="0"
        />
      </Fragment>
    );
  }
};