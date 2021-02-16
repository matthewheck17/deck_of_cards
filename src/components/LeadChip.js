// Cpoyright © 2020 Matthew Heck. All rights reserved.

// This file contains all necessary items for the LeadChip Component

// Created in US 1 - Updated in US 6

// SYSTEM IMPORTS
import React from "react";

// CUSTOM IMPORTS
import Chip from "../images/icons/lead-chip.png";
import "../css/LeadChip.css";

class LeadChip extends React.Component {

  constructor(props) {
    super(props)

    //set the state of the component
    this.state = {
        location: this.props.location
    }
  }


  render() {
    return (
      <div id='lead-chip' className={"h" + this.props.location}>
          <img src={Chip} alt="lead chip"/>
      </div>
    );
  }
}

export default LeadChip;