import React from 'react';

interface ButtonProps {
  title: string;
  loading?: boolean; 
  backgroundColor?: string;
  titleColor?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button'; 
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  loading = false, 
  backgroundColor = 'bg-blue-600',
  titleColor = 'text-white',
  size = 'medium',
  onClick,
  type = 'button' 
}) => {
  let padding;
  switch (size) {
    case 'small':
      padding = 'px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-2';
      break;
    case 'large':
      padding = 'px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4';
      break;
    default:
      padding = 'px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-3';
  }


  return (
    <button
      onClick={onClick}
      className={`${padding} ${backgroundColor} ${titleColor} rounded-md hover:bg-blue-300 active:bg-blue-950-800 transition-all duration-200 ease-in-out`}
      type={type}
      disabled={loading}
    >
      {loading ? "Carregando..." : title}
    </button>
  );
};


export default CustomButton;
