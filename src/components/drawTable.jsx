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
      isVisibleButtonRow: false,
      isVisibleButtonCol: false,
      isLastElementRow: false,
      isLastElementCol: false
    };
    this.test(initialWidth, initialHeight);
  }
  test = (initialWidth, initialHeight) => {
    for (let i = 0; i < initialHeight; i++)
      this.state.tableData.row.push({ i });
    for (let j = 0; j < initialWidth; j++) this.state.tableData.col.push({ j });
  };
  renderTableData() {
    return this.state.tableData.row.map((indexRow,i) => {
      return (
        <tr
          key={i}
          style={{ width: this.props.cellSize, height: this.props.cellSize }}
        >
          {this.state.tableData.col.map((indexCol, j) => {
            return (
              <td
                key={j}
                style={{
                  width: this.props.cellSize,
                  height: this.props.cellSize
                }}
              />
            );
          })}
        </tr>
      );
    });
  }
  addedCol = e => {
    e.preventDefault();
    let copyTable = this.state.tableData;
    copyTable.col.push({});
    this.setState({ tableData: copyTable });
  };
  addedRow = e => {
    e.preventDefault();
    let copyTable = this.state.tableData;
    copyTable.row.push({});
    this.setState({ tableData: copyTable });
  };

  deleteRow = indexRow => {
    const findDeleteRow = this.state.tableData;
    const rowStart = this.state.tableData.row.slice(0, indexRow);
    const rowEnd = this.state.tableData.row.slice(indexRow + 1);
    findDeleteRow.row = rowStart.concat(rowEnd);
    console.log(this.state.tableData.row[1]);
    this.setState({ tableData: findDeleteRow });
    this.mouseLeave();
  };

  deleteColl = indexColl => {
    const findDeleteColl = this.state.tableData;
    const collStart = this.state.tableData.col.slice(0, indexColl);
    const collEnd = this.state.tableData.col.slice(indexColl + 1);
    findDeleteColl.col = collStart.concat(collEnd);
    this.setState({ tableData: findDeleteColl });
    this.displayButton();
    this.mouseLeave();
  };
  mouseOverEvent = e => {
    const buttonPositionY = document.querySelector(".remove-row");
    const buttonPositionX = document.querySelector(".remove-coll");
    const deleteRowIndex = e.target.parentElement.rowIndex;
    const deleteColIndex = e.target.cellIndex;
    buttonPositionY.style.top = e.target.offsetTop + "px";
    buttonPositionX.style.left = e.target.offsetLeft + "px";
    this.setState({ deleteRowIndex, deleteColIndex });
    this.mouseEnter();
    this.displayButton();
  };
  mouseLeave = () => {
    this.setState({
      isVisibleButtonRow: false,
      isVisibleButtonCol: false
    });
  };
  mouseEnter = () => {
    this.setState({
      isVisibleButtonRow: true,
      isVisibleButtonCol: true
    });
  };
  displayButton = () => {
    this.setState({
      isLastElementRow: this.state.tableData.row[1] ? true : false,
      isLastElementCol: this.state.tableData.col[1] ? true : false
    });
  };

  render() {
    const {
      deleteRowIndex,
      deleteColIndex,
      isVisibleButtonRow,
      isVisibleButtonCol,
      isLastElementRow,
      isLastElementCol
    } = this.state;
    const hideRow = isVisibleButtonRow ? "visible" : "hidden";
    const hideCol = isVisibleButtonCol ? "visible" : "hidden";
    const displayBtnRow = isLastElementRow ? "block" : "none";
    const displayBtnCol = isLastElementCol ? "block" : "none";
    return (
      <div className="squares-table" onMouseLeave={this.mouseLeave}>
        <table onMouseEnter={this.mouseEnter}>
          <tbody onMouseMove={this.mouseOverEvent}>
            {this.renderTableData()}
          </tbody>
        </table>
        <button className="button-add add-coll" onClick={e => this.addedCol(e)}>
          +
        </button>
        <button className="button-add add-row" onClick={e => this.addedRow(e)}>
          +
        </button>
        <button
          className={`button-rm remove-coll ${hideCol} ${displayBtnCol}`}
          onClick={e => {
            this.deleteColl(deleteColIndex);
          }}
          onMouseEnter={this.mouseEnter}
        >
          -
        </button>
        <button
          className={`button-rm remove-row ${hideRow}  ${displayBtnRow}`}
          onClick={e => this.deleteRow(deleteRowIndex)}
          onMouseEnter={this.mouseEnter}
        >
          -
        </button>
      </div>
    );
  }
}