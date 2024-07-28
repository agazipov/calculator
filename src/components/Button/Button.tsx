import React from 'react';
import * as styles from './style.module.scss';

interface ButtonProps {
  label: string;
  style?: string;
  onClick: (label: string) => void;
}

const Button: React.FC<ButtonProps> = ({ label, style, onClick }) => {
  return (
    <button className={[styles.button, style].join(' ')} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default Button;