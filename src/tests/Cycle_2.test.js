// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessart items for the HeartsTable Component

// Created in US 1 - Updated in US 2

import React from "react";
import {render, cleanup} from "@testing-library/react";
import HeartsTable from "../components/HeartsTable.js";
import GameCard from "../components/GameCard.js";
import '@testing-library/jest-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// IMAGE IMPORTS
import Prof1 from "../images/backs/prof1.JPG"

//cleanup after each test is ran to unmount react trees mounted with render
afterEach(cleanup);
configure({adapter: new Adapter()}); //configure adapter

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
  