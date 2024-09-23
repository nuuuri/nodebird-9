import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { userReducer } from "./user";
import { postReducer } from "./post";

export const rootReducer = combineReducers({
  index: (state: any = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user: userReducer,
  post: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
