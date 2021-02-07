// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessary items for the HeartsTable Component

// Created in US 1 - Updated in US 5

// SYSTEM IMPORTS
import React from "react";

// CUSTOM IMPORTS
import GameCard from "./GameCard.js";
import "../css/HeartsTable.css";
import HeartsLogo from "../images/hearts/hearts-logo.png";

const HANDSIZE = 13;
const DECKSIZE = 52;
const PLAYERCOUNT = 4;
const SUIT = 0;
const VALUE = 1;
const COMP = 2;
const USER = 1;

class HeartsTable extends React.Component {

  constructor(props) {
    super(props)
    // array holding all cards
    let allCards = [
      ["heart","2", 1],["heart","3", 2],["heart","4", 3],["heart","5", 4],["heart","6", 5],["heart","7", 6],["heart","8", 7],["heart","9", 8],["heart","10", 9],["heart","Jack", 10],["heart","Queen", 11],["heart","King", 12], ["heart","A", 13],
      ["diamond","2", 14],["diamond","3", 15],["diamond","4", 16],["diamond","5", 17],["diamond","6", 18],["diamond","7", 19],["diamond","8", 20],["diamond","9", 21],["diamond","10", 22],["diamond","Jack", 23],["diamond","Queen", 24],["diamond","King", 25], ["diamond","A", 26],
      ["club","2", 27],["club","3", 28],["club","4", 29],["club","5", 30],["club","6", 31],["club","7", 32],["club","8", 33],["club","9", 34],["club","10", 35],["club","Jack", 36],["club","Queen", 37],["club","King", 38], ["club","A", 39],
      ["spade","2", 40],["spade","3", 41],["spade","4", 42],["spade","5", 43],["spade","6", 44],["spade","7", 45],["spade","8", 46],["spade","9", 47],["spade","10", 48],["spade","Jack", 49],["spade","Queen", 50],["spade","King", 51],["spade","A", 52]
    ];

    // 4 empty arrays that will hold player hands
    let hand1 = [];
    let hand2 = [];
    let hand3 = [];
    let hand4 = [];

    //create array to keep track of each card location
    let cardStatus = [];
    let playable = [];
    for (let i = 0; i < DECKSIZE; i++){
      cardStatus[i] = "in-hand";
      playable[i] = "playable";
    }
    
    // loop iterates the number of times that the handsize is
    for(let index = 0; index < HANDSIZE; index++){
      let rand = Math.floor(Math.random() * (allCards.length)); //get a random card from the allCards array
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

    //create array of all cards (index 0-12 hand1, 13-25 hand2, etc...)
    let allHands = hand1.concat(hand2);
    allHands = allHands.concat(hand3);
    allHands = allHands.concat(hand4);

    // create arrays to keep track of the slots of the cards and the hand that each card is in and whether it is front or backside up
    let cardSlots = [];  // array containing the slots of each card
    let handID = []; // array containing the handID of each card
    let upside = []; // array containing the side of each card (front or back)
    for (let i = 0; i < HANDSIZE; i++){
      cardSlots[i] = "card" + (parseInt(i) + 1);
      handID[i] = "hand1";
      upside[i] = "front";
    }

    for (let i = 0; i < HANDSIZE; i++){
      cardSlots[i+HANDSIZE] = "card" + (parseInt(i) + 1);
      handID[i+HANDSIZE] = "hand2";
      upside[i+HANDSIZE] = "back";
    }

    for (let i = 0; i < HANDSIZE; i++){
      cardSlots[i+2*HANDSIZE] = "card" + (parseInt(i) + 1);
      handID[i+2*HANDSIZE] = "hand3";
      upside[i+2*HANDSIZE] = "back";
    }

    for (let i = 0; i < HANDSIZE; i++){
      cardSlots[i+3*HANDSIZE] = "card" + (parseInt(i) + 1);
      handID[i+3*HANDSIZE] = "hand4";
      upside[i+3*HANDSIZE] = "back";
    }

    //set the state of the component
    this.state = {
      hand1: hand1,
      hand2: hand2,
      hand3: hand3,
      hand4: hand4,
      allHands: allHands,
      cardStatus: cardStatus,
      handID: handID,
      upside: upside,
      cardSlots: cardSlots,
      playable: playable,
      img: this.props.img,
      menu: "showing",
      gamePhase: "passing",
      playerTurn: null,
      completedRounds: 0,
      playedThisRound: 0,
      startedRoundPlayer: null,
      leadSuit: null,
      userCardPlayed: false
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
    for (let i = hand.length-1; i>=0; i--){
      for(let j = 1; j<=i; j++){
        if(hand[j-1][COMP] > hand[j][2]){
          let temp = hand[j-1];
          hand[j-1] = hand[j];
          hand[j] = temp;
        }
      }
    }
    return hand;
  }

  //function that renders each card based on the component state
  renderCards = () => {
    // Initialize empty deck array
    let cards = [];
    let cardIDIndex = 0;


    // 4 for loops to initialize each game card component with the card suit and value taken from its respective player hand array
    for (let i=0; i < this.state.hand1.length; i++) {
      cards.push(<GameCard key={cardIDIndex} cardID={cardIDIndex} suit={this.state.hand1[i][SUIT]} value={this.state.hand1[i][VALUE]} img={this.state.img} side={this.state.upside[cardIDIndex]} location={this.state.handID[cardIDIndex]} slot={this.state.cardSlots[cardIDIndex]} status={this.state.cardStatus[cardIDIndex]} playable={this.state.playable[cardIDIndex]} handleCardClick={this.handleCardClick}/>)
      cardIDIndex++;
    }

    for (let i=0; i < this.state.hand2.length; i++) {
      cards.push(<GameCard key={cardIDIndex} cardID={cardIDIndex} suit={this.state.hand2[i][SUIT]} value={this.state.hand2[i][VALUE]} img={this.state.img} side={this.state.upside[cardIDIndex]} location={this.state.handID[cardIDIndex]} slot={this.state.cardSlots[cardIDIndex]} status={this.state.cardStatus[cardIDIndex]} playable={this.state.playable[cardIDIndex]} handleCardClick={this.handleCardClick}/>)
      cardIDIndex++;
    }

    for (let i=0; i < this.state.hand3.length; i++) {
      cards.push(<GameCard key={cardIDIndex} cardID={cardIDIndex} suit={this.state.hand3[i][SUIT]} value={this.state.hand3[i][VALUE]} img={this.state.img} side={this.state.upside[cardIDIndex]} location={this.state.handID[cardIDIndex]} slot={this.state.cardSlots[cardIDIndex]} status={this.state.cardStatus[cardIDIndex]} playable={this.state.playable[cardIDIndex]} handleCardClick={this.handleCardClick}/>)
      cardIDIndex++;
    }

    for (let i=0; i < this.state.hand4.length; i++) {
      cards.push(<GameCard key={cardIDIndex} cardID={cardIDIndex} suit={this.state.hand4[i][SUIT]} value={this.state.hand4[i][VALUE]} img={this.state.img} side={this.state.upside[cardIDIndex]} location={this.state.handID[cardIDIndex]} slot={this.state.cardSlots[cardIDIndex]} status={this.state.cardStatus[cardIDIndex]} playable={this.state.playable[cardIDIndex]} handleCardClick={this.handleCardClick}/>)
      cardIDIndex++;
    }

    return cards;
  }

  // function called from GameCard component when a card is clicked on 
  // this updates the cardStatus array to deselect any selected cards and select clicked card if it was not selected
  handleCardClick(clickedCardID) {
    let updatedCardStatus = this.state.cardStatus;

    // there is selected1 and selected2 to keep track of the order in which the cards were selected, selected2 is the second card selected
    // This is kept track of so when two cards are selected and a third card is clicked the first selected card will be deselected
    if (this.state.gamePhase === "passing"){ //if in the passing stage
      if (updatedCardStatus[clickedCardID] === "selected2"){ 
        updatedCardStatus[clickedCardID] = "in-hand"; //just deselect if second selected card is clicked
        document.getElementById("pass-button").classList.remove('visible'); // hide pass card button
      } else if (updatedCardStatus[clickedCardID] === "selected1") {
        if (updatedCardStatus.includes("selected2")){ //if two cards are selected and first card is clicked
          let selectedIndex = updatedCardStatus.indexOf("selected2");
          updatedCardStatus[selectedIndex] = "selected1" //change second selected card to first selected card
          document.getElementById("pass-button").classList.remove('visible'); // hide pass card button
        }
        updatedCardStatus[clickedCardID] = "in-hand"; // deselect clicked card in both cases
      } else if (updatedCardStatus[clickedCardID] === "in-hand"){
        if (updatedCardStatus.includes("selected1") && updatedCardStatus.includes("selected2") ){ //if two cards already selected
          let selectedIndex = updatedCardStatus.indexOf("selected1");
          updatedCardStatus[selectedIndex] = "in-hand"; //deselect first selected card
          selectedIndex = updatedCardStatus.indexOf("selected2");
          updatedCardStatus[selectedIndex] = "selected1"; //change second selected card to first
          updatedCardStatus[clickedCardID] = "selected2"; //set clicked card to second selected card
          document.getElementById("pass-button").classList.add('visible'); // show pass card button
        } else if (updatedCardStatus.includes("selected1")){ //if just 1 card is selected
          updatedCardStatus[clickedCardID] = "selected2"; //set clicked card to second selected card
          document.getElementById("pass-button").classList.add('visible'); // show pass cards button
        } else {
          updatedCardStatus[clickedCardID] = "selected1"; //set clicked card to first selected card
        }
      }

    } else if (this.state.gamePhase === "playing"){
      if (this.state.cardSlots[clickedCardID] === "played" || this.state.playerTurn !== USER){
        return;  //don't select if card has already been played or if it is not the user's turn
      }

      if (this.state.playable[clickedCardID] === "playable"){
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
      }
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
      let playButton = document.getElementById("play-button"); //find play button
      playButton.classList.remove('visible'); // remove visible class
      //update state to new array
      this.setState({
        cardStatus: updatedCardStatus
      })
    }
  }

  //handles passing the users cards to player 4 and calls the function to make cpus pass cards
  passCards = () => {
    let updatedHandID = this.state.handID; //copy card status array
    let updatedUpside = this.state.upside; //copy upside array
    let updatedCardSlots = this.state.cardSlots; //copy cardSlots array
    let selectedCard1 = this.state.cardStatus.indexOf("selected1"); // get the index of the first selected card
    let selectedCard2 = this.state.cardStatus.indexOf("selected2"); // get the index of the second selected card

    this.passCPUCards();

    //change hand id of selected cards to hand4 and side to be back and slot to be 1 and 2
    updatedHandID[selectedCard1] = "hand4";
    updatedHandID[selectedCard2] = "hand4";
    updatedUpside[selectedCard1] = "back";
    updatedUpside[selectedCard2] = "back";
    updatedCardSlots[selectedCard1] = "card1";
    updatedCardSlots[selectedCard2] = "card2";

    //hide instructions/button
    document.getElementById("pass-instructions").classList.remove('visible'); // hide instructions
    document.getElementById("pass-button").classList.remove('visible'); // hide pass cards button
    
    //update state arrays
    this.setState({
      handID: updatedHandID,
      gamePhase: "playing"
    },
      this.resortH1()
    );
  }

  //handles selecting and passing cards for computer players
  passCPUCards() {
    let updatedHandID = this.state.handID; //copy handID array
    let updatedUpside = this.state.upside; //copy upside array
    let updatedCardSlots = this.state.cardSlots //copy cardSlots array
    let cardIDIncrement = HANDSIZE;
    //select two random cards for each cpu and update its handID so that it gets passed
    for (let playerIndex = 1; playerIndex < PLAYERCOUNT; playerIndex++){
      let hand = "hand" + playerIndex;
      let cpuSelect1 = Math.floor(Math.random() * HANDSIZE) + cardIDIncrement;
      let cpuSelect2 = Math.floor(Math.random() * HANDSIZE) + cardIDIncrement;
      while (cpuSelect1 === cpuSelect2) { //keep picking until a unique card is picked
        cpuSelect2 = Math.floor(Math.random() * HANDSIZE) + cardIDIncrement;
      }
      updatedHandID[cpuSelect1] = hand;
      updatedHandID[cpuSelect2] = hand;
      for (let i = cardIDIncrement; i < cpuSelect1; i++){
        let slot = updatedCardSlots[i].substring(4);
        slot = parseInt(slot) + 1;
        updatedCardSlots[i] = "card" + slot;
      }
      for (let i = cardIDIncrement; i < cpuSelect2; i++){
        let slot = updatedCardSlots[i].substring(4);
        slot = parseInt(slot) + 1;
        updatedCardSlots[i] = "card" + slot;
      }

      updatedCardSlots[cpuSelect1] = "card1";
      updatedCardSlots[cpuSelect2] = "card2";

      if (playerIndex === 1) { //for the cards going to player1 update the upside to front
        updatedUpside[cpuSelect1] = "front";
        updatedUpside[cpuSelect2] = "front";
      }
      cardIDIncrement = cardIDIncrement + HANDSIZE;
    }

    this.setState({
      handID: updatedHandID,
      upside: updatedUpside
    });
  }

  //handles playing a card for computer players
  playCPUCards(playableCardIndices) {
    let updatedCardSlots = this.state.cardSlots; // create array to hold updated card slots
    let updatedUpside = this.state.upside; // create array to hold updated card slots
    let playIndex = Math.floor(Math.random() * Math.floor(playableCardIndices.length)); //get random index from playable cards
    updatedUpside[playableCardIndices[playIndex]] = "front";

    let newSlot = "played";
    
    if (this.state.playedThisRound === 0){
      newSlot += " first-played"
    } else if (this.state.playedThisRound === 1){
      newSlot += " second-played"
    } else if (this.state.playedThisRound === 2){
      newSlot += " third-played"
    } else if (this.state.playedThisRound === 3){
      newSlot += " fourth-played"
    }

    updatedCardSlots[playableCardIndices[playIndex]] = newSlot;

    this.setState({
      cardSlots: updatedCardSlots,
      upside: updatedUpside
    })
  }

  //this is a function to resort the cards in hand1
  resortH1() {
    let h1Indexes = [];
    let newH1 = [];
    let updatedCardSlots = this.state.cardSlots;

    let i = -1;
    while ((i = this.state.handID.indexOf("hand1", i+1)) !== -1){ //get each of the cardIndexes of h1
      h1Indexes.push(i);
    }

    for (let i = 0; i<h1Indexes.length;i++){ //get the cards associated with each index
      newH1.push(this.state.allHands[h1Indexes[i]]);
    }

    this.sortHand(newH1); //sort the cards in h1

    let h1SortedIndexes = [];
    for (let i = 0; i < newH1.length; i++){ 
      h1SortedIndexes.push(this.getIndexBySuitCard(newH1[i])); //change the sorted cards into their sorted cardIndexes
    }


    for (let i = 1; i <= h1SortedIndexes.length; i++){
      updatedCardSlots[h1SortedIndexes[i-1]] = "card" + i; //update slot for each card
    }

    this.setState({
      cardSlots: updatedCardSlots
    });
    this.playTurn();
  }

  // given a card, this function returns the index of the card in the allHands array
  getIndexBySuitCard(card) {
    for (let i = 0; i<DECKSIZE; i++){
      if (card[2] === this.state.allHands[i][2]){
        return i;
      }
    }
  }

  // This function handles a click on the play card button.
  // it will cause the selected card to move from the player's hand to the center of the table
  playCard() {
    let selectedCard = this.state.cardStatus.indexOf("selected"); // get the index of the selected card
    let cardSlots = this.state.cardSlots; // create array to hold updated card slots
    let newSlot = "played";

    if (this.state.playedThisRound === 0){
      newSlot += " first-played"
    } else if (this.state.playedThisRound === 1){
      newSlot += " second-played"
    } else if (this.state.playedThisRound === 2){
      newSlot += " third-played"
    } else if (this.state.playedThisRound === 3){
      newSlot += " fourth-played"
    }

    cardSlots[selectedCard] = newSlot; //mark selected card as played

    this.setState({
      cardSlots: cardSlots,
      userCardPlayed: true
    })
  }

  shiftCardsToCenter () {
    /*if (selectedCard < Math.ceil(HANDSIZE/2)){ //if selected card is left of center
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

      for (let index = 0; index + parseInt(selectedCard) + 1 < HANDSIZE; index++){
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
    }*/
  }

  // This function handles any given player's turn
  // while a round is still in progress calls itself once the turn before is completed
  playTurn = () => {
    let updatedGamePhase = this.state.gamePhase;
    let updatedCardSlots = this.state.cardSlots;
    let updatedUpside = this.state.upside;
    let nextPlayer = "";
    let leadSuit = this.state.leadSuit;
    let startedRoundPlayer = this.state.startedRoundPlayer;
    let playableCardIndices = [];

    if (this.state.playedThisRound === 0){
      updatedGamePhase = "playing";
      let twoOfClubsIndex = this.findTwoOfClubs();
      startedRoundPlayer = this.state.handID[twoOfClubsIndex].substr(-1);
      if (parseInt(startedRoundPlayer) === USER){
        let updatedPlayable = this.setUnplayable();
        if (!this.state.userCardPlayed){  //if user hasn't played yet
        setTimeout(()=> {
          this.setState({
            playable: updatedPlayable,
            playerTurn: USER //update playerTurn to user so they can select cards
          },
            this.playTurn //callback function, will run when state is set
          )
        }, 1000);
          return;
        }
        this.removeUnplayable();
      }
      nextPlayer = parseInt(startedRoundPlayer)%PLAYERCOUNT+1; //get the next player up
      updatedCardSlots[twoOfClubsIndex] = "played";
      updatedUpside[twoOfClubsIndex] = "front";
      leadSuit = "club";
    } else {
      if (this.state.playerTurn === 1){
        let updatedPlayable = this.setUnplayable();
        if (!this.state.userCardPlayed){  //if user hasn't played yet
          setTimeout(()=> {
            this.setState({
              playable: updatedPlayable
            },
              this.playTurn //callback function, will run when state is set
            )
          }, 1000);
          return;
        }
        this.removeUnplayable();
      } else if (this.state.playerTurn === 2){
        playableCardIndices = this.getPlayableCards(2, this.state.leadSuit);
        this.playCPUCards(playableCardIndices);
      } else if (this.state.playerTurn === 3){
        playableCardIndices = this.getPlayableCards(3, this.state.leadSuit);
        this.playCPUCards(playableCardIndices);
      } else if (this.state.playerTurn === 4){
        playableCardIndices = this.getPlayableCards(4, this.state.leadSuit);
        this.playCPUCards(playableCardIndices);
      }
      nextPlayer = this.state.playerTurn%PLAYERCOUNT +1;
    }
    
    if (nextPlayer !== parseInt(this.state.startedRoundPlayer)){ //if its not the end of the round
      setTimeout(()=> {
        this.setState({
          gamePhase: updatedGamePhase,
          upside: updatedUpside,
          cardSlots: updatedCardSlots,
          playerTurn: nextPlayer,
          leadSuit: leadSuit,
          startedRoundPlayer: startedRoundPlayer,
          playedThisRound: this.state.playedThisRound+1
        },
          this.playTurn //callback function, will run when state is set
        )
      }, 1000);
    } else { //if the round ended
      this.setState({
        gamePhase: updatedGamePhase,
        upside: updatedUpside,
        cardSlots: updatedCardSlots,
        completedRounds: this.state.completedRounds+1,
        playerTurn: nextPlayer,
        leadSuit: leadSuit,
        startedRoundPlayer: startedRoundPlayer,
        playedThisRound: 0
      });
    }
  }

  findTwoOfClubs() {
    let allHandsCopy = this.state.allHands;

    for (let index = 0; index < allHandsCopy.length; index++){
      if (allHandsCopy[index][SUIT] === "club" && allHandsCopy[index][VALUE] === "2"){
        return index;
      }
    }
  }

  getPlayableCards = (handID, leadSuit) => {
    let playableCardsIndices = [];
    for (let index = 0; index < this.state.allHands.length; index++){
      if (this.state.allHands[index][SUIT] === leadSuit  && this.state.handID[index] === "hand"+handID){
        playableCardsIndices.push(index);
      }
    }
    if (playableCardsIndices.length === 0){ //if the player can't follow suit
      for (let index = 0; index < this.state.allHands.length; index++){
        if (this.state.completedRounds === 0) { //if it is the first round, hearts/queen of spades are unplayable
          if (this.state.allHands[index][SUIT] !== "heart"  && this.state.handID[index] === "hand"+handID){ //if not a heart
            if (this.state.allHands[index][SUIT] === "spade" && this.state.allHands[index][VALUE] === "Queen"){ 
              continue; //skip if queen of spades
            }
            playableCardsIndices.push(index);
          }
        } else { //if it is not the first round, any card in hand is playable and added to the array
          if (this.state.handID[index] === "hand"+handID){
            playableCardsIndices.push(index);
          }
        }
      }
    }
    return playableCardsIndices;
  }

  setUnplayable(){
    let updatedPlayable = this.state.playable;
    let allHand1Cards = [];
    for (let index = 0; index < this.state.handID.length; index++){
      if (this.state.handID[index] === "hand1"){
        allHand1Cards.push(index);
        updatedPlayable[index] = "unplayable"; //set all to unplayable
      }
    }

    let playableHand1Cards = [];

    if (this.state.completedRounds === 0 && this.state.playedThisRound === 0){
      playableHand1Cards.push(this.findTwoOfClubs());
    } else {
      playableHand1Cards = this.getPlayableCards(USER, this.state.leadSuit);
    }

    
    for (let index = 0; index < playableHand1Cards.length; index++) {
      updatedPlayable[playableHand1Cards[index]] = "playable";
    }

    return updatedPlayable;
  }

  removeUnplayable(){
    let updatedPlayable = this.state.playable;
    for (let index = 0; index < updatedPlayable.length; index++){
      if (updatedPlayable[index] === "unplayable"){
        updatedPlayable[index] = "playable";
      }
    }

    this.setState({
      playable: updatedPlayable
    });
  }


  render() {
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

        <div id="pass-button" className="action-button" onClick={this.passCards}>Pass Cards</div>
        <div id="play-button" className="action-button" onClick={this.playCard}>Play Card</div>

        {this.state.menu === "notShowing" &&
          <div>
            {this.renderCards()}
            <div id="pass-instructions" className="visible">Choose two cards to pass to your opponent... </div>
          </div>
        }
      </div>
    );
  }
}

export default HeartsTable;