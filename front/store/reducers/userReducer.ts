import { produce } from 'immer';

import { Me, User } from '@/types/User';

import { UserAction, UserActionType } from '../actions/userAction';

interface State {
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: string;
  loadUserLoading: boolean;
  loadUserDone: boolean;
  loadUserError: string;
  isLoggedIn: boolean;
  isLoggingIn: boolean; // 로그인 시도 중
  isLoggingOut: boolean; // 로그아웃 시도 중
  loginError: string;
  signUpLoading: boolean; // 회원가입 시도 중
  signUpDone: boolean;
  signUpError: string;
  followLoading: boolean; // 팔로잉 시도 중
  followDone: boolean;
  followError: string;
  unfollowLoading: boolean; // 언팔로잉 시도 중
  unfollowDone: boolean;
  unfollowError: string;
  removeFollowerLoading: boolean;
  removeFollowerDone: boolean;
  removeFollowerError: string;
  changeNicknameLoading: boolean; // 닉네임 변경 시도 중
  changeNicknameDone: boolean;
  changeNicknameError: string;
  me: Me;
  userInfo: User;
}

const initialState: State = {
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  signUpLoading: false,
  loginError: null,
  signUpDone: false,
  signUpError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  userInfo: null,
};

const userReducer = (state: State = initialState, action: UserAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UserActionType.LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case UserActionType.LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.isLoggedIn = true;
        draft.me = action.payload;
        break;
      case UserActionType.LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case UserActionType.LOAD_USER_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case UserActionType.LOAD_USER_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.isLoggedIn = true;
        draft.userInfo = action.payload;
        break;
      case UserActionType.LOAD_USER_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
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
        draft.loginError = action.error;
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
        draft.loginError = action.error;
        break;
      case UserActionType.SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case UserActionType.SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case UserActionType.SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case UserActionType.FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        break;
      case UserActionType.FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ ...action.payload });
        break;
      case UserActionType.FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followDone = false;
        draft.followError = action.error;
        break;
      case UserActionType.UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        break;
      case UserActionType.UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.payload.id
        );
        break;
      case UserActionType.UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowDone = false;
        draft.unfollowError = action.error;
        break;
      case UserActionType.REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true;
        draft.removeFollowerDone = false;
        break;
      case UserActionType.REMOVE_FOLLOWER_SUCCESS:
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = true;
        draft.me.Followers = draft.me.Followers.filter(
          (v) => v.id !== action.payload.id
        );
        break;
      case UserActionType.REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = false;
        draft.removeFollowerError = action.error;
        break;
      case UserActionType.CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        break;
      case UserActionType.CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.me.nickname = action.payload.nickname;
        break;
      case UserActionType.CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = action.error;
        break;
      case UserActionType.ADD_POST_TO_ME:
        draft.me.Posts.unshift(action.payload);
        break;
      case UserActionType.REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter(
          (v) => v.id !== action.payload.PostId
        );
        break;
      default:
        return state;
    }
  });

export default userReducer;
