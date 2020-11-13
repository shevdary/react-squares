import React, { useState, Component } from "react";
import "./style.scss";
import Button from "./drawButton";

export default class SuperTable extends Component {
  constructor(props) {
    super(props);
    const { initialWidth, initialHeight } = this.props;
    this.buttonPositionY = 0;
    this.buttonPositionX = 0;
    this.state = {
      col: [],
      row: [],
      colIndex: null,
      rowIndex: null,
      isMouseOverTable: false
    };
    this.drawTable(initialWidth, initialHeight);
  }

  drawTable = (initialWidth, initialHeight) => {
    const { row, col } = this.state;
    for (let i = 0; i < initialHeight; i++) row.push({ id: i });
    for (let j = 0; j < initialWidth; j++) col.push({ id: j });
  };

  addCol = () => {
    let { col } = this.state;
    const lastElementId = col[col.length - 1].id;
    col = [...col, { id: lastElementId + 1 }];
    this.setState({ col });
  };

  addRow = () => {
    let { row } = this.state;
    const lastElementId = row[row.length - 1].id;
    row = [...row, { id: lastElementId + 1 }];
    this.setState({ row });
  };

  deleteRow = () => {
    let { rowIndex, row } = this.state;
    row = row.filter(prod => prod.id !== rowIndex);
    this.setState({ row });
    this.showButton();
  };

  deleteCol = () => {
    let { colIndex, col } = this.state;
    col = col.filter(prod => prod.id !== colIndex);
    this.setState({ col });
    this.showButton();
  };
  showButton = () => {
    this.setState({ isMouseOverTable: false });
  };

  mouseMove = e => {
    const { parentNode, offsetTop, offsetLeft } = e.target;
    const rowIndex = Number(parentNode.getAttribute("rowIndex"));
    const colIndex = Number(e.target.getAttribute("colIndex"));
    this.setState({
      rowIndex,
      colIndex
    });
    this.buttonPositionX = offsetLeft;
    this.buttonPositionY = offsetTop;
  };
  mouseOver = e => {
    const { tagName, className } = e.target;
    if (
      tagName === "TABLE" ||
      tagName === "TD" ||
      className.includes("button-rm") ||
      className.includes("deleted-button")
    ) {
      this.setState({ isMouseOverTable: true });
    }
    this.displayButton(e);
  };

  mouseOut = e => {
    const { nodeName } = e.target;
    if (nodeName !== "TD" || nodeName !== "BUTTON") {
      this.setState({
        isMouseOverTable: false
      });
    }
  };

  displayButton = e => {
    const { parentNode, nodeName, children } = e.target;
    if (nodeName === "TD") {
      this.setState({
        isLastElementCol: parentNode.children.length > 1,
        isLastElementRow: parentNode.parentNode.children.length > 1
      });
    }
    if (nodeName === "TABLE") {
      this.setState({
        isLastElementCol: children[0].children[0].children.length > 1,
        isLastElementRow: children[0].children.length > 1
      });
    }
  };

  render() {
    const { row, col, isMouseOverTable } = this.state;
    const { buttonPositionY, buttonPositionX } = this;
    const { cellSize } = this.props;
    const hideButton = isMouseOverTable ? "visible" : "hidden";
    const displayBtnRow = row[1] ? "block" : "none";
    const displayBtnCol = col[1] ? "block" : "none";
    return (
      <div
        className="squares-table"
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
      >
        <div className={"table-block"}>
          <table>
            <tbody onMouseMove={this.mouseMove}>
              {row.map(indexRow => (
                <tr
                  key={indexRow.id}
                  rowindex={indexRow.id}
                  style={{ width: cellSize, height: cellSize }}
                >
                  {col.map(indexCol => (
                    <td
                      key={indexCol.id}
                      colindex={indexCol.id}
                      style={{
                        width: cellSize,
                        height: cellSize
                      }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button
          type="plus"
          size={cellSize}
          location={"bottom"}
          className="button-add"
          click={this.addRow}
        />
        <Button
          type="plus"
          size={cellSize}
          location={"right"}
          className="button-add"
          click={this.addCol}
        />
        <Button
          type="minus"
          size={cellSize}
          location="top"
          className={`button-rm ${hideButton} ${displayBtnCol}`}
          click={this.deleteCol}
          positionX={buttonPositionX}
        />
        <Button
          type="minus"
          size={cellSize}
          location="left"
          className={`button-rm ${hideButton} ${displayBtnRow}`}
          click={this.deleteRow}
          positionY={buttonPositionY}
        />
      </div>
    );
  }
}