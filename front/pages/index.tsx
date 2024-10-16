import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '@/components/AppLayout';
import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';

import { PostActionType } from '@/store/actions/postAction';
import { RootState } from '@/store/reducers';

export default function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { mainPosts } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch({
      type: PostActionType.LOAD_POST_REQUEST,
    });
  }, [dispatch]);

  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}
