import Head from "next/head";
import { ChangeEvent, useState } from "react";

import { Button, Checkbox, Form, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

import AppLayout from "../components/AppLayout";
import { useInput } from "../utils/useInput";

export default function Signup() {
  const { value: email, handler: onChangeEmail } = useInput("");
  const { value: nickname, handler: onChangeNickname } = useInput("");
  const { value: password, handler: onChangePassword } = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  };

  const onChangeTerm = (e: CheckboxChangeEvent) => {
    setTermError(false);
    setTerm(e.target.checked);
  };

  const onSubmit = () => {
    if (password !== passwordCheck) {
      setPasswordError(true);
      return;
    }

    if (!term) {
      setTermError(true);
      return;
    }

    console.log({ email, nickname, password, passwordCheck, term });
  };

  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input
              name="user-email"
              type="email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input
              name="user-nick"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호체크</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              다음 약관에 동의합니다.
            </Checkbox>
            {termError && (
              <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
}
