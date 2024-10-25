import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '@/components/AppLayout';
import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';

import { loadPostRequestAction } from '@/store/actions/postAction';
import { loadMyInfoRequestAction } from '@/store/actions/userAction';
import { RootState } from '@/store/reducers';

export default function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetPostError } =
    useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(loadMyInfoRequestAction());
    dispatch(loadPostRequestAction());
  }, [dispatch]);

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
          dispatch(loadPostRequestAction());
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, dispatch]);

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
