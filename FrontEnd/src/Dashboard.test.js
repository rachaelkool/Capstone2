import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";


jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ empId: 101 }), 
    }
})

it("renders without crashing", function() {
    render(<Dashboard />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
});