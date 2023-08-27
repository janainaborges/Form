import React from 'react';

interface ButtonProps {
  title: string;
  backgroundColor?: string;
  titleColor?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: any
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  backgroundColor = 'bg-blue-600',
  titleColor = 'text-white',
  size = 'medium',
  onClick,
  type 
}) => {
  let padding;
  switch (size) {
    case 'small':
      padding = 'px-2 py-1';
      break;
    case 'large':
      padding = 'px-8 py-4';
      break;
    default:
      padding = 'px-4 py-2';
  }

  return (
    <button
      onClick={onClick}
      className={`${padding} ${backgroundColor} ${titleColor} rounded-md hover:${backgroundColor}-dark focus:outline-none focus:${backgroundColor}-dark`}
      type={type}
    >
      {title}
    </button>
  );
};

export default CustomButton;
