import React, {useReducer} from 'react';
import {PostItem} from "../../models/post-item";
import {PostComment} from "../../models/post-comment";
import {User} from "../../models/user";

enum ActionTypes {
  LOAD_DATA_START = 'LOAD_DATA_START',
  LOAD_POSTS_AND_USERS_SUCCESS = 'LOAD_POSTS_AND_USERS_SUCCESS',
  LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
}

interface LoadDataStartAction {
  type: ActionTypes.LOAD_DATA_START;
}

interface LoadPostsAndUsersAction {
  type: ActionTypes.LOAD_POSTS_AND_USERS_SUCCESS;
  payload: PostItem[];
}

interface LoadCommentsAction {
  type: ActionTypes.LOAD_COMMENTS_SUCCESS;
  payload: PostComment[];
}

type Action = LoadDataStartAction | LoadPostsAndUsersAction | LoadCommentsAction;

interface IPostsState {
  posts: PostItem[];
  comments: PostComment[];
  loading: boolean;
  error: any;
}

const initialPostsState: IPostsState = {
  posts: [],
  comments: [],
  loading: false,
  error: null
};

const postsReducer = (state: IPostsState = initialPostsState, action: Action) => {
  switch (action.type) {
    case ActionTypes.LOAD_DATA_START: {
      return {...state, loading: true};
    }
    case ActionTypes.LOAD_POSTS_AND_USERS_SUCCESS: {
      return {...state, posts: action.payload, loading: false};
    }
    case ActionTypes.LOAD_COMMENTS_SUCCESS: {
      return {...state, comments: action.payload, loading: false};
    }
  }
  return state;
}

export const PostsContext = React.createContext({
  posts: initialPostsState.posts,
  comments: initialPostsState.comments,
  loading: initialPostsState.loading,
  error: initialPostsState.error,
  onLoadData: () => {},
  onLoadComments: (id: number) => {console.log(id)}
});

const PostsContextProvider = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(postsReducer, initialPostsState);

  const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
  const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
  const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments?postId=';

  const loadDataHandler = async () => {
    dispatch({type: ActionTypes.LOAD_DATA_START});
    try {
      const postsResponse = await fetch(POSTS_URL);
      const postsData = await postsResponse.json();

      const usersResponse = await fetch(USERS_URL);
      const usersData = await usersResponse.json();

      const postsList = postsData.map((post: PostItem) => {
        return {
          userId: post.userId,
          user: usersData.filter((user: User) => user.id === post.userId)[0],
          id: post.id,
          title: post.title,
          body: post.body
        } as PostItem;
      })

      dispatch({type: ActionTypes.LOAD_POSTS_AND_USERS_SUCCESS, payload: postsList});
    } catch (e) {
      console.log(e);
    }
  }

  const loadCommentsHandler = async (id: number) => {
    dispatch({type: ActionTypes.LOAD_DATA_START});
    try {
      const commentsResponse = await fetch(COMMENTS_URL + id);
      const commentsData = await commentsResponse.json();
      dispatch({type: ActionTypes.LOAD_COMMENTS_SUCCESS, payload: commentsData});
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <PostsContext.Provider value={{
          posts: state.posts,
          comments: state.comments,
          loading: state.loading,
          error: state.error,
          onLoadData: loadDataHandler,
          onLoadComments: loadCommentsHandler
      }}>
        {children}
      </PostsContext.Provider>
  );
};

export default PostsContextProvider;