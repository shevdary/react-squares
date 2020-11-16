import React, { Component } from "react";
import "./style.scss";
import Button from "../button";

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
    const { col } = this.state;
    const lastElementId = col[col.length - 1].id;
    this.setState({ col: [...col, { id: lastElementId + 1 }] });
  };

  addRow = () => {
    const { row } = this.state;
    const lastElementId = row[row.length - 1].id;
    this.setState({ row: [...row, { id: lastElementId + 1 }] });
  };

  deleteRow = () => {
    const { rowIndex, row } = this.state;
    this.setState({ row: row.filter(prod => prod.id !== rowIndex) });
    this.showButton();
  };

  deleteCol = () => {
    const { colIndex, col } = this.state;
    this.setState({ col: col.filter(prod => prod.id !== colIndex) });
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
      className.includes("table-block")
    ) {
      this.setState({ isMouseOverTable: true });
    }
  };
  mouseOut = e => {
    const { nodeName } = e.target;
    if (nodeName !== "TD" || nodeName !== "BUTTON") {
      this.setState({
        isMouseOverTable: false
      });
    }
  };

  render() {
    const { cellSize } = this.props;
    const { row, col, isMouseOverTable } = this.state;
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
          location="bottom"
          className="button-add add-row"
          click={this.addRow}
        />
        <Button
          type="plus"
          size={cellSize}
          location="right"
          className="button-add add-col"
          click={this.addCol}
        />
        <Button
          type="minus"
          size={cellSize}
          location="top"
          className={`button-rm rm-col ${hideButton} ${displayBtnCol}`}
          click={this.deleteCol}
          positionX={this.buttonPositionX}
        />
        <Button
          type="minus"
          size={cellSize}
          location="left"
          className={`button-rm rm-row ${hideButton} ${displayBtnRow}`}
          click={this.deleteRow}
          positionY={this.buttonPositionY}
        />
      </div>
    );
  }
}
Button.defaultProps={
  cellSize:50,
  initialWidth:4,
  initialHeight:4
};