import { produce } from 'immer';
import shortId from 'shortid';

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
      id: shortId.generate(),
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
          id: shortId.generate(),
          User: {
            email: 'nero@gmail.com',
            nickname: 'nero',
          },
          content: '댓글입니당',
        },
        {
          id: shortId.generate(),
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

const postReducer = (state: State = initialState, action: PostAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PostActionType.ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case PostActionType.ADD_POST_SUCCESS:
        draft.mainPosts = [action.payload, ...state.mainPosts];
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case PostActionType.ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostDone = false;
        draft.addPostError = action.error;
        break;
      case PostActionType.ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case PostActionType.ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find(
          (v) => v.id === action.payload.postId
        );
        post.Comments.unshift(action.payload.comment);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      // const postIndex = state.mainPosts.findIndex(
      //   (v) => v.id === action.payload.postId
      // );
      // const post = { ...state.mainPosts[postIndex] };
      // post.Comments = [action.payload.comment, ...post.Comments];
      // const mainPosts = [...state.mainPosts];
      // mainPosts[postIndex] = post;

      // return {
      //   ...state,
      //   mainPosts,
      //   addCommentLoading: false,
      //   addCommentDone: true,
      // };
      case PostActionType.ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentDone = false;
        draft.addCommentError = action.error;
        break;
      default:
        return state;
    }
  });

export default postReducer;
