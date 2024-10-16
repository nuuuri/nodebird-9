import { produce } from 'immer';

import { User } from '@/types/User';

import { UserAction, UserActionType } from '../actions/userAction';

interface State {
  isLoggedIn: boolean;
  isLoggingIn: boolean; // 로그인 시도 중
  isLoggingOut: boolean; // 로그아웃 시도 중
  signUpLoading: boolean; // 회원가입 시도 중
  signUpDone: boolean;
  signUpError: any;
  me: User;
}

const initialState: State = {
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  me: null,
};

const userReducer = (state: State = initialState, action: UserAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UserActionType.LOG_IN_REQUEST:
        draft.isLoggingIn = true;
        draft.isLoggedIn = false;
        break;
      case UserActionType.LOG_IN_SUCCESS:
        draft.isLoggingIn = false;
        draft.isLoggedIn = true;
        draft.me = action.payload;
        break;
      case UserActionType.LOG_IN_FAILURE:
        draft.isLoggingIn = false;
        draft.isLoggedIn = false;
        break;
      case UserActionType.LOG_OUT_REQUEST:
        draft.isLoggingOut = true;
        draft.isLoggedIn = true;
        break;
      case UserActionType.LOG_OUT_SUCCESS:
        draft.isLoggingOut = false;
        draft.isLoggedIn = false;
        draft.me = null;
        break;
      case UserActionType.LOG_OUT_FAILURE:
        draft.isLoggingOut = true;
        draft.isLoggedIn = true;
        break;
      case UserActionType.ADD_POST_TO_ME:
        draft.me.Posts.unshift(action.payload);
        break;
      case UserActionType.REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter(
          (v) => v.id !== action.payload.postId
        );
        break;
      default:
        return state;
    }
  });

export default userReducer;
