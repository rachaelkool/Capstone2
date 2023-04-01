import React from "react";
import { render } from "@testing-library/react";
import Tips from "./Tips";


jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ empId: 101 }), 
    }
})

it("renders without crashing", function() {
    render(<Tips />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<Tips />);
    expect(asFragment()).toMatchSnapshot();
});