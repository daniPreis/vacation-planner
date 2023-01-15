import React from 'react';
import './Button.scss';

interface Props {
  label: string;
}

const Button = (props: Props) => {
  return (
    <button className={'default-button'}>
      {props.label}
    </button>
  );
};

export default Button;
