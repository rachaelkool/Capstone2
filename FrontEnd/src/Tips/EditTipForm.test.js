import React from "react";
import { render } from "@testing-library/react";
import EditTipForm from "./EditTipForm";


it("renders without crashing", function() {
    render(<EditTipForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<EditTipForm />);
    expect(asFragment()).toMatchSnapshot();
});