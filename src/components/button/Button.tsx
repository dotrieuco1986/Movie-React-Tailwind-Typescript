import React from 'react';

interface Props {
  bgColor?: string;
  children?: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ 
  bgColor,
  children,
  onClick, 
  }) => { 
    let bgClassName = 'bg-primary';
    switch (bgColor) {
      case 'primary':
        bgClassName = 'bg-primary';
        break;
      case 'secondary':
        bgClassName = 'bg-secondary';
        break;
      default:
        break;
    }
  return (
    <button 
      onClick={onClick}
      className={`py-3 px-6 rounded-lg capitalize bg-primary w-full text-white mt-auto ${bgClassName} ${bgClassName}`}
    >
    {children}
    </button>
  );
}
export default Button;
