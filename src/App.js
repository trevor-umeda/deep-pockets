import React, { Component } from 'react';
import './App.css';

const charNames = ["axl","bedman","chipp","elphelt","faust","i-no","jack-o","jam","johnny",
"kum","ky","leo-whitefang","may","millia","potemkin","ramlethal","raven","sin","slayer","sol-badguy",
"venom","zato-1"];

class CharacterIcon extends Component {
  constructor(props) {
    super(props);
    this.pickCharacter = this.pickCharacter.bind(this);
  }
  pickCharacter(event) {
    alert(this.props.charName)
    this.props.pickCharacter(this.props.charName)
    event.preventDefault();
  }
  render() {
    const imgName = this.props.icon;
      return (
        <li onClick={this.pickCharacter}><img src={imgName} /></li>
      );
  }

}
class PlayerPool extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const playerName = this.props.playerName
      return (
        <div><h3>{playerName}</h3></div>
      );
  }

}

class CharacterList extends Component {
  constructor(props) {
    super(props);    
  }


  render() {
    const characters = [];
    for(var i = 0; i < charNames.length ; i++) {
        var imgName = "/img/"+charNames[i]+".png"
        characters.push(<CharacterIcon icon={imgName} charName={charNames[i]} pickCharacter={this.props.pickCharacter}/>)
    }
    return (
      <ul>{characters}</ul>
    );
  }

}

class PlayerNameInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onPlayerNameChange(e.target.value, this.props.playerNumber);
  }

  handleSubmit(event) {
    this.props.onPlayerNameLock(this.props.playerNumber);
    event.preventDefault();
  }
  render() {
    const playerName = this.props.playerName;
    const playerNumber = this.props.playerNumber;
    const playerNameLocked = this.props.playerNameLocked
    let input = null;
    if (playerNameLocked) {
      input = <input value={playerName} onChange={this.handleChange} disabled />
    } else {
      input = <input value={playerName} onChange={this.handleChange} />
    }
    return (
        <fieldset>
          <legend>Enter player {playerNumber+1} name:</legend>
          {input}
          { !playerNameLocked &&
            <button onClick={this.handleSubmit} value="Submit" >Save Name </button>
          }
        </fieldset>
    );
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
    this.lockPlayerName = this.lockPlayerName.bind(this);
    this.pickCharacter = this.pickCharacter.bind(this);

    var numOfPlayers = this.props.numOfPlayers;
    var playerArray = [];
    for(var i = 0; i < numOfPlayers; i++) {
        playerArray.push({isPlayerNameLocked:false});
    }
    this.state = {players: playerArray, numOfLockedPlayers: 0, inDraftPhase: false, currentPlayer:0};
  }


  handlePlayerNameChange(playerName, playerNumber) {
    var playerArray = this.state.players.slice()
    playerArray[playerNumber].name = playerName;
    this.setState({ players: playerArray })
  }

  lockPlayerName(playerNumber) {
    var playerArray = this.state.players.slice()
    playerArray[playerNumber].isPlayerNameLocked = true;
    // alert("Named locked as " + playerArray[playerNumber].name)
    var numOfPlayersLocked = this.state.numOfLockedPlayers + 1;
    this.setState({ players: playerArray, numOfLockedPlayers : numOfPlayersLocked })
    if(numOfPlayersLocked === this.props.numOfPlayers) {
        this.setState({ inDraftPhase:true })
    }
  }

  pickCharacter(characterName) {
    var newPlayer = (this.state.currentPlayer + 1) % this.props.numOfPlayers
    this.setState({currentPlayer: newPlayer})
  }

  render() {
    var numOfPlayers = this.props.numOfPlayers;
    const currentPlayerName = this.state.players[this.state.currentPlayer].name
    var playerArray = [];
    var inDraftPhase = this.state.inDraftPhase
    var playerPools = [];
    if(inDraftPhase) {
      for(var i = 0; i < numOfPlayers; i++) {
        playerPools.push(
          <PlayerPool
            key={i.toString()}
            playerName={this.state.players[i].name}
          />
        )
      }
    } else {
      for(var i = 0; i < numOfPlayers; i++) {
          playerArray.push(<PlayerNameInput
            key={i.toString()}
            playerNumber={i}
            onPlayerNameChange={this.handlePlayerNameChange}
            onPlayerNameLock={this.lockPlayerName}
            playerNameLocked={this.state.players[i].isPlayerNameLocked}
          />);
      }
    }
    return (
      <div>
        {playerArray}
        { inDraftPhase &&
          <div>
          <h3>Ban a character for {currentPlayerName}</h3>
          {playerPools}
          <CharacterList pickCharacter={this.pickCharacter}/>
          </div>

        }
      </div>
    );
  }
}
export default Calculator;