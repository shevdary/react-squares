import React, { Component } from "react";
import DrawTable from "./drawTable";
import { describe } from "@jest/globals";

describe("should render table", () => {
  let component;
  let instanse;
  beforeEach(() => {
    component = shallow(
      <DrawTable initialWidth={4} initialHeight={4} cellSize={50} />
    );
    instanse = component.instance();
  });

  it("should render table with props ", () => {
    const row = component.find("tr");
    const col = component.find("td");
    expect(row.length).toBe(4);
    expect(col.length).toBe(16);
  });

  describe("button click events", () => {
    it("button should  add new row in table", () => {
      const btn = component.find(".add-row");
      btn.simulate("click");
      expect(component.state().tableData.row.length).toBe(5);
    });

    it("button should  add new coll in table", () => {
      const mockCall = jest.fn();
      const btn = component.find(".add-col");
      btn.simulate("click");
      expect(component.state().tableData.col.length).toBe(5);
    });

    it("button should  add new coll in table", () => {
      const btn = component.find(".remove-row");
      btn.simulate("click");
      expect(component.state().tableData.row.length).toBe(5);
    });

    it("button should  add new coll in table", () => {
      const btn = component.find(".remove-coll");
      btn.simulate("click");
      expect(component.state().tableData.col.length).toBe(5);
    });
  });
});
