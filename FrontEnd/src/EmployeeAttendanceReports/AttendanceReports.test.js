import React from "react";
import { render } from "@testing-library/react";
import AttendanceReports from "./AttendanceReports";


it("renders without crashing", function() {
    render(<AttendanceReports />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<AttendanceReports />);
    expect(asFragment()).toMatchSnapshot();
});