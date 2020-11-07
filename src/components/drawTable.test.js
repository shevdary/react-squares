import React, { Component } from "react";
import DrawTable from "./drawTable";
import {beforeEach, describe, expect, it, jest} from "@jest/globals";
describe("should render table", () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(
      <DrawTable initialWidth={4} initialHeight={4} cellSize={50} />
    );
    instance = component.instance();
  });

  it("should render table with props ", () => {
    const row = component.find("tr");
    const col = component.find("td");
    expect(row.length).toBe(4);
    expect(col.length).toBe(16);
  });
  describe("button click events ", () => {
    it("add one  row ", () => {
      component.find('.add-row').simulate('click');
      expect(component.state().tableData.row.length).toBe(5);
    });

    it("add one  column ", () => {
      component.find('.add-coll').simulate('click');
      expect(component.state().tableData.col.length).toBe(5);
    });

    it("delete one column ", () => {
      component.find('.remove-coll').simulate('click');
      expect(component.state().tableData.col.length).toBe(4);
    });

    it("delete one row  and column by index   ", () => {
      instance.deleteRow(2);
      instance.deleteColl(1);

      expect(component.state().tableData.row.length).toBe(3);
      expect(component.state().tableData.row.forEach(itemElement=>itemElement[2])).toBe(undefined);

      expect(component.state().tableData.col.length).toBe(3);
      expect(component.state().tableData.col.forEach(itemElement=>itemElement[1])).toBe(undefined);
    });
  });

  describe("function delete last element ", () => {
    const componentLast = shallow(
        <DrawTable initialWidth={1} initialHeight={1} cellSize={50} />
    );

    it("delete last row ", () => {
      expect(componentLast.state().tableData.row.length).toBe(1);
      componentLast.find('.remove-row').simulate('click');
      expect(componentLast.state().tableData.row.length).toBe(1);
    });

    it("delete last coll ", () => {
      expect(componentLast.state().tableData.col.length).toBe(1);
      componentLast.find('.remove-coll').simulate('click');
      expect(componentLast.state().tableData.col.length).toBe(1);
    });
  })
});
