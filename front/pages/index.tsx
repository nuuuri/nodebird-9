import { useSelector } from 'react-redux';

import AppLayout from '@/components/AppLayout';
import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';

import { RootState } from '@/store/reducers';

export default function Home() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { mainPosts } = useSelector((state: RootState) => state.post);

  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}
