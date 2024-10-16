import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Input } from 'antd';

import { useInput } from '@/utils/useInput';

import { addPostRequestAction } from '@/store/actions/postAction';
import { RootState } from '@/store/reducers';

export default function PostForm() {
  const imageInput = useRef<HTMLInputElement>();
  const { imagePaths, addPostDone } = useSelector(
    (state: RootState) => state.post
  );

  const {
    value: text,
    setValue: setText,
    handler: onChangeText,
  } = useInput('');

  const dispath = useDispatch();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onSubmit = useCallback(() => {
    dispath(
      // dummy post
      addPostRequestAction({
        id: 2,
        User: {
          email: 'sbfl125@gmail.com',
          nickname: 'nuuuri',
        },
        content: text.toString(),
        Images: [],
        Comments: [],
      })
    );
  }, [dispath, text]);

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone, setText]);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input ref={imageInput} type="file" multiple hidden />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          짹짹
        </Button>
        <div>
          {imagePaths.map((v) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={v} style={{ width: '200px' }} alt="v" />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Form>
  );
}
