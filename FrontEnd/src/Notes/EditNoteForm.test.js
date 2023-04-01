import React from "react";
import { render } from "@testing-library/react";
import EditNoteForm from "./EditNoteForm"


jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: () => ({ empId: 101 }), 
  }
})

it("renders without crashing", function() {
    render(<EditNoteForm />);
  });
  
it("matches snapshot", function() {
    const { asFragment } = render(<EditNoteForm/>);
    expect(asFragment()).toMatchSnapshot();
});