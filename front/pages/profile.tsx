import Head from 'next/head';
import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { backUrl } from 'config/config';
import { END } from 'redux-saga';
import useSWR from 'swr';

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

import { UserActionType } from '@/store/actions/userAction';
import wrapper from '@/store/configureStore';
import { RootState } from '@/store/reducers';

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

export default function Profile() {
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { me } = useSelector((state: RootState) => state.user);

  const { data: followersData, error: followerError } = useSWR(
    `${backUrl}/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { data: followingsData, error: followingError } = useSWR(
    `${backUrl}/user/followings?limit=${followingsLimit}`,
    fetcher
  );

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/').catch(() => {});
    }
  }, [me]);

  if (!me) {
    return null;
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return '팔로잉/팔로워 로딩 중 에러가 발생합니다.';
  }

  return (
    <AppLayout>
      <Head>
        <title>프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉 목록"
        data={followingsData}
        onClickMore={loadMoreFollowings}
        loading={!followingsData && !followingError}
      />
      <FollowList
        header="팔로워 목록"
        data={followersData}
        onClickMore={loadMoreFollowers}
        loading={!followersData && !followerError}
      />
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // 쿠키 설정
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: UserActionType.LOAD_MY_INFO_REQUEST,
    });

    // REQUEST를 보낸 후 종료하지 않고, SUCCESS가 될 때까지 기다림
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
