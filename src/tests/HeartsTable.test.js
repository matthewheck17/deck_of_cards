import React from "react";
import {render, cleanup} from "@testing-library/react";
import HeartsTable from "../components/HeartsTable.js";
import '@testing-library/jest-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

//cleanup after each test is ran to unmount react trees mounted with render
afterEach(cleanup);

/* SET OF TESTS FOR FIRST DEVELOPMENT CYCLE */
describe('CYCLE 1 TESTS', () => {

  it ("US 1.1 - Testing that the Hearts Table component renders correctly", () => {
    const {asFragment} = render(<HeartsTable/>) // render a HeartsTable component
    expect(asFragment()).toMatchSnapshot()  //Check that it matches snapshot
  })
  
  configure({adapter: new Adapter()});
  it("US 1.1 - Testing that the start menu shows up and renders with the correct html elements", () => {
    const wrapper = shallow(<HeartsTable/>);
    expect(wrapper.find("div").length).toEqual(8);
  })

  it("US 1.2 - Testing that the start menu goes away after clicking on 'Begin'", () => {
    const wrapper = shallow(<HeartsTable/>);
    wrapper.find('h2').simulate('click');
    expect(wrapper.find("div").length).toEqual(7);
  })
  
  it("US 1.2 - Testing that player 1 is dealt a hand of the 13 cards", () => {
    const wrapper = shallow(<HeartsTable/>);
    var instance = wrapper.instance();
    var cardsInHand = instance.state.hand1.length
    expect(cardsInHand).toEqual(13);
  })

  it("US 1.2 - Testing that player 2 is dealt a hand of the 13 cards", () => {
    const wrapper = shallow(<HeartsTable/>);
    var instance = wrapper.instance();
    var cardsInHand = instance.state.hand2.length
    expect(cardsInHand).toEqual(13);
  })

  it("US 1.2 - Testing that player 3 is dealt a hand of the 13 cards", () => {
    const wrapper = shallow(<HeartsTable/>);
    var instance = wrapper.instance();
    var cardsInHand = instance.state.hand3.length
    expect(cardsInHand).toEqual(13);
  })

  it("US 1.2 - Testing that player 4 is dealt a hand of the 13 cards", () => {
    const wrapper = shallow(<HeartsTable/>);
    var instance = wrapper.instance();
    var cardsInHand = instance.state.hand4.length
    expect(cardsInHand).toEqual(13);
  })
})
