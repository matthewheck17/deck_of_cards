// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessary items for the WarTable Component

// Created before CIS 482

// SYSTEM IMPORTS
import React from "react";

// CUSTOM IMPORTS
import WarCard from "./WarCard.js";
import "../css/WarTable.css";

class WarTable extends React.Component {

  constructor(props) {
    super(props)
    var allCards = [
      ["Clubs","Ace"],["Clubs","2"],["Clubs","3"],["Clubs","4"],["Clubs","5"],["Clubs","6"],["Clubs","7"],["Clubs","8"],["Clubs","9"],["Clubs","10"],["Clubs","Jack"],["Clubs","Queen"],["Clubs","King"],
      ["Diamonds","Ace"],["Diamonds","2"],["Diamonds","3"],["Diamonds","4"],["Diamonds","5"],["Diamonds","6"],["Diamonds","7"],["Diamonds","8"],["Diamonds","9"],["Diamonds","10"],["Diamonds","Jack"],["Diamonds","Queen"],["Diamonds","King"],
      ["Spades","Ace"],["Spades","2"],["Spades","3"],["Spades","4"],["Spades","5"],["Spades","6"],["Spades","7"],["Spades","8"],["Spades","9"],["Spades","10"],["Spades","Jack"],["Spades","Queen"],["Spades","King"],
      ["Hearts","Ace"],["Hearts","2"],["Hearts","3"],["Hearts","4"],["Hearts","5"],["Hearts","6"],["Hearts","7"],["Hearts","8"],["Hearts","9"],["Hearts","10"],["Hearts","Jack"],["Hearts","Queen"],["Hearts","King"]
    ];
    var deck1 = [];
    var deck2 = [];

    //put half of the cards at random into deck1
    while(allCards.length > 26){
      var rand = Math.floor(Math.random() * (allCards.length));
      deck1.push(allCards[rand]);
      allCards.splice(rand, 1);
    }

    //put the rest of the cards at random into deck2
    while(allCards.length !== 0){
      rand = Math.floor(Math.random() * (allCards.length));
      deck2.push(allCards[rand]);
      allCards.splice(rand, 1);
    }

    this.state = {
      deck1: deck1,
      deck2: deck2,
      img: this.props.img,
      tieDeck: [],
      winMessage: 'Press "Flip" to start the game'
    }
  }

  //reset the player and opponent cards
  reset = (pCard, oCard) => {
    // Set timeout while reset occurs
    setTimeout(() =>{
        this.refs['playerWarzoneCard'].reset(pCard[0], pCard[1]);
        this.refs['opponentWarzoneCard'].reset(oCard[0], oCard[1]);
    });
  }

