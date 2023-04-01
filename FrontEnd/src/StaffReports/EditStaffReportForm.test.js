import React from "react";
import { render } from "@testing-library/react";
import NewStaffReportForm from "./NewStaffReportForm";


jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ empId: 101 }), 
    }
})

it("renders without crashing", function() {
    render(<NewStaffReportForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<NewStaffReportForm />);
    expect(asFragment()).toMatchSnapshot();
});