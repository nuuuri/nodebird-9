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

export const ActionType = {
  LOG_IN_REQUEST: "LOG_IN_REQUEST",
  LOG_IN_SUCCESS: "LOG_IN_SUCCESS",
  LOG_IN_FAILURE: "LOG_IN_FAILURE",
  LOG_OUT_REQUEST: "LOG_OUT_REQUEST",
  LOG_OUT_SUCCESS: "LOG_OUT_SUCCESS",
  LOG_OUT_FAILURE: "LOG_OUT_FAILURE",
} as const;

export const loginRequestAction = (value: any) => {
  return {
    type: ActionType.LOG_IN_REQUEST,
    payload: value,
  };
};

export const loginSuccessAction = (value: any) => {
  return {
    type: ActionType.LOG_IN_SUCCESS,
    payload: value,
  };
};

export const loginFailureAction = (value: any) => {
  return {
    type: ActionType.LOG_IN_FAILURE,
    payload: value,
  };
};

export const logoutRequestAction = () => {
  return { type: ActionType.LOG_OUT_REQUEST };
};

export const logoutSuccessAction = () => {
  return { type: ActionType.LOG_OUT_SUCCESS };
};

export const logoutFailureAction = () => {
  return { type: ActionType.LOG_OUT_FAILURE };
};

type Action =
  | ReturnType<typeof loginRequestAction>
  | ReturnType<typeof loginSuccessAction>
  | ReturnType<typeof loginFailureAction>
  | ReturnType<typeof logoutRequestAction>
  | ReturnType<typeof logoutSuccessAction>
  | ReturnType<typeof logoutFailureAction>;

const userReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOG_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case ActionType.LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        me: { ...action.payload, nickname: "nuuuri" },
      };
    case ActionType.LOG_IN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        me: action.payload,
      };
    case ActionType.LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default userReducer;
