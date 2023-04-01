import React from "react";
import { render } from "@testing-library/react";
import NewNoteForm from "./NewNoteForm"


jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ empId: 101 }), 
    }
})

it("renders without crashing", function() {
    render(<NewNoteForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<NewNoteForm/>);
    expect(asFragment()).toMatchSnapshot();
});