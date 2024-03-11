import * as React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppBar, Layout, Menu, TitlePortal } from 'react-admin';

const MyAppBar = () => (
  <AppBar>
    <TitlePortal/>
  </AppBar>
);

export const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem/>
    <Menu.ResourceItem name="usuarios"/>
    <Menu.ResourceItem name="pessoas"/>
    <Menu.Item to="/custom-route" primaryText="Miscellaneous"  placeholder="empty"/>
  </Menu>
);

export default props => (
  <>
    <Layout {...props} appBar={MyAppBar}/>
    <ReactQueryDevtools
      initialIsOpen={false}
      toggleButtonProps={{ style: { width: 20, height: 30 } }}
    />
  </>
);
