import type { Post } from "@/types/Post";

interface State {
  mainPosts: Post[];
  imagePaths: string[];
  postAdded: boolean;
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
  postAdded: false,
};

const ActionType = {
  ADD_POST: "ADD_POST",
  REMOVE_POST: "REMOVE_POST",
} as const;

export const addPost = (value: Post) => ({
  type: ActionType.ADD_POST,
  payload: value,
});

type Action = ReturnType<typeof addPost>;

const postReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_POST:
      return {
        ...state,
        mainPosts: [action.payload, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default postReducer;
