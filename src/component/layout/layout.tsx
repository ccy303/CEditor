import { Layout } from 'antd';
import React from 'react';
import RenderMainMenu from './../routes'

export default class LayoutSlide extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <RenderMainMenu />
      </Layout>
    );
  }
}
