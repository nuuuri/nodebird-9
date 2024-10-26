import Head from 'next/head';
import { useSelector } from 'react-redux';

import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';

import AppLayout from '@/components/AppLayout';

import { UserActionType } from '@/store/actions/userAction';
import wrapper from '@/store/configureStore';
import { RootState } from '@/store/reducers';

export default function About() {
  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>Nuuuri | NodeBird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}>
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
}

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: UserActionType.LOAD_USER_REQUEST,
    payload: { UserId: 1 },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
