import React, {useContext} from 'react';
import {AuthContext} from "../../store/auth/auth-context";
import {PostsContext} from "../../store/posts/posts-context";
import {MessageProp} from "../../App";
import Button from "../../components/Button/Button";


const Login: React.FunctionComponent<MessageProp> = ({message}) => {
  const authContext = useContext(AuthContext);
  const postsContext = useContext(PostsContext);

  console.log(`${message} Login`);

  const loginHandler = () => {
    authContext.onLogin();
    postsContext.onLoadData();
  }
  return (
      <div style={{marginTop: '15rem', textAlign: 'center'}}>
        <h1>Welcome to Postbook!</h1>
        <Button message={message} onClick={loginHandler}>Log in</Button>
      </div>
  );
}

export default Login;