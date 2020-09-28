import React from 'react'
import { Layout } from 'antd'
import Head from 'next/head'
import { Menu, Icon } from 'antd'

import 'antd/dist/antd.css'

const { Header, Content } = Layout;

export default ({ children, title = 'IR Demo | UIT' }) => (
    <>
        <Layout className="layout">
            <Head>
                <title>{title}</title>
                <meta charSet='utf-8' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>

            <Header className="header">
                <Menu mode="horizontal" selectedKeys={['/']}>
                    <Menu.Item key="/">
                        <a href="/"><Icon type="home" /> Home</a>
                    </Menu.Item>
                    <Menu.Item key="/about">
                        <a href="/about"><Icon type="question" /> About</a>
                    </Menu.Item>
                </Menu>
            </Header>

            <Content
                style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                {children}
            </Content>
        </Layout>

        <style jsx global>{`
        .header {
            height: auto;
            background: #fff;
        }
    `}</style>
    </>
)