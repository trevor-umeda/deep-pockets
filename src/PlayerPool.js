import React, { Component } from 'react';
import CharacterIcon from "./CharacterIcon"

class PlayerPool extends Component {
  render() {
    let characterList = [];
    if(this.props.characterList != null) {
      for(var i = 0; i < this.props.characterList.length ; i++) {
          var imgName = "/img/"+this.props.characterList[i]+".png"
          characterList.push(<CharacterIcon key={this.props.characterList[i]} icon={imgName} charName={this.props.characterList[i]}/>)
      }
    }
    const playerName = this.props.playerName
      return (
        <div className="panel panel-default">
          <div className="panel-body">
        <h3>{playerName}</h3>
        <ul>{characterList}</ul>
        </div>
      </div>
      );
  }
}
export default PlayerPool;
