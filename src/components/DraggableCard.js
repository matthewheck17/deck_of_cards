// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessary items for the Draggable Card Component

// Created before CIS 482

import React from "react";
import "../css/PlayingCard.css";
import Draggable from 'react-draggable';

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


class DraggableCard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      suit: this.props.suit,
      value: this.props.value,
      img: this.props.img,
      top: this.props.top,
      left: this.props.left,
      side: this.props.side,
      deltaX: null,
      deltaY: null,
      flipable: true,
      getUpdatedZIndex: this.props.getUpdatedZIndex,
      zIndex: 0
    };
  }

  // handles a click that wasn't dragged
  onClick = (e) => {
    if(this.state.flipable) {
      this.flipCard(e)
    } else {
      this.setState({flipable: true})
    }
  }

  // handles the start of a drag
  onStart = (e) => {
    this.setState({
      deltaX: e.clientX - this.state.left,
      deltaY: e.clientY - this.state.top,
      zIndex: this.props.getUpdatedZIndex()
    })
  }

  // handles the end of a drag
  onStop = (e) => {
    this.setState({
      top: e.clientY - this.state.deltaY,
      left: e.clientX - this.state.deltaX,
    })
  }

  // handles the drag
  onDrag = (e) => {
    this.setState({
      flipable:false
    })
  }

  // changes the state of the card to flip it
  flipCard = () => {
    var newSide = null;
    if (this.state.side === "back"){
      newSide = "front"
    } else {
      newSide = "back"
    }

    this.setState({
      side: newSide
    })
  }

  //handles re rendering the card
  handleRender() {
    this.setState({
      suit: this.props.suit,
      value: this.props.value,
      top: this.props.top,
      left: this.props.left,
      side: "back",
    })
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

    return (
      <Draggable
        position={{x: this.state.left, y: this.state.top}}
        onStart={this.onStart}
        onDrag={this.onDrag}
        onStop={this.onStop}>

      <div id="card-container" onClick={(e) => this.onClick(e)} style={{zIndex: this.state.zIndex}}>
      {this.state.side === "back" &&
        <div id="back-of-card">
          <img src={this.props.img} alt="prof cardback" id="back-image" draggable={false}/>
        </div>
      }

      {this.state.side === "front" &&
        <div id="playing-card">
          {topLeftSuit}
          {bottomRightSuit}
          {topLeftValue}
          {bottomRightValue}
          {largeSuit}
        </div>
      }
      </div>
      </Draggable>

    );
  }
}

export default DraggableCard;
