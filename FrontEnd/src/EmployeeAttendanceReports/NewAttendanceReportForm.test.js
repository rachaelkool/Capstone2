import React from "react";
import { render } from "@testing-library/react";
import NewAttendanceReportForm from "./NewAttendanceReportForm";


it("renders without crashing", function() {
    render(<NewAttendanceReportForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<NewAttendanceReportForm />);
    expect(asFragment()).toMatchSnapshot();
});