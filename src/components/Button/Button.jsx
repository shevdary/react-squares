import React from "react";
import "./Button.scss";

const Button = ({
  type,
  size,
  location,
  className,
  click,
  positionX,
  positionY,
  disabled
}) => {
  const styleButton = {
    width: `${size}px`,
    height: `${size}px`,
    top: `${positionY}px`,
    left: `${positionX}px`
  };
  return (
    <button
      style={styleButton}
      className={`${location} ${className} `}
      onClick={click}
      disabled={disabled}
    >
      {type === "plus" ? "+" : "-"}
    </button>
  );
};

Button.defaultProps = {
  size: 50
};

export default Button;