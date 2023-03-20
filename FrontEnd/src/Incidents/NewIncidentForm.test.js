import React from "react";
import { render } from "@testing-library/react";
import NewIncidentForm from "./NewIncidentForm";


it("renders without crashing", function() {
    render(<NewIncidentForm />);
});
  
it("matches snapshot", function() {
    const { asFragment } = render(<NewIncidentForm />);
    expect(asFragment()).toMatchSnapshot();
});