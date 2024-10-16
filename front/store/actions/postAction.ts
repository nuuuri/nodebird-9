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
} as const;

export const loadPostRequestAction = () => ({
  type: PostActionType.LOAD_POST_REQUEST,
});

export const loadPostSuccessAction = (value: Post[]) => ({
  type: PostActionType.LOAD_POST_SUCCESS,
  payload: value,
});

export const loadPostFailureAction = (error: any) => ({
  type: PostActionType.LOAD_POST_FAILURE,
  error,
});

export const addPostRequestAction = (value: Post) => ({
  type: PostActionType.ADD_POST_REQUEST,
  payload: value,
});

export const addPostSuccessAction = (value: Post) => ({
  type: PostActionType.ADD_POST_SUCCESS,
  payload: value,
});

export const addPostFailureAction = (error: any) => ({
  type: PostActionType.ADD_POST_FAILURE,
  error,
});

export const addCommentRequestAction = (value: {
  postId: number;
  comment: Comment;
}) => ({
  type: PostActionType.ADD_COMMENT_REQUEST,
  payload: value,
});

export const addCommentSuccessAction = (value: {
  postId: number;
  comment: Comment;
}) => ({
  type: PostActionType.ADD_COMMENT_SUCCESS,
  payload: value,
});

export const addCommentFailureAction = (error: any) => ({
  type: PostActionType.ADD_COMMENT_FAILURE,
  error,
});

export type PostAction =
  | ReturnType<typeof loadPostRequestAction>
  | ReturnType<typeof loadPostSuccessAction>
  | ReturnType<typeof loadPostFailureAction>
  | ReturnType<typeof addPostRequestAction>
  | ReturnType<typeof addPostSuccessAction>
  | ReturnType<typeof addPostFailureAction>
  | ReturnType<typeof addCommentRequestAction>
  | ReturnType<typeof addCommentSuccessAction>
  | ReturnType<typeof addCommentFailureAction>;
