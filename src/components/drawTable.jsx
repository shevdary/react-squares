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
            isLastElementCol: false,
            isShowAfterClick: false
        };
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
        return this.state.tableData.row.map(indexRow => (
            <tr
                key={indexRow.id}
                rowindex={indexRow.id}
                style={{ width: cellSize, height: cellSize }}
            >
                {this.state.tableData.col.map(indexCol => (
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
        this.showButton();
    };

    deleteColl = indexColl => {
        const findDeleteCol = this.state.tableData;
        findDeleteCol.col = findDeleteCol.col.filter(prod => prod.id !== indexColl);
        this.setState({ tableData: findDeleteCol });
        this.showButton();
    };

    mouseMove = e => {
        const { parentNode, offsetTop, offsetLeft } = e.target;
        const deleteRowIndex = Number(parentNode.getAttribute("rowIndex"));
        const deleteColIndex = Number(e.target.getAttribute("colIndex"));
        this.setState({
            deleteRowIndex,
            deleteColIndex,
            buttonPositionY: offsetTop + "px",
            buttonPositionX: offsetLeft + "px"
        });
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
        this.displayButton(e);
    };

    mouseOut = e => {
        const { nodeName, className } = e.target;
        if (nodeName !== "TD" || nodeName !== "BUTTON") {
            this.setState({
                isMouseOverTable: false
            });
        }
    };

    showButton = () => {
        this.setState({ isMouseOverTable: false });
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
        const {
            deleteRowIndex,
            deleteColIndex,
            isMouseOverTable,
            isLastElementRow,
            isLastElementCol,
            buttonPositionY,
            buttonPositionX
        } = this.state;
        const { cellSize } = this.props;
        const hideButton = isMouseOverTable ? "visible" : "hidden";
        const displayBtnRow = isLastElementRow ? "block" : "none";
        const displayBtnCol = isLastElementCol ? "block" : "none";
        return (
            <div
                className="squares-table"
                onMouseOver={e => this.mouseOver(e)}
                onMouseOut={e => this.mouseOut(e)}
            >
                <div className={"table-block"}>
                    <table>
                        <tbody onMouseMove={this.mouseMove}>{this.renderTableData()}</tbody>
                    </table>
                </div>

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
                    className={`button-rm remove-coll ${hideButton} ${displayBtnCol}`}
                    style={{
                        width: cellSize,
                        height: cellSize,
                        left: buttonPositionX
                    }}
                    onClick={() => {
                        this.deleteColl(deleteColIndex);
                    }}
                >
                    -
                </button>
                <button
                    style={{
                        width: cellSize,
                        height: cellSize,
                        top: buttonPositionY
                    }}
                    className={`button-rm remove-row ${hideButton} ${displayBtnRow} `}
                    onClick={() => {
                        this.deleteRow(deleteRowIndex);
                    }}
                >
                    -
                </button>
            </div>
        );
    }
}