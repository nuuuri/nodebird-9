import Link from 'next/link';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Button, Card } from 'antd';

import { logoutRequestAction } from '@/store/actions/userAction';
import { RootState } from '@/store/reducers';

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
          <Link href={`/user/${me.id}`}>
            <a>짹짹</a>
          </Link>
          <br />
          {me.Posts.length}
        </div>,
        <div key="following">
          <Link href="/profile">
            <a>팔로잉</a>
          </Link>
          <br />
          {me.Followings.length}
        </div>,
        <div key="follower">
          <Link href="/profile">
            <a>팔로워</a>
          </Link>
          <br />
          {me.Followers.length}
        </div>,
      ]}>
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`}>
            <a>
              <Avatar>{me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={isLoggingOut}>
        로그아웃
      </Button>
    </Card>
  );
}
