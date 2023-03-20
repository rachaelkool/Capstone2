import React from "react";
import { render } from "@testing-library/react";
import NewTipForm from "./NewTipForm";


it("renders without crashing", function() {
    render(<NewTipForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<NewTipForm />);
    expect(asFragment()).toMatchSnapshot();
});