  //handle clicking on the flip
  handleFlip = () => {
    var winMessage = "";

    //handle player losing
    if (this.state.deck1.length === 1){
      winMessage="You lose! Press the Exit button to return to the main menu."
      this.setState({
        winMessage: winMessage
      });
    } else if (this.state.deck2.length === 1) {  //handle player winning
      winMessage="You win the game! Press the Exit button to return to the main menu."
      this.setState({
        winMessage: winMessage
      });
    } else {
      var tempDeck1 = [...this.state.deck1];
      var tempDeck2 = [...this.state.deck2];

      var playerCard = tempDeck1[tempDeck1.length-1];
      var opponentCard = tempDeck2[tempDeck2.length-1];

      if (this.state.deck1[this.state.deck1.length-1][1] > this.state.deck2[this.state.deck2.length-1][1]){
        //player win condition
        if(this.state.tieDeck.length > 0){
          winMessage = "You win this round and broke the tie. Press flip to continue";
        }
        else{
          winMessage = "You win this round. Press flip to continue";
        }

        //handle ties
        while(this.state.tieDeck.length > 0){
          tempDeck1.unshift([this.state.tieDeck[this.state.tieDeck.length-1][0], this.state.tieDeck[this.state.tieDeck.length-1][1]])
          var tempTieDeck = this.state.tieDeck;
          tempTieDeck.pop();
          this.setState({
            tieDeck: tempTieDeck
          });
        }

        tempDeck1.unshift([this.state.deck1[this.state.deck1.length-1][0], this.state.deck1[this.state.deck1.length-1][1]])
        tempDeck1.unshift([this.state.deck2[this.state.deck2.length-1][0], this.state.deck2[this.state.deck2.length-1][1]])
        tempDeck1.pop();
        tempDeck2.pop();

      } else if (this.state.deck1[this.state.deck1.length-1][1] < this.state.deck2[this.state.deck2.length-1][1]){
        //opponent win condition

        if(this.state.tieDeck.length > 0){
          winMessage = "CPU wins this round and broke the tie. Press flip to continue";
        }
        else{
          winMessage = "CPU wins this round. Press flip to continue";
        }


        while(this.state.tieDeck.length > 0){
          tempDeck2.unshift([this.state.tieDeck[this.state.tieDeck.length-1][0], this.state.tieDeck[this.state.tieDeck.length-1][1]])
          tempTieDeck = this.state.tieDeck;
          tempTieDeck.pop();
          this.setState({
            tieDeck: tempTieDeck
          });
        }

        tempDeck2.unshift([this.state.deck1[this.state.deck1.length-1][0], this.state.deck1[this.state.deck1.length-1][1]])
        tempDeck2.unshift([this.state.deck2[this.state.deck2.length-1][0], this.state.deck2[this.state.deck2.length-1][1]])
        tempDeck1.pop();
        tempDeck2.pop();

      }  else {
        //tie condition
        winMessage = "There is a tie. Press flip continue"

        tempTieDeck = this.state.tieDeck;
        tempTieDeck.unshift([this.state.deck1[this.state.deck1.length-1][0], this.state.deck1[this.state.deck1.length-1][1]]);
        tempTieDeck.unshift([this.state.deck2[this.state.deck2.length-1][0], this.state.deck2[this.state.deck2.length-1][1]]);

        this.setState({
          tieDeck: tempTieDeck
        });

        tempDeck1.pop();
        tempDeck2.pop();
      }

      this.setState({
        deck1: tempDeck1,
        deck2: tempDeck2,
        winMessage: winMessage
      });

      this.reset(playerCard, opponentCard);
    }
  }

  render() {
    return (
      <div id='war-game-container'>
      <div id='player-side'>
        <div id='player-deck-holder'>
          <div id='player-deck'>
            <WarCard className='card' ref='card1' key='1' suit={this.state.deck1[0][0]} value={this.state.deck1[0][1]} img={this.state.img} side='back'/>
          </div>
        </div>
        <p><button className="war-button" onClick={this.handleFlip}>Flip</button></p>
        <div className="card-counter" id='player-card-counter'>Total Cards: {this.state.deck1.length}</div>
      </div>
      <div id='warzone'>
        <p id='war-title'>WAR</p>
        <p id='winner'>{this.state.winMessage}</p> <div id="cardzone">
        <div id='player-warzone'>
          <div id='player-war-card'>
            <WarCard className='card' ref='playerWarzoneCard' key='3' suit={this.state.deck1[this.state.deck1.length-1][0]} value={this.state.deck1[this.state.deck1.length-1][1]} img={this.state.img}/>
          </div>
        </div>
        <div id='opponent-warzone'>
          <div id='opponent-war-card'>
            <WarCard className='card' ref='opponentWarzoneCard' key='4' suit={this.state.deck2[this.state.deck2.length-1][0]} value={this.state.deck2[this.state.deck2.length-1][1]} img={this.state.img}/>
          </div>
        </div> </div>
      </div>
        <div id='opponent-side'>
          <div id='opponent-deck-holder'>
            <div id='opponent-deck'>
              <WarCard className='card' ref='card2' key='2' suit={this.state.deck2[0][0]} value={this.state.deck2[0][1]} img={this.state.img} side='back'/>
            </div>
          </div>
          <div className="card-counter" id='opponent-card-counter'>Total Cards: {this.state.deck2.length}</div>
        </div>
      </div>
    );
  }
}

export default WarTable;
