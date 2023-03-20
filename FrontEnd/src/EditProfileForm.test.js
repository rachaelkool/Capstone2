import React from "react";
import { render } from "@testing-library/react";
import EditProfileForm from "./EditProfileForm";


it("renders without crashing", function() {
    render(<EditProfileForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<EditProfileForm />);
    expect(asFragment()).toMatchSnapshot();
});