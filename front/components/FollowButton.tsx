import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';

import { Post } from '@/types/Post';

import {
  followRequestAction,
  unfollowRequestAction,
} from '@/store/actions/userAction';
import { RootState } from '@/store/reducers';

interface FollowButtonProps {
  post: Post;
}

export default function FollowButton({ post }: FollowButtonProps) {
  const { me, followLoading, unfollowLoading } = useSelector(
    (state: RootState) => state.user
  );

  const isFollowing = me?.Followings.find((v) => v.email === post.User.email);

  const dispatch = useDispatch();

  const onClickButton = () => {
    if (isFollowing) {
      dispatch(unfollowRequestAction({ email: post.User.email }));
    } else {
      dispatch(
        followRequestAction({
          email: post.User.email,
          nickname: post.User.nickname,
        })
      );
    }
  };

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
}
