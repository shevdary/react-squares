import React, { useState, Component } from "react";
import "./style.scss";
export default class DrawTable extends Component {
  constructor(props) {
    super(props);
    const { initialWidth, initialHeight } = this.props;
    this.state = {
      tableData: {
        col: [],
        row: []
      },
      deleteColIndex: null,
      deleteRowIndex: null,
      isMouseOverTable: false,
      isLastElementRow: false,
      isLastElementCol: false
    };
    this.lastRowElement = false;
    this.lastRowElement = false;
    this.drawTable(initialWidth, initialHeight);
  }
  drawTable = (initialWidth, initialHeight) => {
    for (let i = 0; i < initialHeight; i++)
      this.state.tableData.row.push({ id: i });
    for (let j = 0; j < initialWidth; j++)
      this.state.tableData.col.push({ id: j });
  };
  renderTableData() {
    const { cellSize } = this.props;
    return this.state.tableData.row.map((indexRow, key) => (
        <tr
            key={indexRow.id}
            rowIndex={indexRow.id}
            style={{ width: cellSize, height: cellSize }}
        >
          {this.state.tableData.col.map((indexCol, rowkey) => (
              <td
                  key={indexCol.id}
                  colIndex={indexCol.id}
                  style={{
                    width: cellSize,
                    height: cellSize
                  }}
              />
          ))}
        </tr>
    ));
  }
  addedCol = () => {
    const { tableData } = this.state;
    const lastElementId = tableData.col[tableData.col.length - 1].id;
    tableData.col = [...tableData.col, { id: lastElementId + 1 }];
    this.setState({ tableData });
  };
  addedRow = () => {
    const { tableData } = this.state;
    const lastElementId = tableData.row[tableData.row.length - 1].id;
    tableData.row = [...tableData.row, { id: lastElementId + 1 }];
    this.setState({ tableData });
  };

  deleteRow = indexRow => {
    const findDeleteRow = this.state.tableData;
    findDeleteRow.row = findDeleteRow.row.filter(prod => prod.id !== indexRow);
    this.setState({ tableData: findDeleteRow });
    this.mouseLeave();
    this.displayButton();
  };

  deleteColl = indexColl => {
    const findDeleteCol = this.state.tableData;
    findDeleteCol.col = findDeleteCol.col.filter(prod => prod.id !== indexColl);
    this.setState({ tableData: findDeleteCol });
    this.displayButton();
  };

  mouseOverEvent = e => {
    const buttonPositionY = document.querySelector(".remove-row");
    const buttonPositionX = document.querySelector(".remove-coll");
    const deleteRowIndex = Number(e.target.parentNode.getAttribute("rowIndex"));
    const deleteColIndex = Number(e.target.getAttribute("colIndex"));
    buttonPositionY.style.top = e.target.offsetTop + "px";
    buttonPositionX.style.left = e.target.offsetLeft + "px";
    this.setState({ deleteRowIndex, deleteColIndex });
    this.mouseEnter();
    this.displayButton();
  };
  mouseLeave = () => {
    this.setState({
      isMouseOverTable: false
    });
  };
  mouseEnter = () => {
    this.setState({
      isMouseOverTable: true
    });
  };
  displayButton = () => {
    this.setState({
      isLastElementRow: this.state.tableData.row.length > 1 ? true : false,
      isLastElementCol: this.state.tableData.col.length > 1 ? true : false
    });
  };
  render() {
    const {
      deleteRowIndex,
      deleteColIndex,
      isMouseOverTable,
      isLastElementRow,
      isLastElementCol
    } = this.state;
    const { cellSize } = this.props;
    const hideButton = isMouseOverTable ? "visible" : "hidden";
    const displayBtnRow = isLastElementRow ? "block" : "none";
    const displayBtnCol = isLastElementCol ? "block" : "none";
    return (
        <div className="squares-table">
          <table onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
            <tbody onMouseMove={this.mouseOverEvent}>
            {this.renderTableData()}
            </tbody>
          </table>
          <button
              style={{ width: cellSize, height: cellSize }}
              className="button-add add-coll"
              onClick={this.addedCol}
          >
            +
          </button>
          <button
              style={{ width: cellSize, height: cellSize }}
              className="button-add add-row"
              onClick={this.addedRow}
          >
            +
          </button>
          <button
              className={`button-rm remove-coll ${hideButton}`}
              style={{ width: cellSize, height: cellSize }}
              onClick={() => {
                this.deleteColl(deleteColIndex);
              }}
              onMouseEnter={this.mouseEnter}
              disabled={!isLastElementCol}
          >
            -
          </button>
          <button
              style={{ width: cellSize, height: cellSize }}
              className={`button-rm remove-row ${hideButton} `}
              onClick={() => this.deleteRow(deleteRowIndex)}
              onMouseEnter={this.mouseEnter}
              disabled={!isLastElementRow}
          >
            -
          </button>
        </div>
    );
  }
}

