// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessary items for the HeartsTable Component

// Created in US 1 - Updated in US 2

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

    //create array to keep track of each card location
    var cardStatus = [];
    const deckSize = 52;
    for (let i = 0; i < deckSize; i++){
      cardStatus[i] = "in-hand";
    }

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

    hand1 = this.sortHand(hand1);

    // create arrays to keep track of the slots of the cards in each hand
    // NOTE: even though they are all initially the same, unique arrays had to initialize each state variable or else they would be tied together (ie changing the state of hand1Card slots would also change 2,3, and 4)
    var hand1CardSlots = [];  //create array containing card1-card13
    for (let i = 0; i < handSize; i++){
      hand1CardSlots[i] = "card" + (parseInt(i) + 1);
    }

    var hand2CardSlots = [];  //create array containing card1-card13
    for (let i = 0; i < handSize; i++){
      hand2CardSlots[i] = "card" + (parseInt(i) + 1);
    }

    var hand3CardSlots = [];  //create array containing card1-card13
    for (let i = 0; i < handSize; i++){
      hand3CardSlots[i] = "card" + (parseInt(i) + 1);
    }

    var hand4CardSlots = [];  //create array containing card1-card13
    for (let i = 0; i < handSize; i++){
      hand4CardSlots[i] = "card" + (parseInt(i) + 1);
    }

    //set the state of the component
    this.state = {
      hand1: hand1,
      hand2: hand2,
      hand3: hand3,
      hand4: hand4,
      handSize: 13,
      cardStatus: cardStatus,
      hand1CardSlots: hand1CardSlots,
      hand2CardSlots: hand2CardSlots,
      hand3CardSlots: hand3CardSlots,
      hand4CardSlots: hand4CardSlots,
      img: this.props.img,
      menu: "showing"
    }

    this.handleCardClick = this.handleCardClick.bind(this);
    this.playCard = this.playCard.bind(this);
  }

  //function to exit the menu
  exitMenu = () => {
    this.setState({
      menu: "notShowing"
    })
  }

  //this function will sort the hand array
  sortHand = (hand) => {
    for (var i = hand.length-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(this.compareCard(hand[j-1][0], hand[j][0], hand[j-1][1], hand[j][1])){
          var temp = hand[j-1];
          hand[j-1] = hand[j];
          hand[j] = temp;
        }
      }
    }
    return hand;
  }

  // function is given two suits via a and b and compares them and outputs true or false accordingly
  // it will output the cards in the following order heart, diamond, club, spade (this is just an arbitrary order I chose)
  compareCard(aSuit, bSuit, aValue, bValue) {
    if (aSuit === "heart"){
      if (bSuit === "heart"){
        return (this.compareSameSuit(aValue, bValue)); //compare values if both a and b are hearts
      } else {
        return false; //don't swap because hearts come first
      }
    }

    if (aSuit === "diamond"){
      if (bSuit === "diamond"){
        return (this.compareSameSuit(aValue, bValue)); //compare values if both a and b are diamonds
      }
      if (bSuit === "heart"){
        return true; // swap because hearts come before diamonds
      } else {
        return false; //don't swap
      }
    }

    if (aSuit === "club"){
      if (bSuit === "club"){
        return (this.compareSameSuit(aValue, bValue)); //compare values if both a and b are diamonds
      }
      if (bSuit === "heart" || bSuit === "diamond"){
        return true; // swap because hearts and diamonds come before clubs
      } else {
        return false;
      }
    }

    if (aSuit === "spade"){
      if (bSuit === "spade"){
        return (this.compareSameSuit(aValue, bValue));  //compare values if both a and b are spades
      }
      if (bSuit === "heart" || bSuit === "diamond" || bSuit === "club"){
        return true; // swap because hearts, diamonds, and clubs come before spades
      }
    }
  }

  // this function is called to compare values of the same suit
  compareSameSuit (aValue, bValue){
    let faceCard = this.findFaceCard(aValue, bValue); //find if and where possible facecards are 
    if (faceCard === "a"){
      return true; // just a is a facecard therefore swap
    } else if (faceCard === "b"){
      return false;  // just b is a facecard therefore don't swap
    } else if (faceCard === "both"){
      return (this.compareFaceCard(aValue, bValue)); //both are facecards so compare facecard values
    } else { 
      return (parseInt(aValue) > parseInt(bValue)); //neither are face cards, just compare integers
    }
  }

  //this function takes two card values and outputs a, b, both, or none accordingly
  findFaceCard(aValue, bValue) {
    if (aValue === "A" || aValue ==="King" || aValue === "Queen" || aValue === "Jack"){ //if a is a face card
      if (bValue === "A" || bValue === "King" || bValue === "Queen" || bValue === "Jack"){ //if b is a face card as well
        return "both";
      }
      return "a" //only a
    } else if (bValue === "A" || bValue === "King" || bValue === "Queen" || bValue === "Jack"){
      return "b"; //only b
    }
    return "none"; //neither
  }

  // this function takes two face card values and returns true if they should be swapped 
  // they should be swapped when a is the be the larger card. order is as follows (J, Q, K, A)
  compareFaceCard(aValue, bValue) {
    if (aValue === "Jack"){ //jack is first don't swap
      return false;
    }

    if (aValue === "Queen"){
      if (bValue === "Jack"){
        return true; //jack comes before queen therefore swap
      } else {
        return false;
      }
    }

    if (aValue === "King"){
      if (bValue === "Queen" || bValue === "Jack"){
        return true; //jack and queen come before king therefore swap
      } else {
        return false;
      }
    }

    if (aValue === "A"){
      if (bValue === "King" || bValue === "Queen" || bValue === "Jack"){
        return true;  //jack, queen, and king come before ace therefore swap
      } else {
        return false;
      }
    }
  }

  deal = () => {
    // Initialize empty deck array
    let cards = [];

    // 4 for loops to initialize each game card component with the card suit and value taken from its respective player hand array
    for (let i=0; i < this.state.hand1.length; i++) {
      cards.push(<GameCard key={i} cardID={i} suit={this.state.hand1[i][0]} value={this.state.hand1[i][1]} img={this.state.img} side="front" location="hand1" slot={this.state.hand1CardSlots[i]} status={this.state.cardStatus[i]} handleCardClick={this.handleCardClick}/>)
    }

    for (let i=0; i < this.state.hand2.length; i++) {
      cards.push(<GameCard key={i+this.state.handSize} cardID={i+this.state.handSize} suit={this.state.hand1[i][0]} value={this.state.hand1[i][1]} img={this.state.img} side="back" location="hand2" slot={this.state.hand2CardSlots[i]} status={this.state.cardStatus[i+this.state.handSize]}/>)
    }

    for (let i=0; i < this.state.hand3.length; i++) {
      cards.push(<GameCard key={i+(2*this.state.handSize)} cardID={i+(2*this.state.handSize)} suit={this.state.hand1[i][0]} value={this.state.hand1[i][1]} img={this.state.img} side="back" location="hand3" slot={this.state.hand3CardSlots[i]} status={this.state.cardStatus[i+(2*this.state.handSize)]}/>)
    }

    for (let i=0; i < this.state.hand4.length; i++) {
      cards.push(<GameCard key={i+(3*this.state.handSize)} cardID={i+(3*this.state.handSize)} suit={this.state.hand1[i][0]} value={this.state.hand1[i][1]} img={this.state.img} side="back" location="hand4" slot={this.state.hand4CardSlots[i]} status={this.state.cardStatus[i+(3*this.state.handSize)]}/>)
    }

    return cards;
  }

  // function called from GameCard component when a card is clicked on
  // this updates the cardStatus array to deselect any selected cards and select clicked card if it was not selected
  handleCardClick(clickedCardID) {
    let updatedCardStatus = this.state.cardStatus;

    if (this.state.hand1CardSlots[clickedCardID] === "played"){
      return;  //don't select if card has already been played
    }

    if (updatedCardStatus[clickedCardID] === "selected"){
      updatedCardStatus[clickedCardID] = "in-hand";
      document.getElementById("play-button").classList.remove('visible'); // hide play card button
    } else if (updatedCardStatus[clickedCardID] === "in-hand"){
      while (updatedCardStatus.includes("selected")){
        let selectedIndex = updatedCardStatus.indexOf("selected");
        updatedCardStatus[selectedIndex] = "in-hand";
      }
      updatedCardStatus[clickedCardID] = "selected";
      document.getElementById("play-button").classList.add('visible'); // show play card button
    }

    this.setState({
      cardStatus: updatedCardStatus
    })
  }

  // handles a click anywhere on the table, it will deselect the selected card if there is one
  deselect = (e) => {
    if (!e.target.className.includes("hand1")) { //if hand1 was not clicked on
      let updatedCardStatus = this.state.cardStatus; //copy card status array
      while (updatedCardStatus.includes("selected")){  //while there are cards selected, change to in-hand
        let selectedIndex = updatedCardStatus.indexOf("selected");
        updatedCardStatus[selectedIndex] = "in-hand";
      }
      var playButton = document.getElementById("play-button"); //find play button
      playButton.classList.remove('visible'); // remove visible class
      //update state to new array
      this.setState({
        cardStatus: updatedCardStatus
      })
    }
  }

  // This function handles a click on the play card button.
  // it will cause the selected card to move from the player's hand to the center of the table
  // and it will cause remaining cards to shift towards the center of the player's hand
  playCard() {
    let selectedCard = this.state.cardStatus.indexOf("selected"); // get the index of the selected card
    let cardsToShift = []; //initialize empty array to hold the card #'s of the cards that need shifted
    var cardSlots = this.state.hand1CardSlots; // create array to hold updated card slots

    if (selectedCard < Math.ceil(this.state.handSize/2)){ //if selected card is left of center
      for (let index = 0; index < selectedCard; index++){
        cardsToShift[index] = index; //fill out array from 0 to the last card that needs shifted
      }

      cardSlots[selectedCard] = "played"; //mark selected card as played
      let totalCardsToShift = cardsToShift.length;

      for (let index = 0; index < totalCardsToShift; index++){
        if (cardSlots[cardsToShift[0]] !== "played"){  //if the card has not already been played
          let currentCardSlot = cardSlots[cardsToShift[0]].split('d').pop();  // this will get the number of the slot currently
          cardSlots[cardsToShift[0]] = "card" + (parseInt(currentCardSlot) + 1);
        }
        cardsToShift.shift(); //remove first element from cardsToShift
      }

    } else { // selected card is right of center

      for (let index = 0; index + parseInt(selectedCard) + 1 < this.state.handSize; index++){
        cardsToShift[index] = index + parseInt(selectedCard) + 1; //fill out array from 1 + selected to 12 (last card)
      }

      cardSlots[selectedCard] = "played"; //mark selected card as played
      let totalCardsToShift = cardsToShift.length;

      for (let index = 0; index < totalCardsToShift; index++){
        if (cardSlots[cardsToShift[0]] !== "played"){  //if the card has not already been played
          let currentCardSlot = cardSlots[cardsToShift[0]].split('d').pop();  // this will get the number of the slot currently
          cardSlots[cardsToShift[0]] = "card" + (parseInt(currentCardSlot) - 1);
        }
        cardsToShift.shift(); //remove first element from cardsToShift
      }
    }

    this.setState({
      hand1CardSlots: cardSlots
    })
  }


  render() {
    // game container onClick={(e) => this.deselect(e)}
    return (
      <div id='game-container' onClick={(e) => this.deselect(e)}>
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

        <div id="play-button" onClick={this.playCard}>Play Card</div>

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
