export const initialState = {
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
          src: "",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "댓글입니당",
        },
        {
          User: {
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

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: "nuuuri",
  },
  content: "두 번째 게시글입니다",
  Images: [],
  Comments: [],
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: "ADD_POST",
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export type PostState = ReturnType<typeof postReducer>;
