import React, {ButtonHTMLAttributes} from 'react';
import classes from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  message: string;
  outline?: boolean;
  secondaryColor?: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const {children, outline, secondaryColor, ...restProps} = props;
  const btnClasses = `${classes.Button} ${secondaryColor ? classes.SecondaryColor : classes.PrimaryColor} ${outline ? classes.Outline : ''}`

  console.log(`${props.message} Button`);
  return (
      <button className={btnClasses} {...restProps}>
        {children}
      </button>
  );
};

export default Button;