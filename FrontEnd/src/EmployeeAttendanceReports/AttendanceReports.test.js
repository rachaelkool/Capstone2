import React from "react";
import { render } from "@testing-library/react";
import AttendanceReports from "./AttendanceReports";


jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ empId: 101 }), 
    }
})

it("renders without crashing", function() {
    render(<AttendanceReports />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<AttendanceReports />);
    expect(asFragment()).toMatchSnapshot();
});