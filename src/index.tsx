import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import AuthContextProvider from "./store/auth/auth-context";
import PostsContextProvider from "./store/posts/posts-context";

ReactDOM.render(
    <AuthContextProvider>
      <BrowserRouter>
        <PostsContextProvider>
          <App />
        </PostsContextProvider>
      </BrowserRouter>
    </AuthContextProvider>,
    document.getElementById('root')
);