import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Card } from 'antd';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '@/components/AppLayout';
import PostCard from '@/components/PostCard';

import { loadUserPostsRequestAction } from '@/store/actions/postAction';
import {
  loadMyInfoRequestAction,
  loadUserRequestAction,
} from '@/store/actions/userAction';
import wrapper from '@/store/configureStore';
import { RootState } from '@/store/reducers';

export default function User() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { mainPosts, hasMorePosts, loadUserPostsLoading } = useSelector(
    (state: RootState) => state.post
  );

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadUserPostsLoading) {
          dispatch(
            loadUserPostsRequestAction({
              UserId: +id,
              lastId:
                mainPosts[mainPosts.length - 1] &&
                mainPosts[mainPosts.length - 1].id,
            })
          );
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, id, loadUserPostsLoading, dispatch]);

  if (!userInfo) return <div>유저를 찾을 수 없습니다.</div>;

  return (
    <AppLayout>
      <Head>
        <title>{userInfo.nickname}님의 글</title>
        <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
        <meta
          property="og:description"
          content={`${userInfo.nickname}님의 게시글`}
        />
        <meta property="og:image" content="https://nodebird.com/favicon.ico" />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      {userInfo && (
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
          />
        </Card>
      )}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
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

    context.store.dispatch(loadMyInfoRequestAction());
    context.store.dispatch(
      loadUserRequestAction({ UserId: +context.params.id })
    );
    context.store.dispatch(
      loadUserPostsRequestAction({ UserId: +context.params.id })
    );

    // REQUEST를 보낸 후 종료하지 않고, SUCCESS가 될 때까지 기다림
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

    console.log('getState', context.store.getState().post.mainPosts);
  }
);

// getStaticProps는 반드시 getStaticPaths와 함께 사용해야 함
// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { id: '1' } },
//       { params: { id: '2' } },
//       { params: { id: '3' } },
//     ],
//     fallback: false,
//   };
// }
