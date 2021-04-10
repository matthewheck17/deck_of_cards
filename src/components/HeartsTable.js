// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessary items for the HeartsTable Component

// Created in US 1 - Updated in US 9

// SYSTEM IMPORTS
import React from "react";

// CUSTOM IMPORTS
import GameCard from "./GameCard.js";
import "../css/HeartsTable.css";
import HeartsLogo from "../images/hearts/hearts-logo.png";
import LeadChip from "./LeadChip.js";
import Scorecard from "./Scorecard.js";

const HANDSIZE = 13;
const DECKSIZE = 52;
const PLAYERCOUNT = 4;
const SUIT = 0;
const VALUE = 1;
const COMP = 2;
const USER = 1;
const PLAYER1 = 0;
const PLAYER2 = 1;
const PLAYER3 = 2;
const PLAYER4 = 3;
const TRICKS = 0;
const HEARTS = 1;
const QUEENOFSPADES = 13;
const PLAYERINDEX = 4;
const PLAYER2TURN = 2;
const PLAYER3TURN = 3;
const PLAYER4TURN = 4;
const MAXSCORE = 26;
const MAXTRICKS = 13;
const SHOTTHESUN = 52;

class HeartsTable extends React.Component {

  constructor(props) {
    super(props)

    // array holding all opponents
    let allOpponents = ["Jimmy", "Tommy", "Henry", "Tobey", "Vito", "Michael", "Sonny", "Fredo", "Tobey", "Shaggy", "Lancelot", "Arthur", "Terry", "Donny", "The Dude", "Walter", "Gandalf", "Steve", "Tom", "Jerry", "Kenobi", "Sheev", "Matthew", "James"];

    let playerNames = [];
    playerNames.push("You"); //add user name to array
    let computerPlayersCount = PLAYERCOUNT - 1;
    for (let index = 0; index< computerPlayersCount; index++){
      let rand = Math.floor(Math.random()*allOpponents.length);
      playerNames.push(allOpponents[rand]); //add random name for each cpu
      allOpponents.splice(rand, 1);  //remove chosen name from array
    }


    // array holding all cards
    let allCards = [
      ["Hearts","2", 1],["Hearts","3", 2],["Hearts","4", 3],["Hearts","5", 4],["Hearts","6", 5],["Hearts","7", 6],["Hearts","8", 7],["Hearts","9", 8],["Hearts","10", 9],["Hearts","Jack", 10],["Hearts","Queen", 11],["Hearts","King", 12], ["Hearts","Ace", 13],
      ["Diamonds","2", 14],["Diamonds","3", 15],["Diamonds","4", 16],["Diamonds","5", 17],["Diamonds","6", 18],["Diamonds","7", 19],["Diamonds","8", 20],["Diamonds","9", 21],["Diamonds","10", 22],["Diamonds","Jack", 23],["Diamonds","Queen", 24],["Diamonds","King", 25], ["Diamonds","Ace", 26],
      ["Clubs","2", 27],["Clubs","3", 28],["Clubs","4", 29],["Clubs","5", 30],["Clubs","6", 31],["Clubs","7", 32],["Clubs","8", 33],["Clubs","9", 34],["Clubs","10", 35],["Clubs","Jack", 36],["Clubs","Queen", 37],["Clubs","King", 38], ["Clubs","Ace", 39],
      ["Spades","2", 40],["Spades","3", 41],["Spades","4", 42],["Spades","5", 43],["Spades","6", 44],["Spades","7", 45],["Spades","8", 46],["Spades","9", 47],["Spades","10", 48],["Spades","Jack", 49],["Spades","Queen", 50],["Spades","King", 51],["Spades","Ace", 52]
    ];

    // 4 empty arrays that will hold player hands
    let hand1 = [];
    let hand2 = [];
    let hand3 = [];
    let hand4 = [];

    //create array to keep track of each card location
    let cardStatus = [];
    let playable = [];
    let passed = [];
    for (let index = 0; index < DECKSIZE; index++){
      cardStatus[index] = "in-hand";
      playable[index] = "playable";
      passed[index] = "";
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
    let playerIndex = 0;
    for (let index = 0; index < HANDSIZE; index++){
      cardSlots[index] = "card" + (parseInt(index) + 1);
      handID[index] = "hand1";
      upside[index] = "front";
    }
    playerIndex++;

    for (let index = 0; index < HANDSIZE; index++){
      cardSlots[index+HANDSIZE*playerIndex] = "card" + (parseInt(index) + 1);
      handID[index+HANDSIZE*playerIndex] = "hand2";
      upside[index+HANDSIZE*playerIndex] = "back";
    }
    playerIndex++;

    for (let index = 0; index < HANDSIZE; index++){
      cardSlots[index+HANDSIZE*playerIndex] = "card" + (parseInt(index) + 1);
      handID[index+HANDSIZE*playerIndex] = "hand3";
      upside[index+HANDSIZE*playerIndex] = "back";
    }
    playerIndex++;

    for (let index = 0; index < HANDSIZE; index++){
      cardSlots[index+HANDSIZE*playerIndex] = "card" + (parseInt(index) + 1);
      handID[index+HANDSIZE*playerIndex] = "hand4";
      upside[index+HANDSIZE*playerIndex] = "back";
    }

    let activeHand = [];
    activeHand[PLAYER1] = "inactive"; //set each player to inactive
    activeHand[PLAYER2] = "inactive";
    activeHand[PLAYER3] = "inactive";
    activeHand[PLAYER4] = "inactive";

    //set the state of the component
    this.state = {
      hand1: hand1,
      hand2: hand2,
      hand3: hand3,
      hand4: hand4,
      playerNames: playerNames,
      allHands: allHands,
      cardStatus: cardStatus,
      handID: handID,
      upside: upside,
      cardSlots: cardSlots,
      playable: playable,
      passed: passed,
      img: this.props.img,
      menu: "showing",
      gamePhase: "passing",
      playerTurn: null,
      completedRounds: 0, //number of completed rounds
      playedThisRound: 0, //number of cards played in a given round
      startedRoundPlayer: null, //index of the player who started the round
      leadSuit: "Clubs", //suit of the lead card, will always start with clubs
      userCardPlayed: false, //keep track of if the user has played this round yet
      activeHand: activeHand, //keep track of which hand is up to play so that the border can be highlighted accordingly
      heartsBroken: false, //keep track if hearts has been broken yet
      scoretracker: [[0,0], [0,0], [0,0], [0,0]], //array to keep track of each player's score
      gameOver: false,
      roundStatusMessage: ""
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
    for (let index1 = hand.length-1; index1>=0; index1--){
      for(let index2 = 1; index2<=index1; index2++){
        if(hand[index2-1][COMP] > hand[index2][2]){
          let temp = hand[index2-1];
          hand[index2-1] = hand[index2];
          hand[index2] = temp;
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
    for (let index=0; index < this.state.hand1.length; index++) {
      cards.push(<GameCard key={cardIDIndex} cardID={cardIDIndex} suit={this.state.hand1[index][SUIT]} value={this.state.hand1[index][VALUE]} img={this.state.img} side={this.state.upside[cardIDIndex]} location={this.state.handID[cardIDIndex]} slot={this.state.cardSlots[cardIDIndex]} status={this.state.cardStatus[cardIDIndex]} playable={this.state.playable[cardIDIndex]} passed={this.state.passed[cardIDIndex]} handleCardClick={this.handleCardClick}/>)
      cardIDIndex++;
    }

    for (let index=0; index < this.state.hand2.length; index++) {
      cards.push(<GameCard key={cardIDIndex} cardID={cardIDIndex} suit={this.state.hand2[index][SUIT]} value={this.state.hand2[index][VALUE]} img={this.state.img} side={this.state.upside[cardIDIndex]} location={this.state.handID[cardIDIndex]} slot={this.state.cardSlots[cardIDIndex]} status={this.state.cardStatus[cardIDIndex]} playable={this.state.playable[cardIDIndex]} passed={this.state.passed[cardIDIndex]} handleCardClick={this.handleCardClick}/>)
      cardIDIndex++;
    }

    for (let index=0; index < this.state.hand3.length; index++) {
      cards.push(<GameCard key={cardIDIndex} cardID={cardIDIndex} suit={this.state.hand3[index][SUIT]} value={this.state.hand3[index][VALUE]} img={this.state.img} side={this.state.upside[cardIDIndex]} location={this.state.handID[cardIDIndex]} slot={this.state.cardSlots[cardIDIndex]} status={this.state.cardStatus[cardIDIndex]} playable={this.state.playable[cardIDIndex]} passed={this.state.passed[cardIDIndex]} handleCardClick={this.handleCardClick}/>)
      cardIDIndex++;
    }

    for (let index=0; index < this.state.hand4.length; index++) {
      cards.push(<GameCard key={cardIDIndex} cardID={cardIDIndex} suit={this.state.hand4[index][SUIT]} value={this.state.hand4[index][VALUE]} img={this.state.img} side={this.state.upside[cardIDIndex]} location={this.state.handID[cardIDIndex]} slot={this.state.cardSlots[cardIDIndex]} status={this.state.cardStatus[cardIDIndex]} playable={this.state.playable[cardIDIndex]} passed={this.state.passed[cardIDIndex]} handleCardClick={this.handleCardClick}/>)
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
    let updatedPassed = this.state.passed; //copy passed array
    let updatedActiveHand = this.state.activeHand; //copy activeHand array
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
    updatedPassed[selectedCard1] = "passed";
    updatedPassed[selectedCard2] = "passed";

    //hide instructions/button
    document.getElementById("pass-instructions").classList.remove('visible'); // hide instructions
    document.getElementById("pass-button").classList.remove('visible'); // hide pass cards button

    let twoOfClubsIndex = this.state.handID[this.findTwoOfClubs()];
    let twoOfClubsHandIndex = twoOfClubsIndex.charAt(twoOfClubsIndex.length-1);

    updatedActiveHand[twoOfClubsHandIndex-1] = "active";
    
    //update state arrays
    this.setState({
      handID: updatedHandID,
      upside: updatedUpside,
      cardSlots: updatedCardSlots,
      passed: updatedPassed,
      gamePhase: "playing",
      startedRoundPlayer: twoOfClubsHandIndex,
      activeHand: updatedActiveHand
    },
      this.resortH1()
    );
  }

  //handles selecting and passing cards for computer players
  passCPUCards() {
    let updatedHandID = this.state.handID; //copy handID array
    let updatedUpside = this.state.upside; //copy upside array
    let updatedCardSlots = this.state.cardSlots //copy cardSlots array
    let updatedPassed = this.state.passed; //copy passed array
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
      for (let index = cardIDIncrement; index < cpuSelect1; index++){
        let slot = updatedCardSlots[index].substring(PLAYERINDEX);
        slot = parseInt(slot) + 1;
        updatedCardSlots[index] = "card" + slot;
      }
      for (let index = cardIDIncrement; index < cpuSelect2; index++){
        let slot = updatedCardSlots[index].substring(PLAYERINDEX);
        slot = parseInt(slot) + 1;
        updatedCardSlots[index] = "card" + slot;
      }

      updatedCardSlots[cpuSelect1] = "card1";
      updatedCardSlots[cpuSelect2] = "card2";
      updatedPassed[cpuSelect1] = "passed";
      updatedPassed[cpuSelect2] = "passed";

      if (playerIndex === 1) { //for the cards going to player1 update the upside to front
        updatedUpside[cpuSelect1] = "front";
        updatedUpside[cpuSelect2] = "front";
      }
      cardIDIncrement = cardIDIncrement + HANDSIZE;
    }

    this.setState({
      handID: updatedHandID,
      upside: updatedUpside,
      cardSlots: updatedCardSlots,
      passed: updatedPassed
    });
  }

  //handles playing a card for computer players and returns the suit of the played card
  playCPUCards(playableCardIndices, playerID) {
    let updatedCardSlots = this.state.cardSlots; // create array to hold updated card slots
    let updatedUpside = this.state.upside; // create array to hold updated card slots
    let selectedCard = playableCardIndices[Math.floor(Math.random() * Math.floor(playableCardIndices.length))]; //get random index from playable cards
    if (this.state.completedRounds < (HANDSIZE-1)){ //dont need to compress if it is the last round
      this.shiftCardsToCenter(this.state.cardSlots[selectedCard].substring(PLAYERINDEX), playerID); //pass the slot number of the selected card
    }
    updatedUpside[selectedCard] = "front";
    let playedSuit = this.state.allHands[selectedCard][SUIT];

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

    updatedCardSlots[selectedCard] = newSlot;

    this.setState({
      cardSlots: updatedCardSlots,
      upside: updatedUpside
    })
    return playedSuit;
  }

  //this is a function to resort the cards in hand1
  resortH1() {
    let h1Indexes = [];
    let newH1 = [];
    let updatedCardSlots = this.state.cardSlots;

    let index = -1;
    while ((index = this.state.handID.indexOf("hand1", index+1)) !== -1){ //get each of the cardIndexes of h1
      h1Indexes.push(index);
    }

    for (let index = 0; index<h1Indexes.length; index++){ //get the cards associated with each index
      newH1.push(this.state.allHands[h1Indexes[index]]);
    }

    this.sortHand(newH1); //sort the cards in h1

    let h1SortedIndexes = [];
    for (let index = 0; index < newH1.length; index++){ 
      h1SortedIndexes.push(this.getIndexBySuitCard(newH1[index])); //change the sorted cards into their sorted cardIndexes
    }


    for (let index = 1; index <= h1SortedIndexes.length; index++){
      updatedCardSlots[h1SortedIndexes[index-1]] = "card" + index; //update slot for each card
    }

    this.setState({
      cardSlots: updatedCardSlots
    });
    this.playTurn();
  }

  // given a card, this function returns the index of the card in the allHands array
  getIndexBySuitCard(card) {
    for (let index = 0; index<DECKSIZE; index++){
      if (card[2] === this.state.allHands[index][2]){
        return index;
      }
    }
  }

  // This function handles a click on the play card button.
  // it will cause the selected card to move from the player's hand to the center of the table
  playCard() {
    let selectedCard = this.state.cardStatus.indexOf("selected"); // get the index of the selected card
    let updatedCardSlots = this.state.cardSlots; // create array to hold updated card slots
    let newSlot = "played";
    let leadSuit = this.state.leadSuit;

    if (this.state.playedThisRound === 0){
      newSlot += " first-played";
      leadSuit = this.state.allHands[selectedCard][SUIT];
    } else if (this.state.playedThisRound === 1){
      newSlot += " second-played";
    } else if (this.state.playedThisRound === 2){
      newSlot += " third-played";
    } else if (this.state.playedThisRound === 3){
      newSlot += " fourth-played";
    }

    this.shiftCardsToCenter(this.state.cardSlots[selectedCard].substring(PLAYERINDEX), "hand1"); //pass the slot number of the selected card

    updatedCardSlots[selectedCard] = newSlot; //mark selected card as played

    this.setState({
      cardSlots: updatedCardSlots,
      userCardPlayed: true,
      leadSuit: leadSuit
    });
  }

  // This is a function that takes the slot number and the handID of a given card and causes the cards outside of it to shift inwards
  shiftCardsToCenter (slotNumber, handID) {
    let handCardIndices = [];
    let updatedCardSlots = this.state.cardSlots;
    for (let index = 0; index < this.state.handID.length; index++){
      if (this.state.handID[index] === handID){
        handCardIndices.push(index); //get all cards in the given hand
      }
    }

    if (slotNumber < Math.ceil(HANDSIZE/2)){ //if selected card is left of center
      for (let index = 0; index < handCardIndices.length; index++){
        if (parseInt(updatedCardSlots[handCardIndices[index]].substring(PLAYERINDEX)) < slotNumber){ //check if slot is less than selected card
          let oldSlotNumber = updatedCardSlots[handCardIndices[index]].substring(PLAYERINDEX);
          let newSlot = parseInt(oldSlotNumber) + 1;
          newSlot = "card" + newSlot; //increment slot
          updatedCardSlots[handCardIndices[index]] = newSlot; 
        }
      }
    } else {
      for (let index = 0; index < handCardIndices.length; index++){
        if (parseInt(updatedCardSlots[handCardIndices[index]].substring(PLAYERINDEX)) > slotNumber){ //check if slot is less than selected card
          let oldSlotNumber = updatedCardSlots[handCardIndices[index]].substring(PLAYERINDEX);
          let newSlot = parseInt(oldSlotNumber) - 1;
          newSlot = "card" + newSlot;//decriment slot
          updatedCardSlots[handCardIndices[index]] = newSlot; 
        }
      }
    }

    this.setState({
      cardSlots: updatedCardSlots
    })
  }

  // This function handles any given player's turn
  // while a round is still in progress calls itself once the turn before is completed
  playTurn = () => {
    let updatedGamePhase = this.state.gamePhase;
    let updatedCardSlots = this.state.cardSlots;
    let updatedUpside = this.state.upside;
    let updatedActiveHand = this.state.activeHand;
    let nextPlayer = "";
    let playedSuit = "";
    let leadSuit = this.state.leadSuit;
    let startedRoundPlayer = this.state.startedRoundPlayer;
    let playableCardIndices = [];

    if (this.state.playedThisRound === 0 && this.state.completedRounds === 0){ //if it is the first turn of the game
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
        }, 100);
          return;
        }
        this.removeUnplayable();
      } else {
        this.shiftCardsToCenter(this.state.cardSlots[twoOfClubsIndex].substring(PLAYERINDEX), "hand"+startedRoundPlayer); //if a computer player has it, it needs to shift cards
      }
      nextPlayer = parseInt(startedRoundPlayer)%PLAYERCOUNT+1; //get the next player up
      updatedCardSlots[twoOfClubsIndex] = "played";
      updatedUpside[twoOfClubsIndex] = "front";
      playedSuit = "Clubs";
    } else {
      if (this.state.playerTurn === USER){
        let updatedPlayable = this.setUnplayable();
        this.showRoundStatusMessage();
        if (!this.state.userCardPlayed){  //if user hasn't played yet
          setTimeout(()=> {
            this.setState({
              playable: updatedPlayable
            },
              this.playTurn //callback function, will run when state is set
            )
          }, 100);
          return;
        }
        this.hideRoundStatusMessage();
        this.removeUnplayable();
      } else if (this.state.playerTurn === PLAYER2TURN){
        playableCardIndices = this.getPlayableCards(PLAYER2TURN, this.state.leadSuit);
        playedSuit = this.playCPUCards(playableCardIndices, "hand2");
      } else if (this.state.playerTurn === PLAYER3TURN){
        playableCardIndices = this.getPlayableCards(PLAYER3TURN, this.state.leadSuit);
        playedSuit = this.playCPUCards(playableCardIndices, "hand3");
      } else if (this.state.playerTurn === PLAYER4TURN){
        playableCardIndices = this.getPlayableCards(PLAYER4TURN, this.state.leadSuit);
        playedSuit = this.playCPUCards(playableCardIndices, "hand4");
      }
      nextPlayer = this.state.playerTurn%PLAYERCOUNT +1;
    }

    if (this.state.playedThisRound === 0) {
      updatedActiveHand[startedRoundPlayer-1] = "inactive"; //set player who completed this turn to inactive
    } else {
      updatedActiveHand[this.state.playerTurn-1] = "inactive"; //set player who completed this turn to inactive
    }

    if (nextPlayer !== parseInt(this.state.startedRoundPlayer)){ //if its not the end of the round
      updatedActiveHand[nextPlayer-1] = "active"; //set the next player to active if the round's not over
      if (this.state.playedThisRound === 0 && this.state.playerTurn !== USER){
        leadSuit = playedSuit;
      }
      let timeoutVal = 1000;
      if (nextPlayer === USER){
        timeoutVal = 1;
      }

      setTimeout(()=> {
        this.setState({
          gamePhase: updatedGamePhase,
          upside: updatedUpside,
          cardSlots: updatedCardSlots,
          playerTurn: nextPlayer,
          leadSuit: leadSuit,
          startedRoundPlayer: startedRoundPlayer,
          playedThisRound: this.state.playedThisRound+1,
          activeHand: updatedActiveHand
        },
          this.playTurn //callback function, will run when state is set
        )
      }, timeoutVal);
    } else { //if the round ended
      this.endRound();
      this.setState({
        upside: updatedUpside,
        cardSlots: updatedCardSlots,
        completedRounds: this.state.completedRounds+1,
        playerTurn: null,
        startedRoundPlayer: null,
        playedThisRound: 0,
        activeHand: updatedActiveHand
      });
    }
  }

  // This function finds the index of the two of Clubs
  findTwoOfClubs() {
    let allHandsCopy = this.state.allHands;

    for (let index = 0; index < allHandsCopy.length; index++){
      if (allHandsCopy[index][SUIT] === "Clubs" && allHandsCopy[index][VALUE] === "2"){
        return index;
      }
    }
  }

  // given a hand and a leadSuit, this function will return the indices of all playable cards for the given hand
  getPlayableCards = (handID, leadSuit) => {
    let playableCardsIndices = [];
    if (leadSuit !== null){
      for (let index = 0; index < this.state.allHands.length; index++){
        if (this.state.allHands[index][SUIT] === leadSuit  && this.state.handID[index] === "hand"+handID){
          playableCardsIndices.push(index);
        }
      }
      if (playableCardsIndices.length === 0){ //if the player can't follow suit
        for (let index = 0; index < this.state.allHands.length; index++){
          if (this.state.completedRounds === 0) { //if it is the first round, hearts/queen of spades are unplayable
            if (this.state.allHands[index][SUIT] !== "Hearts"  && this.state.handID[index] === "hand"+handID){ //if not a heart
              if (this.state.allHands[index][SUIT] === "Spades" && this.state.allHands[index][VALUE] === "Queen"){ 
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
    } else { //if this turn is the start of the round
      for (let index = 0; index < this.state.allHands.length; index++){
        if (this.state.handID[index] === "hand"+handID){
          if (this.state.allHands[index][SUIT] === "Hearts" && !this.state.heartsBroken){
            //don't make card playable
          } else {
            playableCardsIndices.push(index); //add all other cards in the player's hand to playable
          }
        }
      }
    }
    return playableCardsIndices;
  }

  //This function sets the unplayable cards' state to unplayable so they become darkened
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

  //This function removes the unplayable state from all cards
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

  //This function causes the round status message to appear
  showRoundStatusMessage(){
    if (this.state.playedThisRound === 0){
      return; //nothing to show if it is the first turn of the round
    }
    let playedCards = this.getPlayedCards();
    let eligibleWinners = []; //this will be an array to hold cards that can win the round (ie cards that followed the lead suit)
    for (let index = 0; index<playedCards.length; index++){
      if (this.state.allHands[playedCards[index]][SUIT] === this.state.leadSuit){ //check each card to see if it followed suit
        eligibleWinners.push(playedCards[index]);
      }
    }

    let highestCardIndex = 0;
    let highestCardValue = 0;

    for (let index = 0; index<eligibleWinners.length; index++){
      if (this.state.allHands[eligibleWinners[index]][COMP] > highestCardValue){ //check each card to find biggest value
        highestCardIndex = eligibleWinners[index];
        highestCardValue = this.state.allHands[eligibleWinners[index]][COMP];
      }
    }

    let roundWinningPlayer = parseInt(this.state.handID[highestCardIndex].substr(-1)); //get the index of the player is currently winning the trick
    let roundWinningName = this.state.playerNames[roundWinningPlayer-1];
    let statusMessage = roundWinningName + " has it with the " + this.state.allHands[highestCardIndex][VALUE] + " of " + this.state.allHands[highestCardIndex][SUIT];
    this.setState({
      roundStatusMessage: statusMessage
    });
  }

  //This function causes the round status message to disappear
  hideRoundStatusMessage(){
    this.setState({
      roundStatusMessage: ""
    });
  }


  //This function finds the indices of each played card
  getPlayedCards(){
    let playedCardIndices = [];
    for (let index = 0; index<this.state.cardSlots.length; index++){
      if (this.state.cardSlots[index].includes("played")){ //get all played cards
        playedCardIndices.push(index);
      }
    }
    return playedCardIndices;
  }

  //This function handles the end of the round, determining the winner and preparing for the next round and causes the win message to appear
  endRound() {
    let playedCardIndices = this.getPlayedCards();
    let eligibleWinners = []; //this will be an array to hold cards that can win the round (ie cards that followed the lead suit)
    let heartsPlayed = 0;
    for (let index = 0; index<playedCardIndices.length; index++){
      if (this.state.allHands[playedCardIndices[index]][SUIT] === this.state.leadSuit){ //check each card to see if it followed suit
        eligibleWinners.push(playedCardIndices[index]);
      }
      if (this.state.allHands[playedCardIndices[index]][SUIT] === "Hearts"){ //check each card to see if it was a heart suit
        heartsPlayed++;
      } else if (this.state.allHands[playedCardIndices[index]][SUIT] === "Spades" && this.state.allHands[playedCardIndices[index]][VALUE] === "Queen"){ //check if queen of spades was played
        heartsPlayed = heartsPlayed+QUEENOFSPADES; //queen of spades counts as 13 hearts
      }
    }

    let updatedHeartsBroken = this.state.heartsBroken;
    if (heartsPlayed > 0 && !this.state.heartsBroken){
      updatedHeartsBroken = true;
    }

    let highestCardIndex = 0;
    let highestCardValue = 0;

    for (let index = 0; index<eligibleWinners.length; index++){
      if (this.state.allHands[eligibleWinners[index]][COMP] > highestCardValue){ //check each card to find biggest value
        highestCardIndex = eligibleWinners[index];
        highestCardValue = this.state.allHands[eligibleWinners[index]][COMP];
      }
    }

    let roundWinningPlayer = parseInt(this.state.handID[highestCardIndex].substr(-1)); //get the index of the player who won the trick

    let roundWinningName = this.state.playerNames[roundWinningPlayer-1];
    //set the round-end message
    document.getElementById("round-end-message").innerHTML = roundWinningName + " won the trick with the " + this.state.allHands[highestCardIndex][VALUE] + " of " + this.state.allHands[highestCardIndex][SUIT];
    if (this.state.completedRounds < HANDSIZE-1){ //continue if not the 13th round yet
      setTimeout(()=> {
        document.getElementById("round-end-message").innerHTML = "";
        let updatedCardSlots = this.state.cardSlots;
        let updatedHandID = this.state.handID;
        let updatedActiveHand = this.state.activeHand;
        updatedActiveHand[roundWinningPlayer-1] = "active";
        let updatedScoretracker = this.state.scoretracker;
        updatedScoretracker[roundWinningPlayer-1][TRICKS]++;
        updatedScoretracker[roundWinningPlayer-1][HEARTS] += heartsPlayed;
        for (let index = 0; index<playedCardIndices.length; index++){ //update the slot and hand of the played cards to remove them from players' hands and from the center of the table
          updatedCardSlots[playedCardIndices[index]] = "won";
          updatedHandID[playedCardIndices[index]] = "won";
        }
        this.setState({
          cardSlots: updatedCardSlots,
          handid: updatedHandID,
          playerTurn: roundWinningPlayer,
          startedRoundPlayer: roundWinningPlayer,
          activeHand: updatedActiveHand,
          leadSuit: null, //set lead suit to null because the round is now over
          userCardPlayed: false,
          heartsBroken: updatedHeartsBroken,
          scoretracker: updatedScoretracker
        },
          this.playTurn //callback function, will run when state is set
        )
      }, 1500);
    } else {
      setTimeout(()=> {
        document.getElementById("round-end-message").innerHTML = "";
        let updatedCardSlots = this.state.cardSlots;
        let updatedHandID = this.state.handID;
        let updatedScoretracker = this.state.scoretracker;
        updatedScoretracker[roundWinningPlayer-1][TRICKS]++;
        updatedScoretracker[roundWinningPlayer-1][HEARTS] += heartsPlayed;
        let found = false;
        for (let index1 = 0; index1<updatedScoretracker.length; index1++){
          if (updatedScoretracker[index1][HEARTS] === MAXSCORE && !found) { // that means this player shot the moon
            if (updatedScoretracker[index1][TRICKS] === MAXTRICKS){ //if all tricks that means the player also shot the sun
              for (let index2 = 0; index2<updatedScoretracker.length; index2++){
                if (index2 !== index1){
                  updatedScoretracker[index2][HEARTS] = SHOTTHESUN; //give every other player the max score
                }
              }
            } else { //just shot the moon
              for (let index2 = 0; index2<updatedScoretracker.length; index2++){
                if (index2 !== index1){
                  updatedScoretracker[index2][HEARTS] = MAXSCORE; //give every other player the max score
                }
              }
            }
            updatedScoretracker[index1][HEARTS] = 0;
            found = true;
          }
        }
        for (let index = 0; index<playedCardIndices.length; index++){ //update the slot and hand of the played cards to remove them from players' hands and from the center of the table
          updatedCardSlots[playedCardIndices[index]] = "won";
          updatedHandID[playedCardIndices[index]] = "won";
        }
        this.setState({
          cardSlots: updatedCardSlots,
          handid: updatedHandID,
          playerTurn: null,
          startedRoundPlayer: null,
          activeHand: ["inactive","inactive","inactive","inactive"],
          leadSuit: null,
          userCardPlayed: false,
          scoretracker: updatedScoretracker,
          gameOver: true
        })
      }, 1500);
    }
    return;
  }


  render() {
    return (
      <div id='game-container' onClick={(e) => this.deselect(e)}>
        {/* Menu */}
        {this.state.menu === "showing" &&
          <div>
            <GameCard ref={"mock-deck"} key={"mock-deck"} suit={"Spades"} value={"Queen"} img={this.state.img} side="back" location="deck"/>
            <div id='start-menu'>
              <h2 id="begin-button" className="start-menu-text" onClick={this.exitMenu}>Begin</h2>
            </div>
          </div>
        }
        <div id="playing-area">
          <img id="hearts-logo" src={HeartsLogo} href="hearts-logo" alt="heart"/>
        </div>

        <div id="player1-hand" className={"player-hand " + this.state.activeHand[PLAYER1]}></div>

        <div id="player2-hand" className={"player-hand " + this.state.activeHand[PLAYER2]}></div>

        <div id="player3-hand" className={"player-hand " + this.state.activeHand[PLAYER3]}></div>

        <div id="player4-hand" className={"player-hand " + this.state.activeHand[PLAYER4]}></div>

        <div id="pass-button" className="action-button" onClick={this.passCards}>Pass Cards</div>
        <div id="play-button" className="action-button" onClick={this.playCard}>Play Card</div>

        {this.state.menu === "notShowing" && !this.state.gameOver &&
          <div>
            {this.renderCards()}
            <LeadChip key={"lead-chip"} location={this.state.startedRoundPlayer} />
            <Scorecard key={"p1-scorecard"} playerID={"1"} name={this.state.playerNames[PLAYER1]} trickCount={this.state.scoretracker[PLAYER1][TRICKS]} heartsCount={this.state.scoretracker[PLAYER1][HEARTS]}/>
            <Scorecard key={"p2-scorecard"} playerID={"2"} name={this.state.playerNames[PLAYER2]} trickCount={this.state.scoretracker[PLAYER2][TRICKS]} heartsCount={this.state.scoretracker[PLAYER2][HEARTS]}/>
            <Scorecard key={"p3-scorecard"} playerID={"3"} name={this.state.playerNames[PLAYER3]} trickCount={this.state.scoretracker[PLAYER3][TRICKS]} heartsCount={this.state.scoretracker[PLAYER3][HEARTS]}/>
            <Scorecard key={"p4-scorecard"} playerID={"4"} name={this.state.playerNames[PLAYER4]} trickCount={this.state.scoretracker[PLAYER4][TRICKS]} heartsCount={this.state.scoretracker[PLAYER4][HEARTS]}/>
            <div id="pass-instructions" className="visible">Choose two cards to pass to your opponent... </div>
            <div id="round-status-message">{this.state.roundStatusMessage}</div>
            <div id="round-end-message"></div>
          </div>
        }

        {this.state.gameOver &&
          <div id="final-score-container">
            <div id="final-score">
              <h2 id="final-score-header">Final Score</h2>
              <p className="player-final-score">{this.state.playerNames[PLAYER1]}: {this.state.scoretracker[PLAYER1][HEARTS]}</p>
              <p className="player-final-score">{this.state.playerNames[PLAYER2]}: {this.state.scoretracker[PLAYER2][HEARTS]}</p>
              <p className="player-final-score">{this.state.playerNames[PLAYER3]}: {this.state.scoretracker[PLAYER3][HEARTS]}</p>
              <p className="player-final-score">{this.state.playerNames[PLAYER4]}: {this.state.scoretracker[PLAYER4][HEARTS]}</p>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default HeartsTable;