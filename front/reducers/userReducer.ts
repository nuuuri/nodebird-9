interface State {
  isLoggedIn: boolean;
  me: any;
  signUpData: {};
  loginData: {};
}

const initialState: State = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

const ActionType = {
  LOG_IN: "LOG_IN",
  LOG_OUT: "LOG_OUT",
} as const;

export const loginAction = (value: any) => {
  return {
    type: ActionType.LOG_IN,
    payload: value,
  };
};

export const logoutAction = () => {
  return { type: ActionType.LOG_OUT };
};

type Action = ReturnType<typeof loginAction> | ReturnType<typeof logoutAction>;

const userReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        me: action.payload,
      };
    case ActionType.LOG_OUT:
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
