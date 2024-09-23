export const initialState = {
  mainPosts: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export type PostState = ReturnType<typeof postReducer>;
