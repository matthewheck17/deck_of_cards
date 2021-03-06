// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessary items for the GameCard Component

// Created in US 1 - Updated in US 2


import React from "react";
import "../css/PlayingCard.css";
import "../css/GameCard.css";

// import red corner suit icons
import RedDiamondCorner from "../images/red-corners/diamond.png";
import RedHeartCorner from "../images/red-corners/heart.png";

// import black corner suit icons
import BlackClubCorner from "../images/black-corners/club.png";
import BlackSpadeCorner from "../images/black-corners/spade.png";

// import red large icons
import RedDiamondLarge from "../images/red-large/diamond.png";
import RedHeartLarge from "../images/red-large/heart.png";

// import black large icons
import BlackClubLarge from "../images/black-large/club.png";
import BlackSpadeLarge from "../images/black-large/spade.png";


class GameCard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      cardID: this.props.cardID,
      suit: this.props.suit,
      value: this.props.value,
      img: this.props.img,
      side: this.props.side,
      location: this.props.location,   //location will be used as the classname in order to set the location of the card in css
      slot: this.props.slot,
      status: this.props.status,
      playable: this.props.playable,
      passed: this.props.passed,
      handleCardClick: this.props.handleCardClick
    };
  }

  // handle a click on a card by selecting or deselecting it 
  handleClick = () => {
    if (this.props.location === "hand1"){
      this.props.handleCardClick(this.state.cardID); //call parent handle click component which properly handle click and deal with any sibling component needs
    }
  }

  render() {
    // define variables for card values
    var topLeftSuit;
    var topLeftValue;
    var bottomRightSuit;
    var bottomRightValue;
    var largeSuit;

    // assign card red suit
    if (this.state.suit === "Hearts") {
      topLeftSuit = <img src={RedHeartCorner} alt="suit of hearts" id="top-left-suit" draggable={false}/>;
      bottomRightSuit = <img src={RedHeartCorner} alt="suit of hearts" id="bottom-right-suit" draggable={false}/>;
      largeSuit = <img src={RedHeartLarge} alt="large heart" id="large-suit" draggable={false}/>
    } else if (this.state.suit === "Diamonds") {
      topLeftSuit = <img src={RedDiamondCorner} alt="suit of diamonds" id="top-left-suit" draggable={false}/>;
      bottomRightSuit = <img src={RedDiamondCorner} alt="suit of diamonds" id="bottom-right-suit" draggable={false}/>;
      largeSuit = <img src={RedDiamondLarge} alt="large heart" id="large-suit" draggable={false}/>
    } else if (this.state.suit === "Spades") {
        topLeftSuit = <img src={BlackSpadeCorner} alt="suit of spades" id="top-left-suit" draggable={false}/>;
        bottomRightSuit = <img src={BlackSpadeCorner} alt="suit of spades" id="bottom-right-suit" draggable={false}/>;
        largeSuit = <img src={BlackSpadeLarge} alt="large heart" id="large-suit" draggable={false}/>
    } else {
      topLeftSuit = <img src={BlackClubCorner} alt="suit of clubs" id="top-left-suit" draggable={false}/>;
      bottomRightSuit = <img src={BlackClubCorner} alt="suit of clubs" id="bottom-right-suit" draggable={false}/>;
      largeSuit = <img src={BlackClubLarge} alt="large heart" id="large-suit" draggable={false}/>
    }

    // assign card value based on props
    switch (this.state.value) {
      case "Ace":
        topLeftValue = <p className={this.state.suit} id="top-left-value">A</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">A</p>;
        break;
      case "2":
        topLeftValue = <p className={this.state.suit} id="top-left-value">2</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">2</p>;
        break;
      case "3":
        topLeftValue = <p className={this.state.suit} id="top-left-value">3</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">3</p>;
        break;
      case "4":
        topLeftValue = <p className={this.state.suit} id="top-left-value">4</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">4</p>;
        break;
      case "5":
        topLeftValue = <p className={this.state.suit} id="top-left-value">5</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">5</p>;
        break;
      case "6":
        topLeftValue = <p className={this.state.suit} id="top-left-value">6</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">6</p>;
        break;
      case "7":
        topLeftValue = <p className={this.state.suit} id="top-left-value">7</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">7</p>;
        break;
      case "8":
        topLeftValue = <p className={this.state.suit} id="top-left-value">8</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">8</p>;
        break;
      case "9":
        topLeftValue = <p className={this.state.suit} id="top-left-value">9</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">9</p>;
        break;
      case "10":
        topLeftValue = <p className={this.state.suit} id="top-left-value">10</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">10</p>;
        break;
      case "Jack":
        topLeftValue = <p className={this.state.suit} id="top-left-value">J</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">J</p>;
        break;
      case "Queen":
        topLeftValue = <p className={this.state.suit} id="top-left-value">Q</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">Q</p>;
        break;
      case "King":
        topLeftValue = <p className={this.state.suit} id="top-left-value">K</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">K</p>;
        break;
      case "Joker":
        topLeftValue = <p className={this.state.suit} id="top-left-value">JOKER</p>;
        bottomRightValue = <p className={this.state.suit} id="bottom-right-value">JOKER</p>;
        break;
      default:
        break;
    }

    var cardClass = this.props.location + " " + this.props.slot + " " + this.props.status + " " + this.props.playable + " " + this.props.passed;

    return (
      <div  >
      {this.props.side === "back" &&
        <div className={cardClass} id="back-of-card">
          <img alt="card back" src={this.props.img} draggable={false} id="back-image"/>
        </div>
      }
      {this.props.side === "front" &&
        <div className={cardClass} draggable={false} id="playing-card" onClick={this.handleClick}>
          {topLeftSuit}
          {bottomRightSuit}
          {topLeftValue}
          {bottomRightValue}
          {largeSuit}
        </div>
      }
      </div>
    );
  }
}

export default GameCard;
