import React, {useContext, useState} from 'react';
import classes from './Posts.module.scss';
import {PostsContext} from "../../store/posts/posts-context";
import {PostsHelper} from "../../helpers/posts-helper";
import {MessageProp} from "../../App";
import PostItem from "../../components/PostItem/PostItem";

const Posts: React.FunctionComponent<MessageProp> = ({message}) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectInput, setSelectInput] = useState('All authors')
  const {posts, loading, onLoadComments} = useContext(PostsContext);

  console.log(`${message} Posts`);

  const viewPostDetailsHandler = (id: number) => {
    onLoadComments(id);
  }
  const filteredItems = PostsHelper.getFilteredPostItems(posts, searchInput, selectInput);
  const selectOptions = PostsHelper.getFilterByOptions(posts);

  return (
      <>
        {loading && <p className={classes.InfoText}>Loading...</p>}
        {posts.length > 0 && (
            <div className={classes.Posts}>
              <div className={classes.PostsFilter}>
                <input type="text"
                       value={searchInput}
                       placeholder="Search by title..."
                       onChange={(e) => setSearchInput(e.target.value)}/>
                <select value={selectInput} onChange={(e) => setSelectInput(e.target.value)}>
                  {selectOptions.map((option?: string) => <option value={option} key={option}>{option}</option>)}
                </select>

              </div>
              {filteredItems.length === 0 && <p className={classes.InfoText}>No results found...</p>}
              {filteredItems.length > 0 && (
                  <ul className={classes.PostsList}>
                    {filteredItems.map(item => (
                        <PostItem key={item.id} message={message}>
                          <PostItem.Author message={message}>{item.user?.name}</PostItem.Author>
                          <PostItem.Title message={message}>{item.title}</PostItem.Title>
                          <PostItem.Body message={message}>{item.body}</PostItem.Body>
                          <PostItem.Button message={message} to={`/post/${item.id}`}
                                           onClick={() => viewPostDetailsHandler(item.id)}>
                            View post details
                          </PostItem.Button>
                        </PostItem>
                    ))}
                  </ul>
              )}
            </div>
        )}
      </>
  );
}

export default Posts;