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


//cleanup after each test is ran to unmount react trees mounted with render
afterEach(cleanup);
configure({adapter: new Adapter()}); //configure adapter
const handSize = 13


describe('CYCLE 3 TESTS', () => {
  
    it("US 3.1 - Testing that all cards in the hand are sorted properly", () => {
        const wrapper = shallow(<HeartsTable/>); //simulate a hearts table component
        wrapper.find('h2').simulate('click'); //simulate click to get past menu
        const hand1Wrapper = wrapper.find('[location="hand1"]');  //find all elements in hand 1

        let sortingError = false; //set a boolean to keep track of any sorting issues

        for (let index= 1; index < handSize; index++){ //loop through all items in the hand
            let card1Props = hand1Wrapper.find('[slot="card' + index + '"]').props(); //find card at index
            let value1 = card1Props.value;
            let suit1 = card1Props.suit;
            let card2Props = hand1Wrapper.find('[slot="card' + (parseInt(index) + parseInt(1)) +'"]').props(); //find card at index+1
            let value2 = card2Props.value;
            let suit2 = card2Props.suit;

            if (suit1 === suit2){ // if card suits are the same, check if values are ordered properly
                if (Number.isInteger(value1) && Number.isInteger(value2)){ //if both are ints, simple comparison
                    sortingError = (value1 < value2);
                } else if (Number.isInteger(value2)){ // if just value two is an int then sorting failed
                    sortingError = true;
                } //dont need to check if just value1 is an int because that is correct sorting
            } else { //if suits are different, check that they are ordered correctly
                if (suit1 === "diamond"){ //don't need to check heart, any following suit would be correct
                    if (suit2 === "heart"){ //check that heart doesn't come after diamond
                        sortingError = true;              
                    }
                } else if (suit1 === "club"){
                    if (suit2 === "heart" || suit2 === "diamond"){ //check that heart or diamond doesn't come after club
                        sortingError = true;
                    }
                } else if (suit1 === "spade"){
                    if (suit2 === "heart" || suit2 === "diamond" || suit2 === "club"){ //check that heart diamond or club doesn't come after spade
                        sortingError = true;
                    }
                }
            }
            
        }
        expect(sortingError).toEqual(false);
    })
  })