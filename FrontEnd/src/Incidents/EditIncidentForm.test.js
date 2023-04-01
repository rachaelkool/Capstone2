import React from "react";
import { render } from "@testing-library/react";
import EditIncidentForm from "./EditIncidentForm";


jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ empId: 101 }), 
    }
})

it("renders without crashing", function() {
    render(<EditIncidentForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<EditIncidentForm />);
    expect(asFragment()).toMatchSnapshot();
});