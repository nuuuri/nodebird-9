import { faker } from '@faker-js/faker';
import { produce } from 'immer';
import shortId from 'shortid';

import type { Post } from '@/types/Post';

import { PostAction, PostActionType } from '../actions/postAction';

interface State {
  mainPosts: Post[];
  imagePaths: string[];
  hasMorePosts: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: any;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: any;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: any;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: any;
}

const initialState: State = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const generateDummyPost = (count: number) =>
  initialState.mainPosts.concat(
    Array(count)
      .fill({})
      .map(() => ({
        id: shortId.generate(),
        content: faker.lorem.paragraph(),
        User: {
          email: faker.internet.email(),
          nickname: faker.internet.userName(),
        },
        Comments: [
          {
            id: shortId.generate(),
            User: {
              email: faker.internet.email(),
              nickname: faker.internet.userName(),
            },
            content: faker.lorem.sentence(),
          },
        ],
        Images: [{ src: faker.image.imageUrl() }],
      }))
  );

const postReducer = (state: State = initialState, action: PostAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PostActionType.LOAD_POST_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case PostActionType.LOAD_POST_SUCCESS:
        draft.mainPosts = action.payload.concat(draft.mainPosts);
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      case PostActionType.LOAD_POST_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = false;
        draft.loadPostsError = action.error;
        break;
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
      case PostActionType.REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case PostActionType.REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.payload.postId
        );
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case PostActionType.REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostDone = false;
        draft.removePostError = action.error;
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
