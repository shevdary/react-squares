import React, { Component } from "react";
import "./style.scss";

export const DrawButton = ({ text, click, className }) => {
  return (
    <button className={className} onClick={() => click()}>
      {text}
    </button>
  );
};

