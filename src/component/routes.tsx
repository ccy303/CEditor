import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import { routes } from './routesData';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

interface State {
  collapsed: boolean;
  routesNum: Array<any>
  selectKey: any
}
class RenderMainMenu extends React.Component<any, State> {
  state: State = {
    collapsed: false,
    routesNum: [],
    selectKey: []
  };
  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };
  getRoutesNum(routes: Array<any>) {
    routes.forEach((val) => {
      if (val.path && !val.routes) {
        this.state.routesNum.push({ path: val.path, component: val.component })
      } else if (val.routes) {
        this.getRoutesNum(val.routes)
      }
    })
  };
  menuClick(e: any) {
    this.setState({
      selectKey: e.keyPath
    })
  }
  componentWillMount() {
    this.getRoutesNum(routes);
    this.setState({
      selectKey: [String(routes.findIndex(val => { return val.path === this.props.location.pathname }) + 1)]
    })
  }
  render() {
    const { selectKey } = this.state;
    return (
      <Router>
        <Header style={{ position: 'fixed', width: '100%', zIndex: 999 }}>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            selectedKeys={selectKey}
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            onClick={this.menuClick.bind(this)}
          >
            {routes.map((mainRoute, i) => {
              return (
                !mainRoute.routes ? <Menu.Item key={i + 1}>
                  <Icon type="pie-chart" />
                  <span>{mainRoute.title}</span>
                  <Link style={{ display: 'inline' }} to={mainRoute.path}></Link>
                </Menu.Item> :
                  <SubMenu key={i + 1} title={
                    <span>
                      <Icon type="user" />
                      <span>{mainRoute.title}</span>
                    </span>
                  }>
                    {mainRoute.routes.map((subRoute, index) => {
                      return <Menu.Item key={`${subRoute}${i + index}`}>
                        <Link to={subRoute.path}>{subRoute.title}</Link>
                      </Menu.Item>
                    })}
                  </SubMenu>
              )
            })}
          </Menu>
        </Header>
        <Content style={{ margin: '84px 20px 20px' }}>
          <Switch>
            {this.state.routesNum.map((val, i) => {
              return (
                <Route key={`Route${i}`} exact path={val.path} render={props => (<val.component {...props} />)} />
              )
            })}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by CCY</Footer>
      </Router >
    )
  }
}

export default withRouter(RenderMainMenu)