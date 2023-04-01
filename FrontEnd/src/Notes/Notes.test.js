import React from "react";
import { render } from "@testing-library/react";
import Notes from "./Notes"


jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: () => ({ empId: 101 }), 
  }
})

it("renders without crashing", function() {
    render(<Notes />);
  });
  
it("matches snapshot", function() {
    const { asFragment } = render(<Notes/>);
    expect(asFragment()).toMatchSnapshot();
});