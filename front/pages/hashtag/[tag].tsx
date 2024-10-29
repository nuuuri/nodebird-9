import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';

import { loadHashtagPostsRequestAction } from '@/store/actions/postAction';
import { loadMyInfoRequestAction } from '@/store/actions/userAction';
import { RootState } from '@/store/reducers';

export default function Hashtag() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadHashtagPostsLoading } = useSelector(
    (state: RootState) => state.post
  );

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadHashtagPostsLoading) {
          dispatch(
            loadHashtagPostsRequestAction({
              hashtag: tag.toString(),
              lastId:
                mainPosts[mainPosts.length - 1] &&
                mainPosts[mainPosts.length - 1].id,
            })
          );
          //   dispatch({
          //     type: LOAD_HASHTAG_POSTS_REQUEST,
          //     lastId:
          //       mainPosts[mainPosts.length - 1] &&
          //       mainPosts[mainPosts.length - 1].id,
          //     data: tag,
          //   });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadHashtagPostsLoading, tag, dispatch]);

  return (
    <AppLayout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log(context);
    const cookie = context.req ? context.req.headers.cookie : '';
    console.log(context);
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadMyInfoRequestAction());
    context.store.dispatch(
      loadHashtagPostsRequestAction({ hashtag: context.params.tag.toString() })
    );
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
