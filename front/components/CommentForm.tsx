import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Input } from 'antd';

import type { Post } from '@/types/Post';

import { useInput } from '@/utils/useInput';

import { addCommentRequestAction } from '@/store/actions/postAction';
import { RootState } from '@/store/reducers';

interface CommentFormProps {
  post: Post;
}

export default function CommentForm({ post }: CommentFormProps) {
  const { addCommentDone } = useSelector((state: RootState) => state.post);
  const {
    value: commentText,
    setValue: setCommentText,
    handler: onChangeCommentText,
  } = useInput('');

  const dispatch = useDispatch();

  const onSubmitComment = useCallback(() => {
    dispatch(
      addCommentRequestAction({
        PostId: post.id,
        content: commentText + '',
      })
    );
  }, [post.id, commentText, dispatch]);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone, setCommentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}>
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
}
