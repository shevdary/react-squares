import React from "react";
import "./style.scss";
import { DrawButton } from "./drawButton";

export const DrawTable = ({ initialWidth, initialHeight, cellSize }) => {
  let rowData = [];
  for (let i = 0; i < Number(initialWidth); i++) {
    let colData = [];
    for (let j = 0; j < Number(initialHeight); j++) {
      colData.push(<td></td>);
    }
    rowData.push(<tr>{colData}</tr>);
  }
  return (
    <div className="squares-table">
      <table> {rowData} </table>
      <DrawButton text="+" className="button-add add-row" />
      <DrawButton text="+" className="button-add add-coll" />
      <DrawButton text="-" className="button-rm remove-row" />
      <DrawButton text="-" className="button-rm remove-coll" />
    </div>
  );
};

