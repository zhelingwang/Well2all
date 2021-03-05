import * as React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import 'antd/dist/antd.css';
import './global.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { useState } = React;
import routes from './route/index';

export default function InnerLayout(props) {

  const [current, setCurrent] = useState([routes[0].name]);

  const handleMenuItemClk = (clk) => {
    const key = clk.key.split('-');
    setCurrent(key);
  }

  return (
    <Router>
      <Layout>
        <Header className="header"></Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={handleMenuItemClk}
            >
              {
                routes.map(item => {
                  const length = item.subLink ? item.subLink.length : 0;
                  const path = item.path;
                  const name = item.name;
                  if (length === 0) {
                    return (<Menu.Item key={`${name}`}>
                      <Link to={`${path}`}>{name}</Link>
                    </Menu.Item>);
                  }
                  return (
                    <SubMenu key={name} title={name}>
                      {
                        item.subLink.map(sub =>
                          <Menu.Item key={`${name}-${sub.name}`}>
                            <Link to={`${path}${sub.path}`}>{sub.name}</Link>
                          </Menu.Item>)
                      }
                    </SubMenu>
                  );
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                current.map((cur, idx) => <Breadcrumb.Item key={idx}>{cur}</Breadcrumb.Item>)
              }
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{ padding: 24, margin: 0, minHeight: 280, }}
            >
              <Switch>
                {
                  routes.map(item => {
                    const length = item.subLink ? item.subLink.length : 0;
                    const isHome = item.path === '/';
                    if (length === 0) {
                      return <Route exact={isHome} path={item.path} key={item.path}>{item.component ? <item.component /> : item.name}</Route>
                    }
                    return item.subLink.map((sub, idx) =>
                      <Route key={`${item.path + idx}`} path={`${item.path}${sub.path}`}>
                        {sub.component ? <sub.component /> : sub.name}
                      </Route>);
                  })
                }
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}
