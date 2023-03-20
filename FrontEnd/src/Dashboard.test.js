import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";


it("renders without crashing", function() {
    render(<Dashboard />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
});