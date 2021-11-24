import {Switch, Route, Redirect} from 'react-router-dom';
import './App.scss';
import Header from "./components/Header/Header";
import {useContext} from "react";
import {AuthContext} from "./store/auth/auth-context";
import Login from "./pages/Login/Login";
import Posts from "./pages/Posts/Posts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PostDetails from "./pages/PostDetails/PostDetails";

export interface MessageProp {
  message: string;
}

function App() {
  const authContext = useContext(AuthContext);

  const MESSAGE = "Hello from";
  console.log(`${MESSAGE} App`);

  const isAuthenticated = authContext.isAuthenticated;
  return (
      <div className="App">
        <Header message={MESSAGE} />
        <main>
          <Switch>
            <Route exact path="/" render={() => isAuthenticated ? <Redirect to={{pathname: "/posts"}} /> : <Login message={MESSAGE}/>} />
            <ProtectedRoute exact path="/posts" render={() => <Posts message={MESSAGE} />} isAuthenticated={isAuthenticated} />
            <ProtectedRoute exact path="/post/:id" render={() => <PostDetails message={MESSAGE} />} isAuthenticated={isAuthenticated} />
          </Switch>
        </main>
      </div>
  );
}

export default App;