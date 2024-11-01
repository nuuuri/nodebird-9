import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Input } from 'antd';
import { backUrl } from 'config/config';

import { useInput } from '@/utils/useInput';

import {
  addPostRequestAction,
  removeImage,
  uploadImagesRequestAction,
} from '@/store/actions/postAction';
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

  const onChangeImages = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log('images', e.target.files);
      const imageFormData = new FormData();

      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
      });

      dispath(uploadImagesRequestAction(imageFormData));
    },
    [dispath]
  );

  const onRemoveImage = useCallback(
    (index: number) => () => {
      dispath(removeImage({ index }));
    },
    [dispath]
  );

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text.toString());

    dispath(addPostRequestAction(formData));
  }, [imagePaths, text, dispath]);

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
        <input
          ref={imageInput}
          type="file"
          name="image"
          multiple
          hidden
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          짹짹
        </Button>
        <div>
          {imagePaths.map((v, idx) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={`${backUrl}/${v}`} style={{ width: '200px' }} alt="v" />
              <div>
                <Button onClick={onRemoveImage(idx)}>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Form>
  );
}
