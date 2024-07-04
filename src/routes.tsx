import {createBrowserRouter, NavLink, Outlet, redirect} from "react-router-dom";
import { Layout, Space} from 'antd';
import React from "react";
import Counter from "./modules/counters/counter";
import User from "./modules/users/user";
import UserInfo from "./modules/users/user-info";
const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
};

const layoutStyle = {
    overflow: 'hidden',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    height: 'calc(100vh - 64px)'
};

export const routes = createBrowserRouter([
    {
        path: "/",
        element:  <Layout style={layoutStyle} >
            <Header style={headerStyle}>
                <Space>
                    <NavLink to={'/users'}>Users</NavLink>
                    <NavLink to={'/counters'}>Counters</NavLink>
                </Space>
            </Header>
            <Content style={contentStyle}>
                <Outlet />
            </Content>
        </Layout>,
        children: [
            {
                index: true,
                loader: () => redirect('/users')
            },
            {
                path: "users",
                element: <User />,
            },
            {
                path: "users/:id",
                element: <UserInfo />,
            },
            {
                path: "counters",
                element:  <Space>
                    <Counter counterId="one"/>
                    <Counter counterId="two"/>
                    <Counter counterId="free"/>
                </Space>,
            },
        ],
    },
])
