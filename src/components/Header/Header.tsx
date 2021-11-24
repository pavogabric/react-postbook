import React, {useContext} from 'react';
import classes from './Header.module.scss';
import {AuthContext} from "../../store/auth/auth-context";
import {MessageProp} from "../../App";
import Button from "../Button/Button";

const Header: React.FunctionComponent<MessageProp> = ({message}) => {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;

  console.log(`${message} Header`);

  return (
      <header className={`${classes.Header}`}>
        <div className={`${classes.HeaderContainer} ${isAuthenticated ? classes.WithButton : ''}`}>
          <h1 className={classes.HeaderTitle}>
            Postbook
          </h1>
          {isAuthenticated && <Button message={message} secondaryColor={true} outline={true} onClick={authContext.onLogout}>Log out</Button>}
        </div>
      </header>
  );
};

export default Header;