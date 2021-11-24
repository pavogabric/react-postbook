import {ReactNode} from 'react';
import classes from './PostItem.module.scss';
import Button, {ButtonProps} from "../Button/Button";
import {Link} from "react-router-dom";
import {MessageProp} from "../../App";

interface Props extends MessageProp {
  children: ReactNode;
}

interface PostItemButtonProps extends ButtonProps {
  to: string;
  isBack?: boolean;
}

const PostItem = (props: Props) => {
  console.log(`${props.message} PostItem`)
  return (
      <article className={classes.PostListItem}>
        {props.children}
      </article>
  );
};

PostItem.Author = (props: Props) => {
  console.log(`${props.message} PostItem.Author`)
  return <span>{props.children}</span>;
}

PostItem.Title = (props: Props) => {
  console.log(`${props.message} PostItem.Title`)
  return <h3>{props.children}</h3>
}

PostItem.Body = (props: Props) => {
  console.log(`${props.message} PostItem.Body`)
  return <p>{props.children}</p>
}

PostItem.Button = (props: PostItemButtonProps) => {
  console.log(`${props.message} PostItem.Button`)
  const {to, onClick, ...restProps} = props;
  return <Link to={to}><Button onClick={onClick} {...restProps}>{props.children}</Button></Link>
}

export default PostItem;