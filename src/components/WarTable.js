// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessary items for the WarTable Component

// Created before CIS 482

// SYSTEM IMPORTS
import React from "react";

// CUSTOM IMPORTS
import WarCard from "./WarCard.js";
import "../css/WarTable.css";
import Bunny from "../images/bunny.png";
import BunnyQuote from "../images/bunnyQuote.png";
import Duddy1 from "../images/duddy1.png";
import Duddy2 from "../images/duddy2.png";
import DuddyQuote from "../images/duddyQuote.PNG";
import Arrow from "../images/arrow.png";

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
    // while(allCards.length > 51){
    //   var rand = Math.floor(Math.random() * (allCards.length));
    //   deck1.push(allCards[rand]);
    //   allCards.splice(rand, 1);
    // }

    deck1.push(allCards[1]);
    allCards.splice(1, 1);
    deck2.push(allCards[0]);
    allCards.splice(0, 1);

    //put the rest of the cards at random into deck2
    while(allCards.length !== 0){
      let rand = Math.floor(Math.random() * (allCards.length));
      deck2.push(allCards[rand]);
      allCards.splice(rand, 1);
    }

    this.state = {
      deck1: deck1,
      deck2: deck2,
      deck1played: [],
      deck2played: [],
      deck1shown: true,
      deck2shown: true,
      img: this.props.img,
      tieDeck: [],
      winMessage: 'Press "Flip" to start the game'
    }
  }

  //reset the player and opponent cards
  // reset = (pCard, oCard) => {
  //   // Set timeout while reset occurs
  //   setTimeout(() =>{
  //       this.refs['playerWarzoneCard'].reset(pCard[0], pCard[1]);
  //       this.refs['opponentWarzoneCard'].reset(oCard[0], oCard[1]);
  //   });
  // }

  clearTable = () => {
    setTimeout(() => { 
      this.setState({
        deck1played: [],
        deck2played: [],
      },
        this.winAnimation
      );
    }, 1500)
  }

  winAnimation = () => {
     document.getElementById("win-bunny").classList.add("one");
     setTimeout(() => {
      document.getElementById("win-bunny").classList.add("two");
      setTimeout(() => {
        document.getElementById("win-bunny").classList.add("three");
          setTimeout(() => {
            document.getElementById("win-bunny").classList.add("four");
            setTimeout(() => {
              document.getElementById("win-bunny").classList.add("five");
              setTimeout(() => {
                document.getElementById("win-bunny").classList.add("six");
                setTimeout(() => {
                  document.getElementById("win-bunny-quote").style.width = "230px";
                  setTimeout(() => {
                    document.getElementById("win-bunny-quote").style.width = "0";
                    document.getElementById("duddy-1").style.margin = "0";
                    setTimeout(() => {
                      document.getElementById("duddy-quote").style.width = "230px";
                      setTimeout(() => {
                        document.getElementById("duddy-quote").style.width = "0";
                        document.getElementById("duddy-1").style.display = "none";
                        document.getElementById("duddy-2").style.display = "unset";
                        document.getElementById("arrow").style.display = "unset";
                        setTimeout(() => {
                          document.getElementById("arrow").classList.add("shot");
                          setTimeout(() => {
                            document.getElementById("arrow").style.display = "none";
                            document.getElementById("win-bunny").classList.add("spin");
                          }, 100);
                        }, 500);
                      }, 2700);
                    }, 500);
                  }, 2700);
                }, 500);
              }, 500);
            }, 500);
          }, 500);
       }, 500);
     }, 500);
  }

  
  //handle clicking on the flip
  handleFlip = () => {
    var winMessage = "You lose!";

    document.getElementsByClassName("war-button")[0].style.display = "none";
    
    this.setState({
      deck1played: this.state.deck1[0],
      deck2played: this.state.deck2[0],
      deck1: [],
      deck2: this.state.deck2.concat(this.state.deck1),
      deck1shown: false,
      winMessage: winMessage
    },
      this.clearTable
    );



    // //handle player losing
    // if (this.state.deck1.length === 1){
    //   winMessage="You lose! Press the Exit button to return to the main menu."
    //   this.setState({
    //     winMessage: winMessage
    //   });
    // } else if (this.state.deck2.length === 1) {  //handle player winning
    //   winMessage="You win the game! Press the Exit button to return to the main menu."
    //   this.setState({
    //     winMessage: winMessage
    //   });
    // } else {
    //   var tempDeck1 = [...this.state.deck1];
    //   var tempDeck2 = [...this.state.deck2];

    //   var playerCard = tempDeck1[tempDeck1.length-1];
    //   var opponentCard = tempDeck2[tempDeck2.length-1];

    //   if (this.state.deck1[this.state.deck1.length-1][1] > this.state.deck2[this.state.deck2.length-1][1]){
    //     //player win condition
    //     if(this.state.tieDeck.length > 0){
    //       winMessage = "You win this round and broke the tie. Press flip to continue";
    //     }
    //     else{
    //       winMessage = "You win this round. Press flip to continue";
    //     }

    //     //handle ties
    //     while(this.state.tieDeck.length > 0){
    //       tempDeck1.unshift([this.state.tieDeck[this.state.tieDeck.length-1][0], this.state.tieDeck[this.state.tieDeck.length-1][1]])
    //       var tempTieDeck = this.state.tieDeck;
    //       tempTieDeck.pop();
    //       this.setState({
    //         tieDeck: tempTieDeck
    //       });
    //     }

    //     tempDeck1.unshift([this.state.deck1[this.state.deck1.length-1][0], this.state.deck1[this.state.deck1.length-1][1]])
    //     tempDeck1.unshift([this.state.deck2[this.state.deck2.length-1][0], this.state.deck2[this.state.deck2.length-1][1]])
    //     tempDeck1.pop();
    //     tempDeck2.pop();

    //   } else if (this.state.deck1[this.state.deck1.length-1][1] < this.state.deck2[this.state.deck2.length-1][1]){
    //     //opponent win condition

    //     if(this.state.tieDeck.length > 0){
    //       winMessage = "CPU wins this round and broke the tie. Press flip to continue";
    //     }
    //     else{
    //       winMessage = "CPU wins this round. Press flip to continue";
    //     }


    //     while(this.state.tieDeck.length > 0){
    //       tempDeck2.unshift([this.state.tieDeck[this.state.tieDeck.length-1][0], this.state.tieDeck[this.state.tieDeck.length-1][1]])
    //       tempTieDeck = this.state.tieDeck;
    //       tempTieDeck.pop();
    //       this.setState({
    //         tieDeck: tempTieDeck
    //       });
    //     }

    //     tempDeck2.unshift([this.state.deck1[this.state.deck1.length-1][0], this.state.deck1[this.state.deck1.length-1][1]])
    //     tempDeck2.unshift([this.state.deck2[this.state.deck2.length-1][0], this.state.deck2[this.state.deck2.length-1][1]])
    //     tempDeck1.pop();
    //     tempDeck2.pop();

    //   }  else {
    //     //tie condition
    //     winMessage = "There is a tie. Press flip continue"

    //     tempTieDeck = this.state.tieDeck;
    //     tempTieDeck.unshift([this.state.deck1[this.state.deck1.length-1][0], this.state.deck1[this.state.deck1.length-1][1]]);
    //     tempTieDeck.unshift([this.state.deck2[this.state.deck2.length-1][0], this.state.deck2[this.state.deck2.length-1][1]]);

    //     this.setState({
    //       tieDeck: tempTieDeck
    //     });

    //     tempDeck1.pop();
    //     tempDeck2.pop();
    //   }

    //   this.setState({
    //     deck1: tempDeck1,
    //     deck2: tempDeck2,
    //     winMessage: winMessage
    //   });

    //   this.reset(playerCard, opponentCard);
    // }
  }

  render() {
    return (
      <div id='war-game-container'>
      <div id='player-side'>
        <div id='player-deck-holder'>
          { this.state.deck1shown &&
              <div id='player-deck'>
              <WarCard className='card' ref='card1' key='1' suit={this.state.deck1[0][0]} value={this.state.deck1[0][1]} img={this.state.img} side='back'/>
              </div>
          }
        </div>
        <p><button className="war-button" onClick={this.handleFlip}>Flip</button></p>
        <div className="card-counter" id='player-card-counter'>Total Cards: {this.state.deck1.length}</div>
      </div>
      <div id='warzone'>
        <p id='war-title'>WAR</p>
        <p id='winner'>{this.state.winMessage}</p> <div id="cardzone">
        <div id='player-warzone'>
          { this.state.deck1played.length !== 0 &&
            <div id='player-war-card'>
              <WarCard className='card' ref='playerWarzoneCard' key='3' suit={this.state.deck1played[0]} value={this.state.deck1played[1]} img={this.state.img} side='front'/>
            </div>
          }
        </div>
        <div id='opponent-warzone'>
          { this.state.deck2played.length !== 0 &&
            <div id='opponent-war-card'>
              <WarCard className='card' ref='opponentWarzoneCard' key='4' suit={this.state.deck2played[0]} value={this.state.deck2played[1]} img={this.state.img} side='front'/>
            </div>
          }
        </div> </div>
      </div>
        <div id='opponent-side'>
          <div id='opponent-deck-holder'>
            { this.state.deck2shown &&
              <div id='opponent-deck'>
                <WarCard className='card' ref='card2' key='2' suit={this.state.deck2[0][0]} value={this.state.deck2[0][1]} img={this.state.img} side='back'/>
              </div>
            }
          </div>
          <div className="card-counter" id='opponent-card-counter'>Total Cards: {this.state.deck2.length}</div>
        </div>
        <img id="win-bunny" src={Bunny} alt="bunny"/>
        <img id="win-bunny-quote" src={BunnyQuote} alt="bunny-quote"/>
        <img id="duddy-1" src={Duddy1} alt="duddy"/>
        <img id="duddy-quote" src={DuddyQuote} alt="duddy-quote"/>
        <img id="duddy-2" src={Duddy2} alt="duddy"/>
        <img id="arrow" src={Arrow} alt="arrow"/>
      </div>
    );
  }
}

export default WarTable;
