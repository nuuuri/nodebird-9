import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Button, Card } from "antd";

import { logoutRequestAction } from "@/store/actions/userAction";
import { RootState } from "@/store/reducers";

export default function UserProfile() {
  const { isLoggingOut, me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, [dispatch]);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {me.Posts.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={isLoggingOut}>
        로그아웃
      </Button>
    </Card>
  );
}
