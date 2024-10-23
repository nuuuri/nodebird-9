import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Input } from 'antd';

import { useInput } from '@/utils/useInput';

import { loginRequestAction } from '@/store/actions/userAction';
import { RootState } from '@/store/reducers';

export default function LoginForm() {
  const { isLoggingIn, loginError } = useSelector(
    (state: RootState) => state.user
  );
  const { value: email, handler: onChangeEmail } = useInput('');
  const { value: password, handler: onChangePassword } = useInput('');

  const dispatch = useDispatch();

  const onSubmitForm = useCallback(() => {
    dispatch(
      loginRequestAction({ email: email + '', password: password + '' })
    );
  }, [email, password, dispatch]);

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          type="email"
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          required
        />
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
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
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
