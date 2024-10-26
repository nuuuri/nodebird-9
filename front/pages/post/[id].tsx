import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '@/components/AppLayout';
import PostCard from '@/components/PostCard';

import { loadPostRequestAction } from '@/store/actions/postAction';
import { loadMyInfoRequestAction } from '@/store/actions/userAction';
import wrapper from '@/store/configureStore';
import { RootState } from '@/store/reducers';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state: RootState) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].srec
              : 'https://nodebird.com/favicon.ico'
          }
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      {singlePost && <PostCard post={singlePost} />}
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
      loadPostRequestAction({ PostId: +context.params.id })
    );

    // REQUEST를 보낸 후 종료하지 않고, SUCCESS가 될 때까지 기다림
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
