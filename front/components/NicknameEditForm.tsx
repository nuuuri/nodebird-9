import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from 'antd';

import { useInput } from '@/utils/useInput';

import { changeNicknameRequestAction } from '@/store/actions/userAction';
import { RootState } from '@/store/reducers';

export default function NicknameEditForm() {
  const { me } = useSelector((state: RootState) => state.user);
  const { value: nickname, handler: onChangeNickname } = useInput(
    me?.nickname || ''
  );

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch(changeNicknameRequestAction({ nickname: nickname + '' }));
  }, [nickname, dispatch]);

  return (
    <Form
      style={{
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '20px',
      }}>
      <Input.Search
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
}
