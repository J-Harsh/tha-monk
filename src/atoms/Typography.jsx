import React from 'react';

const Typography = ({ 
  children, 
  size = 'base', 
  weight = 'normal', 
  className = '',
  as: Component = 'p',
  ...props 
}) => {
  
  const sizeClasses = {
    sm: 'text-sm', 
    base: 'text-base',
  };

  const weightClasses = {
    normal: 'font-normal', 
    medium: 'font-medium', 
    semibold: 'font-semibold',
  };

  const classes = `
    font-sans
    ${sizeClasses[size] || 'text-base'}
    ${weightClasses[weight] || 'font-normal'}
    ${className}
  `.trim();

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Typography;