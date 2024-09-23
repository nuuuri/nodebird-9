import Link from "next/link";
import React from "react";
import { Button, Col, Input, Menu, Row } from "antd";
import { useSelector } from "react-redux";

import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import { RootState } from "../reducers";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <div>
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
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/nuuuri"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by Nuuuri
          </a>
        </Col>
      </Row>
    </div>
  );
}
