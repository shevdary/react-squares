import React from "react";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import Button from "./index";

describe("should render table", () => {
  let componentRemove;
  beforeEach(() => {
    componentRemove = shallow(
      <Button
        type={"minus"}
        location="top"
        className="button-rm"
        positionX={0}
      />
    );
  });

  describe("render buttons with default props", () => {
    it("should render component with default props ", () => {
      expect(componentRemove.prop("style")).toHaveProperty("height", "50px");
      expect(componentRemove.prop("style")).toHaveProperty("left", "0px");
      expect(componentRemove.prop("style")).toHaveProperty("width", "50px");
      expect(componentRemove.text()).toEqual("-");
    });
  });

  describe("render buttons with cell size", () => {
    const componentWithProps = shallow(
      <Button
        type={"minus"}
        size={90}
        location="top"
        className="button-rm"
        positionX={0}
      />
    );

    it("should render component with size props ", () => {
      expect(componentWithProps.prop("style")).toHaveProperty("left", "0px");
      expect(componentWithProps.prop("style")).toHaveProperty("height", "90px");
      expect(componentWithProps.prop("style")).toHaveProperty("width", "90px");
      expect(componentWithProps.text()).toEqual("-");
    });
  });
});
