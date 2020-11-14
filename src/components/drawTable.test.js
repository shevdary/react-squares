import React, { Component } from "react";
import SuperTable from "./drawTable";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
describe("should render table", () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(
      <SuperTable initialWidth={4} initialHeight={4} cellSize={50} />
    );
    instance = component.instance();
  });

  it("should render table with props ", () => {
    const row = component.find("tr");
    const col = component.find("td");
    expect(row).toHaveLength(4);
    expect(col).toHaveLength(16);
  });
  describe(" button click event", () => {
    it("should add rows and columns", () => {
      instance.addCol();
      expect(component.state().col).toHaveLength(5);
      instance.addRow();
      expect(component.state().row).toHaveLength(5);
    });

    it("should delete row", () => {
      component.setState({ rowIndex: 1 });
      instance.deleteRow();
      expect(component.state().row).toHaveLength(3);
      expect(
        component.state().row.forEach(itemElement => itemElement[2])
      ).toBeUndefined();
    });
    it("should delete col", () => {
      component.setState({ colIndex: 2 });
      instance.deleteCol();
      expect(component.state().col).toHaveLength(3);
      expect(
        component.state().col.forEach(itemElement => itemElement[2])
      ).toBeUndefined();
    });
    it("shouldn't delete last row and col", () => {
      component = shallow(
        <SuperTable initialWidth={1} initialHeight={1} cellSize={50} />
      );
      component.setState({ colIndex: 0 ,rowIndex: 0});
      instance.deleteCol();
      instance.deleteRow();
      expect(component.state().col).toHaveLength(1);
      expect(component.state().row).toHaveLength(1);
    });
  });
});
