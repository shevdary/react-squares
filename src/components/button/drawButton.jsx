import React from "react";
import "./buttonStyle.scss";
const Button = ({
  type,
  size,
  location,
  className,
  click,
  positionX,
  positionY
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
    >
      {type === "plus" ? "+" : "-"}
    </button>
  );
};

export default Button;