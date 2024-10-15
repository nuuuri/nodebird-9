import type { Post } from "@/types/Post";

import { PostAction, PostActionType } from "../actions/postAction";

interface State {
  mainPosts: Post[];
  imagePaths: string[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: any;
}

const initialState: State = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "nuuuri",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
        },
      ],
      Comments: [
        {
          User: {
            id: 2,
            nickname: "nero",
          },
          content: "댓글입니당",
        },
        {
          User: {
            id: 3,
            nickname: "박누리",
          },
          content: "우왕!",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

const postReducer = (state: State = initialState, action: PostAction) => {
  switch (action.type) {
    case PostActionType.ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case PostActionType.ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [action.payload, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
        addPostError: null,
      };
    case PostActionType.ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: false,
        addPostError: action.error,
      };
    default:
      return state;
  }
};

export default postReducer;
