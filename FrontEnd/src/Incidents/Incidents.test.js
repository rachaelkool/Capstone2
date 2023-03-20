import React from "react";
import { render } from "@testing-library/react";
import Incidents from "./Incidents";


it("renders without crashing", function() {
    render(<Incidents />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<Incidents />);
    expect(asFragment()).toMatchSnapshot();
});