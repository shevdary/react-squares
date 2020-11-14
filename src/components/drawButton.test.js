import React from "react";
import SuperTable from "./drawTable";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import Button from "./drawButton";

describe("should render table", () => {
  let component, componentRemove;
  beforeEach(() => {
    component = shallow(
      <SuperTable initialWidth={4} initialHeight={4} cellSize={50} />
    );
    componentRemove = shallow(
      <Button
        type={"minus"}
        size={50}
        location="top"
        className="button-rm"
        positionX={0}
      />
    );
  });
  describe(" first render", () => {
    it(" first render component with props ", () => {
      expect(componentRemove.prop("style")).toHaveProperty("height", "50px");
      expect(componentRemove.prop("style")).toHaveProperty("left", "0px");
      expect(componentRemove.text()).toEqual("-");
    });
  });
  describe("button render ", () => {
    it("should ", () => {
      component
        .find(".add-row")
        .dive()
        .simulate("click");
      expect(component.state().row).toHaveLength(5);

      component
        .find(".add-col")
        .dive()
        .simulate("click");
      expect(component.state().col).toHaveLength(5);

      component.setState({ rowIndex: 1, colIndex: 3 });
      component
        .find(".rm-row")
        .dive()
        .simulate("click");
      component
        .find(".rm-col")
        .dive()
        .simulate("click");
      expect(
        component.state().row.forEach(itemElement => itemElement[1])
      ).toBeUndefined();
      expect(
        component.state().col.forEach(itemElement => itemElement[3])
      ).toBeUndefined();
    });
  });
});
