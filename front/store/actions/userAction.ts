import { Post } from '@/types/Post';

export const UserActionType = {
  LOG_IN_REQUEST: 'LOG_IN_REQUEST',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE: 'LOG_IN_FAILURE',
  LOG_OUT_REQUEST: 'LOG_OUT_REQUEST',
  LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
  LOG_OUT_FAILURE: 'LOG_OUT_FAILURE',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
  FOLLOW_REQUEST: 'FOLLOW_REQUEST',
  FOLLOW_SUCCESS: 'FOLLOW_SUCCESS',
  FOLLOW_FAILURE: 'FOLLOW_FAILURE',
  UNFOLLOW_REQUEST: 'UNFOLLOW_REQUEST',
  UNFOLLOW_SUCCESS: 'UNFOLLOW_SUCCESS',
  UNFOLLOW_FAILURE: 'UNFOLLOW_FAILURE',
  ADD_POST_TO_ME: ' ADD_POST_TO_ME',
  REMOVE_POST_OF_ME: 'REMOVE_POST_OF_ME',
} as const;

export const loginRequestAction = (payload: {
  email: string;
  password: string;
}) => {
  return {
    type: UserActionType.LOG_IN_REQUEST,
    payload,
  };
};

export const loginSuccessAction = (payload: any) => {
  return {
    type: UserActionType.LOG_IN_SUCCESS,
    payload,
  };
};

export const loginFailureAction = (error: any) => {
  return {
    type: UserActionType.LOG_IN_FAILURE,
    error,
  };
};

export const logoutRequestAction = () => {
  return { type: UserActionType.LOG_OUT_REQUEST };
};

export const logoutSuccessAction = () => {
  return { type: UserActionType.LOG_OUT_SUCCESS };
};

export const logoutFailureAction = (error: any) => {
  return { type: UserActionType.LOG_OUT_FAILURE, error };
};

export const signUpRequestAction = (payload: {
  email: string;
  password: string;
  nickname: string;
}) => {
  return {
    type: UserActionType.SIGN_UP_REQUEST,
    payload,
  };
};

export const signUpSuccessAction = (payload: {
  email: string;
  password: string;
  nickname: string;
}) => {
  return {
    type: UserActionType.SIGN_UP_SUCCESS,
    payload,
  };
};

export const signUpFailureAction = (error: any) => {
  return {
    type: UserActionType.SIGN_UP_FAILURE,
    error,
  };
};

export const followRequestAction = (payload: {
  email: string;
  nickname: string;
}) => {
  return {
    type: UserActionType.FOLLOW_REQUEST,
    payload,
  };
};

export const followSuccessAction = (payload: {
  email: string;
  nickname: string;
}) => {
  return {
    type: UserActionType.FOLLOW_SUCCESS,
    payload,
  };
};

export const followFailureAction = (error: any) => {
  return {
    type: UserActionType.FOLLOW_FAILURE,
    error,
  };
};

export const unfollowRequestAction = (payload: { email: string }) => {
  return {
    type: UserActionType.UNFOLLOW_REQUEST,
    payload,
  };
};

export const unfollowSuccessAction = (payload: { email: string }) => {
  return {
    type: UserActionType.UNFOLLOW_SUCCESS,
    payload,
  };
};

export const unfollowFailureAction = (error: any) => {
  return {
    type: UserActionType.UNFOLLOW_FAILURE,
    error,
  };
};

export const addPostToMe = (payload: Post) => {
  return { type: UserActionType.ADD_POST_TO_ME, payload };
};

export const removePostOfMe = (payload: { postId: number }) => {
  return { type: UserActionType.REMOVE_POST_OF_ME, payload };
};

export type UserAction =
  | ReturnType<typeof loginRequestAction>
  | ReturnType<typeof loginSuccessAction>
  | ReturnType<typeof loginFailureAction>
  | ReturnType<typeof logoutRequestAction>
  | ReturnType<typeof logoutSuccessAction>
  | ReturnType<typeof logoutFailureAction>
  | ReturnType<typeof signUpRequestAction>
  | ReturnType<typeof signUpSuccessAction>
  | ReturnType<typeof signUpFailureAction>
  | ReturnType<typeof followRequestAction>
  | ReturnType<typeof followSuccessAction>
  | ReturnType<typeof followFailureAction>
  | ReturnType<typeof unfollowRequestAction>
  | ReturnType<typeof unfollowSuccessAction>
  | ReturnType<typeof unfollowFailureAction>
  | ReturnType<typeof addPostToMe>
  | ReturnType<typeof removePostOfMe>;
