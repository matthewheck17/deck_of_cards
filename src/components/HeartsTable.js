// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessart items for the HeartsTable Component

// Created in US 1.1

// SYSTEM IMPORTS
import React from "react";

// CUSTOM IMPORTS
import GameCard from "./GameCard.js";
import "../css/HeartsTable.css";
import HeartsLogo from "../images/hearts/hearts-logo.png";

class HeartsTable extends React.Component {

  constructor(props) {
    super(props)
    // array holding all cards
    var allCards = [
      ["club","A"],["club","2"],["club","3"],["club","4"],["club","5"],["club","6"],["club","7"],["club","8"],["club","9"],["club","10"],["club","Jack"],["club","Queen"],["club","King"],
      ["diamond","A"],["diamond","2"],["diamond","3"],["diamond","4"],["diamond","5"],["diamond","6"],["diamond","7"],["diamond","8"],["diamond","9"],["diamond","10"],["diamond","Jack"],["diamond","Queen"],["diamond","King"],
      ["spade","A"],["spade","2"],["spade","3"],["spade","4"],["spade","5"],["spade","6"],["spade","7"],["spade","8"],["spade","9"],["spade","10"],["spade","Jack"],["spade","Queen"],["spade","King"],
      ["heart","A"],["heart","2"],["heart","3"],["heart","4"],["heart","5"],["heart","6"],["heart","7"],["heart","8"],["heart","9"],["heart","10"],["heart","Jack"],["heart","Queen"],["heart","King"]
    ];

    // 4 empty arrays that will hold player hands
    var hand1 = [];
    var hand2 = [];
    var hand3 = [];
    var hand4 = [];
    const handSize = 13; //constant holds the number of cards in a hand

    // loop iterates the number of times that the handsize is
    for(var index = 0; index < handSize; index++){
      var rand = Math.floor(Math.random() * (allCards.length)); //get a random card from the allCards array
      hand1.push(allCards[rand]);  //push it to hand1
      allCards.splice(rand, 1);  //remove it from the allCards array
      rand = Math.floor(Math.random() * (allCards.length)); //repeat the process for the other three hands
      hand2.push(allCards[rand]);
      allCards.splice(rand, 1);
      rand = Math.floor(Math.random() * (allCards.length));
      hand3.push(allCards[rand]);
      allCards.splice(rand, 1);
      rand = Math.floor(Math.random() * (allCards.length));
      hand4.push(allCards[rand]);
      allCards.splice(rand, 1);
    }

    //set the state of the component
    this.state = {
      hand1: hand1,
      hand2: hand2,
      hand3: hand3,
      hand4: hand4,
      handSize: 13,
      img: this.props.img,
      menu: "showing"
    }
  }

  //function to exit the menu
  exitMenu = () => {
    this.setState({
      menu: "notShowing"
    })
  }

  deal(){
    // Initialize empty deck array
    let cards = [];

    // 4 for loops to initialize each game card component with the card suit and value taken from its respective player hand array
    for (let i=0; i < this.state.hand1.length; i++) {
      cards.push(<GameCard ref={'card'+i} key={i} suit={this.state.hand1[i][0]} value={this.state.hand1[i][1]} img={this.state.img} side="front" location="hand1"/>)
    }

    for (let i=0; i < this.state.hand2.length; i++) {
      cards.push(<GameCard ref={'card'+i+this.state.handSize-1} key={i+this.state.handSize-1} suit={this.state.hand1[i][0]} value={this.state.hand1[i][1]} img={this.state.img} side="back" location="hand2"/>)
    }

    for (let i=0; i < this.state.hand3.length; i++) {
      cards.push(<GameCard ref={'card'+i+(2*this.state.handSize)-1} key={i+(2*this.state.handSize)-1} suit={this.state.hand1[i][0]} value={this.state.hand1[i][1]} img={this.state.img} side="back" location="hand3"/>)
    }

    for (let i=0; i < this.state.hand4.length; i++) {
      cards.push(<GameCard ref={'card'+i+(3*this.state.handSize)-1} key={i+(3*this.state.handSize)-1} suit={this.state.hand1[i][0]} value={this.state.hand1[i][1]} img={this.state.img} side="back" location="hand4"/>)
    }

    return cards;
  }



  render() {
    return (
      <div id='game-container'>
        {/* Menu */}
        {this.state.menu === "showing" &&
          <div>
            <GameCard ref={"mock-deck"} key={"mock-deck"} suit={"spade"} value={"Queen"} img={this.state.img} side="back" location="deck"/>
            <div id='start-menu'>
              <h2 id="begin-button" className="start-menu-text" onClick={this.exitMenu}>Begin</h2>
            </div>
          </div>
        }
        <div id="playing-area">
          <img id="hearts-logo" src={HeartsLogo} href="hearts-logo" alt="heart"/>
        </div>

        <div id="player1-hand" className="player-hand"></div>

        <div id="player2-hand" className="player-hand"></div>

        <div id="player3-hand" className="player-hand"></div>

        <div id="player4-hand" className="player-hand"></div>
        {this.state.menu === "notShowing" &&
          <div>
            {this.deal()}
          </div>
        }
      </div>
    );
  }
}

export default HeartsTable;
