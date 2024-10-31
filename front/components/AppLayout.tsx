import Link from 'next/link';
import Router from 'next/router';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Button, Col, Input, Menu, Row } from 'antd';
import { createGlobalStyle } from 'styled-components';

import LoginForm from '@/components/LoginForm';
import UserProfile from '@/components/UserProfile';

import { useInput } from '@/utils/useInput';

import { RootState } from '@/store/reducers';

interface AppLayoutProps {
  children: React.ReactNode;
}

const Global = createGlobalStyle`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

export default function AppLayout({ children }: AppLayoutProps) {
  const { value: searchInput, handler: onChangeSearchInput } = useInput('');
  const { me } = useSelector((state: RootState) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`).catch(() => {});
  }, [searchInput]);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
            style={{ verticalAlign: 'middle' }}
          />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/nuuuri"
            target="_blank"
            rel="noreferrer noopener">
            Made by Nuuuri
          </a>
        </Col>
      </Row>
    </div>
  );
}
