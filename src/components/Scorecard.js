// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessary items for the Scorecard Component

// Created in US 7

// SYSTEM IMPORTS
import React from "react";

// CUSTOM IMPORTS
import "../css/Scorecard.css";

class Scorecard extends React.Component {

  constructor(props) {
    super(props)

    //set the state of the component
    this.state = {
        playerID: this.props.playerID,
        name: this.props.name,
        trickCount: this.props.trickCount,
        heartsCount: this.props.heartsCount
    }
  }


  render() {
    return (
      <div className={"scorecard p" + this.state.playerID}>
          <h3 className="playerName">{this.state.name}</h3>
          <p>Tricks Won: {this.props.trickCount}</p>
          <p>Hearts Won: {this.props.heartsCount}</p>
      </div>
    );
  }
}

export default Scorecard;