import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Comment, List, Popover } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

import type { Post } from '@/types/Post';

import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';

import {
  likePostRequestAction,
  removePostRequestAction,
  retweetPostRequestAction,
  unlikePostRequestAction,
} from '@/store/actions/postAction';
import { RootState } from '@/store/reducers';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { me } = useSelector((state: RootState) => state.user);
  const { removePostLoading } = useSelector((state: RootState) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const dispatch = useDispatch();

  const liked = post.Likers.find((v) => v.id === me?.id);

  const alertLoginError = useCallback(() => {
    if (!(me && me.id)) {
      alert('로그인이 필요합니다.');
    }
  }, [me]);

  const onLike = useCallback(() => {
    alertLoginError();
    dispatch(likePostRequestAction({ PostId: post.id }));
  }, [post.id, dispatch, alertLoginError]);

  const onUnLike = useCallback(() => {
    alertLoginError();
    dispatch(unlikePostRequestAction({ PostId: post.id }));
  }, [post.id, dispatch, alertLoginError]);

  const onToggleComment = useCallback(() => {
    alertLoginError();
    setCommentFormOpened((prev) => !prev);
  }, [alertLoginError]);

  const onRemovePost = useCallback(() => {
    alertLoginError();
    dispatch(removePostRequestAction({ PostId: post.id }));
  }, [post.id, dispatch, alertLoginError]);

  const onRetweetPost = useCallback(() => {
    alertLoginError();
    dispatch(retweetPostRequestAction({ PostId: post.id }));
  }, [post.id, dispatch, alertLoginError]);

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweetPost} />,
          liked ? (
            <HeartTwoTone
              twoToneColor={'#eb2f96'}
              key="heart"
              onClick={onUnLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <ButtonGroup>
                {me?.id && post.User.id === me?.id && (
                  <>
                    <Button>수정</Button>
                    <Button
                      color="danger"
                      loading={removePostLoading}
                      onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                )}
                <Button>신고</Button>
              </ButtonGroup>
            }>
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.Retweet && `${post.User.nickname}님이 리트윗하였습니다`}
        extra={me?.email && <FollowButton post={post} />}>
        {post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }>
            <Card.Meta
              avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
}
