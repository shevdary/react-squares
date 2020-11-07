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
      this.state.tableData.row.push({id:i});
    for (let j = 0; j < initialWidth; j++)
      this.state.tableData.col.push({id:j});
  };
  renderTableData() {
    return this.state.tableData.row.map((indexRow, key) =>
        <tr
            key={indexRow.id}
            rowIndex={indexRow.id}
            style={{ width: this.props.cellSize, height: this.props.cellSize }}
        >
          {this.state.tableData.col.map((indexCol, rowkey) =>
              <td
                  key={indexCol.id}
                  colIndex={indexCol.id}
                  style={{
                    width: this.props.cellSize,
                    height: this.props.cellSize
                  }}

              />
          )}
        </tr>
    );
  }
  addedCol = e => {
    e.preventDefault();
    let lastElementId=this.state.tableData.col[this.state.tableData.col.length-1].id;
    this.state.tableData.col.push({id:lastElementId+1});
  };
  addedRow = e => {
    e.preventDefault();
    let lastElementId=this.state.tableData.row[this.state.tableData.row.length-1].id;
    this.state.tableData.row.push({id:lastElementId+1});
  };

  deleteRow = (indexRow) => {
    const findDeleteRow = this.state.tableData;
    findDeleteRow.row=findDeleteRow.row.filter(prod => prod.id!==indexRow);
    this.setState({tableData:findDeleteRow});
    this.displayButton();
    this.mouseLeave();
  };

  deleteColl = indexColl => {
    const findDeleteCol = this.state.tableData;
    findDeleteCol.col=findDeleteCol.col.filter(prod => prod.id!==indexColl);
    this.setState({tableData:findDeleteCol});
    this.displayButton();
    this.mouseLeave();
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
      isLastElementRow: this.state.tableData.row.length > 1 ? true : false,
      isLastElementCol: this.state.tableData.col.length > 1 ? true : false
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
              onClick={() => {
                this.deleteColl(deleteColIndex);
              }}
              onMouseEnter={this.mouseEnter}
              disabled={!isLastElementCol}

          >
            -
          </button>
          <button
              className={`button-rm remove-row ${hideRow}  ${displayBtnRow}`}
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

