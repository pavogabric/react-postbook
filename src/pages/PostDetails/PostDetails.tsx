import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {PostsContext} from "../../store/posts/posts-context";
import {PostsHelper} from "../../helpers/posts-helper";
import {MessageProp} from "../../App";
import PostItem from "../../components/PostItem/PostItem";
import {PostComment} from "../../models/post-comment";
import PostComments from "../../components/PostComments/PostComments";

interface RouteParams {
  id: string;
}

const PostDetails: React.FunctionComponent<MessageProp> = ({message}) => {
  const {id} = useParams<RouteParams>();
  const {posts, comments, loading} = useContext(PostsContext);

  console.log(`${message} PostDetails`);

  const selectedPost = PostsHelper.getSelectedPost(posts, +id);

  if (loading) {
    return <p>Loading...</p>
  }
  return (
      <PostItem message={message}>
        <PostItem.Author message={message}>{selectedPost.user?.name}</PostItem.Author>
        <PostItem.Title message={message}>{selectedPost.title}</PostItem.Title>
        <PostItem.Body message={message}>{selectedPost.body}</PostItem.Body>
        {comments.length > 0 && (
            <PostComments message={message}>
              <PostComments.Title message={message}>Comments:</PostComments.Title>
              {comments.map((comment: PostComment) => (
                  <PostComments.Item key={comment.id} message={message}>
                    <PostComments.Author message={message}>{comment.email}</PostComments.Author>
                    <PostComments.Body message={message}>{comment.body}</PostComments.Body>
                  </PostComments.Item>
              ))}
            </PostComments>
        )}
        <PostItem.Button message={message} to="/posts">Go back</PostItem.Button>
      </PostItem>
  );
};

export default PostDetails;