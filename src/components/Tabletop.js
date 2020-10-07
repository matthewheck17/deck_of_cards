// SYSTEM IMPORTS
import React from "react";
import {RemoveScrollBar} from 'react-remove-scroll-bar';

// IMAGE IMPORTS
import Prof1 from "../images/backs/prof1.JPG"

// CUSTOM IMPORTS
import GameButtons from "./GameButtons.js";
import SandboxDeck from "./SandboxDeck.js";
import WarTable from "./WarTable.js";
import HeartsTable from "./HeartsTable.js";
import Customize from "./Customize.js"
import "../css/Tabletop.css";

/* Help Message Object to pass as props */
const help = {
  freeMode: {
    header: "Free Mode",
    body: "Welcome to free mode - feel free to move the cards from the deck however you would like :)"
  },
  war: {
    header: "War",
    body: "This is the game of War. The goal is to flip cards and when the value of your card is higher than your opponent, you win."
  },
  hearts: {
    header: "Hearts",
    body: "This is the game of Hearts. The goal is to avoid winning tricks that contain hearts and the queen of spades."
  }
};

class Tabletop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: "mainMenu",
      showingHelpMessage: false,
      dark: false,
      img: Prof1,
      helpText: help.freeMode,
    };
  }

  loadFreeMode = () => {
    this.setState({
      mode: 'sandbox',
      helpText: help.freeMode
    });
}

  goToCustomize = (e) => {
    this.setState({
      mode: "customize"
    })
  }

  //called from GameButtons to the sandbox deck
  shuffle = (e) => {
    this.refs.sandboxDeck.shuffle();
  }

  goToMainMenu = (e) => {
    this.setState({
      mode: "mainMenu"
    })
  }

  changeImg = (img) => {
    this.setState({
      img: img
    })
  }


  goToSandboxMode = () => {
    this.setState({
      mode: 'sandbox',
      helpText: help.freeMode
    });
  }

  goToGameMenu = () => {
    this.setState({
      mode: 'choosingGame'
    })
  }

  goToWar = () => {
    this.setState({
      mode: 'war',
      helpText: help.war
    })
  }

  goToHearts = () => {
    this.setState({
      mode: 'hearts',
      helpText: help.hearts
    })
  }

  goToAbout = () => {
    this.setState({
      mode: 'about'
    })
  }

  render() {

    return (
      <div id='display'>
      <RemoveScrollBar />

      {/* Main Menu */}
      {this.state.mode === "mainMenu" &&
          <div className='menu'>
            <p id="title">deck_of_cards</p>
            <p id="creators">An Interactive Online Deck of Cards</p>
            <p><button className="button" onClick={this.goToGameMenu}>Play a Game</button></p>
            <p><button className="button" onClick={this.goToSandboxMode}>Sandbox Mode</button></p>
            <p><button className="button" onClick={this.goToCustomize}>Customize</button></p>
            <p><button className="button" onClick={this.goToAbout}>About</button></p>
          </div>
      }

      {/* Sandbox Mode */}
      {this.state.mode === "choosingGame" &&
          <div className='menu'>
            <p id="title">Games</p>
            <p><button className="button" onClick={this.goToWar}>War</button></p>
            <p><button className="button" onClick={this.goToHearts}>Hearts</button></p>
            <p><button className="button" onClick={this.goToMainMenu}>Exit</button></p>
          </div>
      }

      {/* Sandbox Mode */}
      {this.state.mode === "sandbox" &&
          <div id="table">
            <GameButtons type="help" mode={"sandbox"} showing={this.state.showingHelpMessage} shuffle={this.shuffle} goToMainMenu={this.goToMainMenu} helpText={this.state.helpText}/>
            <SandboxDeck ref="sandboxDeck" img={this.state.img}/>
          </div>
      }

      {/* Choose Your Fighter */}
      {this.state.mode === "customize" &&
          <div id="customize">
            <Customize goToMainMenu={this.goToMainMenu} changeImg={this.changeImg}/>
          </div>
      }

      {/* War Mode */}
      {this.state.mode === "war" &&
      <div id="war-table">
        <GameButtons type="help" mode={"game"} showing={this.state.showingHelpMessage} shuffle={this.resetWarDeck} goToMainMenu={this.goToMainMenu} helpText={this.state.helpText}/>
        <WarTable ref="warTable" img={this.state.img}/>
      </div>
      }

      {/* War Mode */}
      {this.state.mode === "hearts" &&
      <div id="hearts-table">
        <GameButtons type="help" mode={"game"} showing={this.state.showingHelpMessage} shuffle={this.resetWarDeck} goToMainMenu={this.goToMainMenu} helpText={this.state.helpText}/>
        <HeartsTable ref="heartsTable" img={this.state.img}/>
      </div>
      }

      {/* About */}
      {this.state.mode === "about" &&
      <div className="main-menu">
      <GameButtons type="help" mode={"menu"} goToMainMenu={this.goToMainMenu}/>
        <p id="title">About</p>
        <div>
          <p id="text">This is a web application developed by Braden Batman, Chase Grainger, and Matthew Heck. You can play premade games, or play around with a deck of cards in Sandbox mode.</p>
        </div>
      </div>
      }

      </div>
    );
  }
}

export default Tabletop;
