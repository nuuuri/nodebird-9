import Link from "next/link";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { Button, Form, Input } from "antd";

import { loginAction } from "@/reducers/userReducer";

import { useInput } from "@/utils/useInput";

export default function LoginForm() {
  const { value: id, handler: onChangeId } = useInput("");
  const { value: password, handler: onChangePassword } = useInput("");

  const dispatch = useDispatch();

  const onSubmitForm = useCallback(() => {
    dispatch(loginAction({ id, password }));

    console.log({
      id,
      password,
    });
  }, [id, password, dispatch]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: "10px" }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          type="password"
          required
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
}
