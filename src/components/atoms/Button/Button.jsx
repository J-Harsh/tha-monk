import React from "react";

const Button = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  onClick,
  disabled = false,
  icon,
  iconPosition = "left",
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90",
    secondary: "bg-white text-primary border-2 border-primary ",
    tertiary: "bg-white text-secondary border-2 border-secondary ",
  };

  const variantClasses = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded font-sans transition-colors duration-200 focus:outline-none  ${variantClasses} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
