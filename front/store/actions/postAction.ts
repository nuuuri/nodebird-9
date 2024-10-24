import { Comment } from '@/types/Comment';
import { Post } from '@/types/Post';

export const PostActionType = {
  LOAD_POST_REQUEST: 'LOAD_POST_REQUEST',
  LOAD_POST_SUCCESS: 'LOAD_POST_SUCCESS',
  LOAD_POST_FAILURE: 'LOAD_POST_FAILURE',
  ADD_POST_REQUEST: 'ADD_POST_REQUEST',
  ADD_POST_SUCCESS: 'ADD_POST_SUCCESS',
  ADD_POST_FAILURE: 'ADD_POST_FAILURE',
  REMOVE_POST_REQUEST: 'REMOVE_POST_REQUEST',
  REMOVE_POST_SUCCESS: 'REMOVE_POST_SUCCESS',
  REMOVE_POST_FAILURE: 'REMOVE_POST_FAILURE',
  ADD_COMMENT_REQUEST: 'ADD_COMMENT_REQUEST',
  ADD_COMMENT_SUCCESS: 'ADD_COMMENT_SUCCESS',
  ADD_COMMENT_FAILURE: 'ADD_COMMENT_FAILURE',
  LIKE_POST_REQUEST: 'LIKE_POST_REQUEST',
  LIKE_POST_SUCCESS: 'LIKE_POST_SUCCESS',
  LIKE_POST_FAILURE: 'LIKE_POST_FAILURE',
  UNLIKE_POST_REQUEST: 'UNLIKE_POST_REQUEST',
  UNLIKE_POST_SUCCESS: 'UNLIKE_POST_SUCCESS',
  UNLIKE_POST_FAILURE: 'UNLIKE_POST_FAILURE',
} as const;

export const loadPostRequestAction = () => ({
  type: PostActionType.LOAD_POST_REQUEST,
});

export const loadPostSuccessAction = (payload: Post[]) => ({
  type: PostActionType.LOAD_POST_SUCCESS,
  payload,
});

export const loadPostFailureAction = (error: any) => ({
  type: PostActionType.LOAD_POST_FAILURE,
  error,
});

export const addPostRequestAction = (
  payload: Pick<Post, 'content' | 'Images'>
) => ({
  type: PostActionType.ADD_POST_REQUEST,
  payload,
});

export const addPostSuccessAction = (payload: Post) => ({
  type: PostActionType.ADD_POST_SUCCESS,
  payload,
});

export const addPostFailureAction = (error: any) => ({
  type: PostActionType.ADD_POST_FAILURE,
  error,
});

export const removePostRequestAction = (payload: { PostId: number }) => ({
  type: PostActionType.REMOVE_POST_REQUEST,
  payload,
});

export const removePostSuccessAction = (payload: { PostId: number }) => ({
  type: PostActionType.REMOVE_POST_SUCCESS,
  payload,
});

export const removePostFailureAction = (error: any) => ({
  type: PostActionType.REMOVE_POST_FAILURE,
  error,
});

export const addCommentRequestAction = (payload: {
  PostId: number;
  content: string;
}) => ({
  type: PostActionType.ADD_COMMENT_REQUEST,
  payload,
});

export const addCommentSuccessAction = (payload: Comment) => ({
  type: PostActionType.ADD_COMMENT_SUCCESS,
  payload,
});

export const addCommentFailureAction = (error: any) => ({
  type: PostActionType.ADD_COMMENT_FAILURE,
  error,
});

export const likePostRequestAction = (payload: { PostId: number }) => ({
  type: PostActionType.LIKE_POST_REQUEST,
  payload,
});

export const likePostSuccessAction = (payload: {
  PostId: number;
  UserId: number;
}) => ({
  type: PostActionType.LIKE_POST_SUCCESS,
  payload,
});

export const likePostFailureAction = (error: any) => ({
  type: PostActionType.LIKE_POST_FAILURE,
  error,
});
export const unlikePostRequestAction = (payload: { PostId: number }) => ({
  type: PostActionType.UNLIKE_POST_REQUEST,
  payload,
});

export const unlikePostSuccessAction = (payload: {
  PostId: number;
  UserId: number;
}) => ({
  type: PostActionType.UNLIKE_POST_SUCCESS,
  payload,
});

export const unlikePostFailureAction = (error: any) => ({
  type: PostActionType.UNLIKE_POST_FAILURE,
  error,
});

export type PostAction =
  | ReturnType<typeof loadPostRequestAction>
  | ReturnType<typeof loadPostSuccessAction>
  | ReturnType<typeof loadPostFailureAction>
  | ReturnType<typeof addPostRequestAction>
  | ReturnType<typeof addPostSuccessAction>
  | ReturnType<typeof addPostFailureAction>
  | ReturnType<typeof removePostRequestAction>
  | ReturnType<typeof removePostSuccessAction>
  | ReturnType<typeof removePostFailureAction>
  | ReturnType<typeof addCommentRequestAction>
  | ReturnType<typeof addCommentSuccessAction>
  | ReturnType<typeof addCommentFailureAction>
  | ReturnType<typeof likePostRequestAction>
  | ReturnType<typeof likePostSuccessAction>
  | ReturnType<typeof likePostFailureAction>
  | ReturnType<typeof unlikePostRequestAction>
  | ReturnType<typeof unlikePostSuccessAction>
  | ReturnType<typeof unlikePostFailureAction>;
