import {ReactNode} from 'react';
import classes from './PostComments.module.scss';
import {MessageProp} from "../../App";

interface Props extends MessageProp {
  children: ReactNode;
}

const PostComments = (props: Props) => {
  console.log(`${props.message} PostComments`)
  return (
      <ul className={classes.PostComments}>
        {props.children}
      </ul>
  );
};

PostComments.Item = (props: Props) => {
  console.log(`${props.message} PostComments.Item`)
  return <li className={classes.PostCommentsItem}>{props.children}</li>;
}

PostComments.Title = (props: Props) => {
  console.log(`${props.message} PostComments.Title`)
  return <p className={classes.PostCommentsTitle}>{props.children}</p>
}

PostComments.Author = (props: Props) => {
  console.log(`${props.message} PostComments.Author`)
  return <span className={classes.PostCommentsAuthor}>{props.children}</span>;
}

PostComments.Body = (props: Props) => {
  console.log(`${props.message} PostComments.Body`)
  return <p className={classes.PostCommentsBody}>{props.children}</p>
}


export default PostComments;