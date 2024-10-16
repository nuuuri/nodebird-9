export const UserActionType = {
  LOG_IN_REQUEST: 'LOG_IN_REQUEST',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE: 'LOG_IN_FAILURE',
  LOG_OUT_REQUEST: 'LOG_OUT_REQUEST',
  LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
  LOG_OUT_FAILURE: 'LOG_OUT_FAILURE',
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
} as const;

export const loginRequestAction = (value: {
  email: string;
  password: string;
}) => {
  return {
    type: UserActionType.LOG_IN_REQUEST,
    payload: value,
  };
};

export const loginSuccessAction = (value: any) => {
  return {
    type: UserActionType.LOG_IN_SUCCESS,
    payload: value,
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

export const signUpRequestAction = (value: {
  email: string;
  password: string;
}) => {
  return {
    type: UserActionType.LOG_IN_REQUEST,
    payload: value,
  };
};

export const signUpSuccessAction = (value: {
  email: string;
  password: string;
}) => {
  return {
    type: UserActionType.LOG_IN_SUCCESS,
    payload: value,
  };
};

export const signUpFailureAction = (error: any) => {
  return {
    type: UserActionType.LOG_IN_FAILURE,
    error,
  };
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
  | ReturnType<typeof signUpFailureAction>;
