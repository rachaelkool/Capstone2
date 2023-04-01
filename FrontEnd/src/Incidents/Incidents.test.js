import React from "react";
import { render } from "@testing-library/react";
import Incidents from "./Incidents";


jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ empId: 101 }), 
    }
})

it("renders without crashing", function() {
    render(<Incidents />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<Incidents />);
    expect(asFragment()).toMatchSnapshot();
});