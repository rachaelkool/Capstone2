import React from "react";
import { render } from "@testing-library/react";
import Notes from "./Notes"

it("renders without crashing", function() {
    render(<Notes />);
  });
  
  // snapshot test
it("matches snapshot", function() {
    const { asFragment } = render(<Notes/>);
    expect(asFragment()).toMatchSnapshot();
});