import type { Post } from '@/types/Post';

import { PostAction, PostActionType } from '../actions/postAction';

interface State {
  mainPosts: Post[];
  imagePaths: string[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: any;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: any;
}

const initialState: State = {
  mainPosts: [
    {
      id: 1,
      User: {
        email: 'sbfl125@gmail.com',
        nickname: 'nuuuri',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Comments: [
        {
          User: {
            email: 'nero@gmail.com',
            nickname: 'nero',
          },
          content: '댓글입니당',
        },
        {
          User: {
            email: 'nuuuri@gmail.com',
            nickname: '박누리',
          },
          content: '우왕!',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
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
    case PostActionType.ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case PostActionType.ADD_COMMENT_SUCCESS:
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.payload.postId
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [action.payload.comment, ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
        addCommentError: null,
      };
    case PostActionType.ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default postReducer;
