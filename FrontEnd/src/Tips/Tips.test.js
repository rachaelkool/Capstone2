import React from "react";
import { render } from "@testing-library/react";
import Tips from "./Tips";


it("renders without crashing", function() {
    render(<Tips />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<Tips />);
    expect(asFragment()).toMatchSnapshot();
});