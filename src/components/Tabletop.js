import React from "react";
import PlayingCard from "./PlayingCard.js";

class Tabletop extends React.Component {
  render() {
    return (
      <div>
        <PlayingCard suite="diamond" value="5" color="red"/>
      </div>
    );
  }
}

export default Tabletop;
