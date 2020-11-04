import React, { useState , Component} from "react";
import "./style.scss";
import { DrawButton } from "./drawButton";

export default class DrawTable extends Component {
    constructor(props) {
        super(props);
        const { initialWidth, initialHeight, cellSizse } = this.props;
        this.state = {
            tableData: {
                col: [],
                row: []
            },
            tableData2: {
                col: [],
                row: []
            }
        };
        this.test(initialWidth, initialHeight, cellSizse);
    }
    test = (initialWidth, initialHeight, cellSizse) => {
        for (let i = 0; i < initialHeight; i++)
            this.state.tableData.row.push({ rowId: i });
        for (let j = 0; j < initialWidth; j++)
            this.state.tableData.col.push({ colId: j });
    };
    renderTableData() {
        return this.state.tableData.col.map(indexCol => {
            return (
                <tr key={indexCol}>
                    {this.state.tableData.row.map((indexRow, i) => {
                        return <td key={indexRow}></td>;
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
render() {
    return (
        <div className="squares-table">
            <table>
                <tbody>{this.renderTableData()}</tbody>
            </table>
            <button className="button-add add-row" onClick={e => this.addedCol(e)}>
                +
            </button>
            <button className="button-add add-coll" onClick={e => this.addedRow(e)}>
                +
            </button>
            <button className="button-rm remove-row">-</button>
            <button className="button-rm remove-coll">-</button>
        </div>
    );
}
};


