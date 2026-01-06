
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'vibrant';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  gradientClass?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  gradientClass = 'from-purple-600 to-blue-600',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 rounded-2xl focus:outline-none tracking-tight';
  
  const variants = {
    primary: 'bg-white text-black hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]',
    vibrant: `bg-gradient-to-r ${gradientClass} text-white hover:scale-[1.02] hover:shadow-lg active:scale-95`,
    secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
    outline: 'border-2 border-neutral-800 text-white hover:border-white hover:bg-white hover:text-black',
    ghost: 'text-neutral-400 hover:text-white'
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-10 py-5 text-lg'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
