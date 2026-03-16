import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  to, 
  href,
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button',
  disabled
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg focus:ring-blue-500",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg focus:ring-slate-500",
    outline: "border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 bg-transparent focus:ring-blue-500",
    text: "text-slate-600 hover:text-blue-600 font-semibold px-4 py-2 hover:bg-blue-50 rounded-md"
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={combinedStyles} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;