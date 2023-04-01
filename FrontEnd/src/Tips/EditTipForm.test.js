import React from "react";
import { render } from "@testing-library/react";
import EditTipForm from "./EditTipForm";


jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ empId: 101 }), 
    }
})
  
describe('EditTipForm', () => {
    it("renders without crashing", function() {
        render(<EditTipForm />);
    });
      
    it("matches snapshot", function() {
        const { asFragment } = render(<EditTipForm />);
        expect(asFragment()).toMatchSnapshot();
    });
})
