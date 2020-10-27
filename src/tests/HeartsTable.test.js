// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessart items for the HeartsTable Component

// Created in US 1 - Updated in US 2

import React from "react";
import {render, cleanup} from "@testing-library/react";
import HeartsTable from "../components/HeartsTable.js";
import GameCard from "../components/GameCard.js";
import '@testing-library/jest-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

// IMAGE IMPORTS
import Prof1 from "../images/backs/prof1.JPG"

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

describe('CYCLE 2 TESTS', () => {
  
  it("US 2.1 - Testing that hand1 cards are fanned out", () => {
    const wrapper = shallow(<HeartsTable/>);
    wrapper.find('h2').simulate('click'); //simulate click to get past menu
    const hand1Wrapper = wrapper.find('[location="hand1"]');  //find all elements in hand 1
    expect(hand1Wrapper.find('[slot="card1"]').length).toEqual(1); //check that there is one card in each slot
    expect(hand1Wrapper.find('[slot="card2"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card3"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card4"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card5"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card6"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card7"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card8"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card9"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card10"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card11"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card12"]').length).toEqual(1);
    expect(hand1Wrapper.find('[slot="card13"]').length).toEqual(1);
  })

  it("US 2.1 - Testing that hand2 cards are fanned out", () => {
    const wrapper = shallow(<HeartsTable/>);
    wrapper.find('h2').simulate('click'); //simulate click to get past menu
    const hand2Wrapper = wrapper.find('[location="hand2"]');  //find all elements in hand 2
    expect(hand2Wrapper.find('[slot="card1"]').length).toEqual(1); //check that there is one card in each slot
    expect(hand2Wrapper.find('[slot="card2"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card3"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card4"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card5"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card6"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card7"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card8"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card9"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card10"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card11"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card12"]').length).toEqual(1);
    expect(hand2Wrapper.find('[slot="card13"]').length).toEqual(1);
  })

  it("US 2.1 - Testing that hand3 cards are fanned out", () => {
    const wrapper = shallow(<HeartsTable/>);
    wrapper.find('h2').simulate('click'); //simulate click to get past menu
    const hand3Wrapper = wrapper.find('[location="hand3"]');  //find all elements in hand 3
    expect(hand3Wrapper.find('[slot="card1"]').length).toEqual(1); //check that there is one card in each slot
    expect(hand3Wrapper.find('[slot="card2"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card3"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card4"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card5"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card6"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card7"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card8"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card9"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card10"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card11"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card12"]').length).toEqual(1);
    expect(hand3Wrapper.find('[slot="card13"]').length).toEqual(1);
  })

  it("US 2.1 - Testing that hand4 cards are fanned out", () => {
    const wrapper = shallow(<HeartsTable/>);
    wrapper.find('h2').simulate('click'); //simulate click to get past menu
    const hand4Wrapper = wrapper.find('[location="hand4"]');  //find all elements in hand 4
    expect(hand4Wrapper.find('[slot="card1"]').length).toEqual(1); //check that there is one card in each slot
    expect(hand4Wrapper.find('[slot="card2"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card3"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card4"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card5"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card6"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card7"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card8"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card9"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card10"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card11"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card12"]').length).toEqual(1);
    expect(hand4Wrapper.find('[slot="card13"]').length).toEqual(1);
  })

  it("US 2.1 - Testing that hand1 cards are face up", () => {
    const wrapper = shallow(<HeartsTable/>);
    wrapper.find('h2').simulate('click'); //simulate click to get past menu
    const hand1Wrapper = wrapper.find('[location="hand1"]');  //find all elements in hand 1
    expect(hand1Wrapper.find('[side="front"]').length).toEqual(13); //check that each of the 13 cards are face up
  })

  it("US 2.1 - Testing that hand2, hand3, and hand4 cards are face down", () => {
    const wrapper = shallow(<HeartsTable/>);
    wrapper.find('h2').simulate('click'); //simulate click to get past menu
    const hand2Wrapper = wrapper.find('[location="hand2"]');  //find all elements in hand 2
    expect(hand2Wrapper.find('[side="back"]').length).toEqual(13); //check that each of the 13 cards are face up
    const hand3Wrapper = wrapper.find('[location="hand3"]');  //find all elements in hand 3
    expect(hand3Wrapper.find('[side="back"]').length).toEqual(13); //check that each of the 13 cards are face up
    const hand4Wrapper = wrapper.find('[location="hand4"]');  //find all elements in hand 4
    expect(hand4Wrapper.find('[side="back"]').length).toEqual(13); //check that each of the 13 cards are face up
  })

  it("US 2.2 - Testing no cards are selected by default", () => {

    const wrapper = shallow(<GameCard suit="heart" value="A" img={Prof1} side="front" location="hand1" slot="card1" selected=""/>);
    var instance = wrapper.instance();
    expect(wrapper.find('.selected').length).toEqual(0); //check nothing is selected
  })



  it("US 2.2 - Testing that the a card is selected when it is clicked", () => {

    const wrapper = shallow(<GameCard suit="heart" value="A" img={Prof1} side="front" location="hand1" slot="card1" selected=""/>);
    var instance = wrapper.instance();
    expect(instance.state.selected).toEqual(""); // check that the card is not selected
    const mockedEvent = { target: {wrapper}};
    wrapper.find("#playing-card").simulate("click", mockedEvent);
    expect(instance.state.selected).toEqual("selected"); // check that the card is selected
  })

  it("US 2.2 - Testing that the a selected card is deselected when it is clicked", () => {

    const wrapper = shallow(<GameCard suit="heart" value="A" img={Prof1} side="front" location="hand1" slot="card1" selected="selected"/>);
    var instance = wrapper.instance();
    expect(instance.state.selected).toEqual("selected"); // check that the card is selected
    const mockedEvent = { target: {wrapper}};
    wrapper.find("#playing-card").simulate("click", mockedEvent);
    expect(instance.state.selected).toEqual(""); // check that the card is not selected
  })
})
