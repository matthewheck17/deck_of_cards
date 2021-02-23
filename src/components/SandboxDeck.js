// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessary items for the SandboxDeck Component

// Created before CIS 482

// SYSTEM IMPORTS
import React from "react";

// CUSTOM IMPORTS
import DraggableCard from "./DraggableCard.js";

var clickCounter = 0;

class SandboxDeck extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      suitVals: [
        ["Clubs","Ace"],["Clubs","2"],["Clubs","3"],["Clubs","4"],["Clubs","5"],["Clubs","6"],["Clubs","7"],["Clubs","8"],["Clubs","9"],["Clubs","10"],["Clubs","Jack"],["Clubs","Queen"],["Clubs","King"],
        ["Diamonds","Ace"],["Diamonds","2"],["Diamonds","3"],["Diamonds","4"],["Diamonds","5"],["Diamonds","6"],["Diamonds","7"],["Diamonds","8"],["Diamonds","9"],["Diamonds","10"],["Diamonds","Jack"],["Diamonds","Queen"],["Diamonds","King"],
        ["Spades","Ace"],["Spades","2"],["Spades","3"],["Spades","4"],["Spades","5"],["Spades","6"],["Spades","7"],["Spades","8"],["Spades","9"],["Spades","10"],["Spades","Jack"],["Spades","Queen"],["Spades","King"],
        ["Hearts","Ace"],["Hearts","2"],["Hearts","3"],["Hearts","4"],["Hearts","5"],["Hearts","6"],["Hearts","7"],["Hearts","8"],["Hearts","9"],["Hearts","10"],["Hearts","Jack"],["Hearts","Queen"],["Hearts","King"]
      ],
      img: this.props.img,
      clickCounter: 0
    }
  }

  /* Shuffle cards and revert to original positions */
  shuffle = () => {
    // get & initialize needed objects
    var currentSuitVals = [...this.state.suitVals];
    var newOrder = [];

    // Create new order of cards
    while(currentSuitVals.length !== 0){
      var rand = Math.floor(Math.random() * (currentSuitVals.length));
      newOrder.push(currentSuitVals[rand]);
      currentSuitVals.splice(rand, 1);
    }

    // Set state using new order
    this.setState({
      suitVals: newOrder
    });

    // Set timeout while shuffle occurs
    setTimeout(() =>{
      for(var i=0;i<this.state.suitVals.length;i++){
        this.refs['card'+i].handleRender();
      }
    });
  }


  /* Return deck as array of <PlayingCard/> components */
  createDeck(){
    // Initialize empty deck array
    let deck = [];

    for (let i=0; i < this.state.suitVals.length; i++) {
      deck.push(<DraggableCard ref={'card'+i} key={i} suit={this.state.suitVals[i][0]} value={this.state.suitVals[i][1]} img={this.state.img} top={(window.innerHeight / 2) - 140} left={(window.innerWidth / 2) - 53} getUpdatedZIndex={this.getUpdatedZIndex}/>)
    }
    
    setTimeout(() =>{
      for(var i=0;i<this.state.suitVals.length;i++){
        this.refs['card'+i].handleRender();
      }
    });

    return deck;
  }

  getUpdatedZIndex = () => {
    clickCounter++;
    return clickCounter;
  }

  render() {
    return (
      <div id='deck'>
        {this.createDeck()}
      </div>
    );
  }
}

export default SandboxDeck;
