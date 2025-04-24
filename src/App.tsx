// import './utils/vegemite';
// import './utils/binarySearch';
// import './utils/minMoves2-462';
import './utils/linkedList';
import React, { useState } from 'react';
import { Layout, Menu, Typography, Tabs } from 'antd';
import UserList from './components/UserList';
import DataList from './components/DataList';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

export default function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          Study Code App
        </div>
      </Header>
      
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Data Management</Title>
        
        <Tabs defaultActiveKey="1">
          <TabPane tab="Users" key="1">
            <UserList />
          </TabPane>
          <TabPane tab="Data" key="2">
            <DataList />
          </TabPane>
        </Tabs>
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>
        Study Code App ©{new Date().getFullYear()} Created with React, Ant Design, and Node.js
      </Footer>
    </Layout>
  );
}
