import React from "react";
import { render } from "@testing-library/react";
import NewAttendanceReportForm from "./NewAttendanceReportForm";


jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ empId: 101 }), 
    }
})

it("renders without crashing", function() {
    render(<NewAttendanceReportForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<NewAttendanceReportForm />);
    expect(asFragment()).toMatchSnapshot();
});