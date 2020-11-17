import React from "react";
import SuperTable from "./index";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import Button from "../button";

describe("render correctly table component", () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(<SuperTable />);
    instance = component.instance();
  });

  describe("render table with default props", () => {
    it("should render a table elements with default props", () => {
      expect(component.find("table")).toHaveLength(1);
      expect(component.find("tr")).toHaveLength(4);
      expect(component.find("td")).toHaveLength(16);
    });

    it("should render all buttons", () => {
      expect(component.find(Button)).toHaveLength(4);
    });

    it("should set height and width 50px", () => {
      expect(
        component
          .find("td")
          .first()
          .prop("style")
      ).toHaveProperty("height", 50);
      expect(
        component
          .find("td")
          .first()
          .prop("style")
      ).toHaveProperty("width", 50);
    });
  });

  describe("render table with props", () => {
    const componentWithProps = shallow(
      <SuperTable initialWidth={3} initialHeight={5} cellSize={30} />
    );
    it("should render a table elements with props", () => {
      expect(componentWithProps.find("table")).toHaveLength(1);
      expect(componentWithProps.find("tr")).toHaveLength(5);
      expect(componentWithProps.find("td")).toHaveLength(15);
    });

    it("should set height and width 30px", () => {
      expect(
        componentWithProps
          .find("td")
          .first()
          .prop("style")
      ).toHaveProperty("height", 30);
      expect(
        componentWithProps
          .find("td")
          .first()
          .prop("style")
      ).toHaveProperty("width", 30);
    });
  });

  describe("button click events", () => {
    it("should add row ", () => {
      component
        .find(".add-row")
        .dive()
        .simulate("click");
      expect(component.state().row).toHaveLength(5);
    });

    it("should add a col", () => {
      component
        .find(".add-col")
        .dive()
        .simulate("click");
      expect(component.state().col).toHaveLength(5);
    });

    it("should delete a row by rowIndex", () => {
      component.setState({ rowIndex: 1 });
      instance.deleteRow();
      expect(component.state().row).toHaveLength(3);
      expect(
        component.state().row.forEach(itemElement => itemElement[2])
      ).toBeUndefined();
    });

    it("should delete a col by colIndex", () => {
      component.setState({ colIndex: 2 });
      instance.deleteCol();
      expect(component.state().col).toHaveLength(3);
      expect(
        component.state().col.forEach(itemElement => itemElement[2])
      ).toBeUndefined();
    });
  });

  describe("delete a last element from table", () => {
    const oneCellTable = shallow(
      <SuperTable initialWidth={1} initialHeight={1} cellSize={50} />
    );

    it("should save the initial state of the element col and row", () => {
      oneCellTable.setState({ colIndex: 0, rowIndex: 0 });
      oneCellTable.find(".rm-row").simulate("click");
      oneCellTable.find(".rm-col").simulate("click");
      expect(oneCellTable.state().col).toHaveLength(1);
      expect(oneCellTable.state().row).toHaveLength(1);
    });
  });
});
