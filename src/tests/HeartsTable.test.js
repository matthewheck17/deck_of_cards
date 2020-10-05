import React from "react";
import {render, cleanup} from "@testing-library/react";
import HeartsTable from "../components/HeartsTable.js";
import '@testing-library/jest-dom';

//cleanup after each test is ran to unmount react trees mounted with render
afterEach(cleanup);

it ("US 1.1 - Testing that the Hearts Table component renders", () => {
  const {asFragment} = render(<HeartsTable/>)

  expect(asFragment()).toMatchSnapshot()
})
/*
it("US 1.1 - Testing that each player is dealt a hand of the 13 cards", () => {
    
})*/
