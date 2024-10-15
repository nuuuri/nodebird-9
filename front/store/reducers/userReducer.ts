import { UserAction, UserActionType } from "../actions/userAction";

interface State {
  isLoggedIn: boolean;
  isLoggingIn: boolean; // 로그인 시도 중
  isLoggingOut: boolean; // 로그아웃 시도 중
  me: any;
  signUpData: {};
  loginData: {};
}

const initialState: State = {
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  me: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data: { id: string; password: string }) => ({
  ...data,
  nickname: "nuuuri",
  Posts: [],
  Followings: [],
  Followers: [],
});

const userReducer = (state: State = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionType.LOG_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        isLoggedIn: false,
      };
    case UserActionType.LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: dummyUser(action.payload),
      };
    case UserActionType.LOG_IN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    case UserActionType.LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        isLoggingIn: true,
      };
    case UserActionType.LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    case UserActionType.LOG_OUT_FAILURE:
      return {
        ...state,
        isLoggingOut: true,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default userReducer;
