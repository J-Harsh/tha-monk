import React from "react";
import { cn } from "../../utils/util";
const Flex = ({
  children,
  center = false,
  horizontalCenter = false,
  verticalCenter = false,
  direction = "row",
  className = "",
  ...props
}) => {
  const classes = cn(
    "flex",
    direction === "col" && "flex-col",
    center || (horizontalCenter && verticalCenter)
      ? "justify-center items-center"
      : null,
    !center && horizontalCenter ? "justify-center" : null,
    !center && verticalCenter ? "items-center" : null,
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Flex;
