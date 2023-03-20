import React from "react";
import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";


it("renders without crashing", function() {
    render(<SignupForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<SignupForm />);
    expect(asFragment()).toMatchSnapshot();
});