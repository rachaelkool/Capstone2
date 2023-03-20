import React from "react";
import { render } from "@testing-library/react";
import NewNoteForm from "./NewNoteForm"

it("renders without crashing", function() {
    render(<NewNoteForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<NewNoteForm/>);
    expect(asFragment()).toMatchSnapshot();
});