import React from "react";
import { render } from "@testing-library/react";
import EditAttendanceReportForm from "./EditAttendanceReportForm";


it("renders without crashing", function() {
    render(<EditAttendanceReportForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<EditAttendanceReportForm />);
    expect(asFragment()).toMatchSnapshot();
});