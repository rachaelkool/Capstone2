import React from "react";
import { render } from "@testing-library/react";
import NewStaffReportForm from "./NewStaffReportForm";


it("renders without crashing", function() {
    render(<NewStaffReportForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<NewStaffReportForm />);
    expect(asFragment()).toMatchSnapshot();
});