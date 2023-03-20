import React from "react";
import { render } from "@testing-library/react";
import StaffReports from "./StaffReports";


it("renders without crashing", function() {
    render(<StaffReports />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<StaffReports />);
    expect(asFragment()).toMatchSnapshot();
});