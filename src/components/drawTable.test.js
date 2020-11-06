import React, {Component} from 'react';
import DrawTable from "./drawTable";

it("should be a 4 x 4 table and columns size is 50",()=>{
    const component=shallow(<DrawTable initialWidth={4} initialHeight={4} cellSize={50}/>);
    const wrapper=component.find(".squares-table");
    const row=component.find('tr');
    const col=component.find('td');
    expect(row.length).toBe(4);
    expect(col.length).toBe(16);
});

it('button mus add new row in table',()=>{
    const mock=jest.fn();

    const button=shallow((<button className={"add-row"} onClick={mock}></button>));
    const component=shallow(<DrawTable initialWidth={4} initialHeight={4} cellSize={50}/>);
    button.find('button').prop('onClick');
    const row=component.find('tr');
    expect(row.length).toEqual(5);
})