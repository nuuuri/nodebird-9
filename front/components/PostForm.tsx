import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Form, Input } from "antd";

import { useInput } from "@/utils/useInput";

import { addPostRequestAction } from "@/store/actions/postAction";
import { RootState } from "@/store/reducers";

export default function PostForm() {
  const imageInput = useRef<HTMLInputElement>();
  const { imagePaths } = useSelector((state: RootState) => state.post);

  const {
    value: text,
    setValue: setText,
    handler: onChangeText,
  } = useInput("");

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
          id: 1,
          nickname: "nuuuri",
        },
        content: text.toString(),
        Images: [],
        Comments: [],
      })
    );
    setText("");
  }, [dispath, text, setText]);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input ref={imageInput} type="file" multiple hidden />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
        <div>
          {imagePaths.map((v) => (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={v} style={{ width: "200px" }} alt="v" />
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
