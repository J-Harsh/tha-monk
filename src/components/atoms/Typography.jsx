import { cn } from "../../utils/util";
const Typography = ({
  children,
  size = "base",
  weight = "normal",
  className = "",
  as: Component = "p",
  ...props
}) => {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const classes = cn(
    "font-sans",
    size ? sizeClasses[size] : "text-base",
    weight ? weightClasses[weight] : "font-normal",
    className
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
