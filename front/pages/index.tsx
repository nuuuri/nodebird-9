import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { END } from 'redux-saga';

import AppLayout from '@/components/AppLayout';
import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';

import {
  loadPostRequestAction,
  PostActionType,
} from '@/store/actions/postAction';
import { UserActionType } from '@/store/actions/userAction';
import wrapper from '@/store/configureStore';
import { RootState } from '@/store/reducers';

export default function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetPostError } =
    useSelector((state: RootState) => state.post);

  // useEffect(() => {
  //   dispatch(loadMyInfoRequestAction());
  //   dispatch(loadPostRequestAction({ lastId: 0 }));
  // }, [dispatch]);

  useEffect(() => {
    const onScroll = () => {
      console.log(
        window.scrollY,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight
      );

      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPostRequestAction({ lastId }));
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading, dispatch]);

  useEffect(() => {
    if (retweetPostError) {
      alert(retweetPostError);
    }
  }, [retweetPostError]);

  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch({
      type: UserActionType.LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: PostActionType.LOAD_POST_REQUEST,
      payload: { lastId: 0 },
    });

    // REQUEST를 보낸 후 종료하지 않고, SUCCESS가 될 때까지 기다림
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
