import React from "react";
import { render } from "@testing-library/react";
import NewTipForm from "./NewTipForm";


jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ empId: 101 }), 
    }
})

it("renders without crashing", function() {
    render(<NewTipForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<NewTipForm />);
    expect(asFragment()).toMatchSnapshot();
});