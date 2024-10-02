import { useCallback } from "react";
import { useSelector } from "react-redux";

import { Button, Form, Input } from "antd";

import { RootState } from "@/reducers";

import type { Post } from "@/types/Post";

import { useInput } from "@/utils/useInput";

interface CommentFormProps {
  post: Post;
}

export default function CommentForm({ post }: CommentFormProps) {
  const id = useSelector((state: RootState) => state.user.me?.id);

  const { value: commentText, handler: onChangeCommentText } = useInput("");

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [post.id, commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ position: "absolute", right: 0, bottom: -40 }}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
}
