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
    this.props.pickCharacter(this.props.charName)
    event.preventDefault();
  }
  render() {
    const imgName = this.props.icon;
    let icon = null;

    var className = "";
    if(this.props.picked) {
      className = "picked-icon"
    }
    if(this.props.pickCharacter != null && !this.props.picked) {
      return (<li className={className} onClick={this.pickCharacter}><img src={imgName} /></li>);
    } else {
      return (icon = <li className={className} ><img src={imgName} /></li>);
    }
  }

}
class PlayerPool extends Component {
  constructor(props) {
    super(props);

  }
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

class CharacterList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const characters = [];
    for(var i = 0; i < charNames.length ; i++) {
      var picked = false;
      if(this.props.currentlyPicked.indexOf(charNames[i]) >= 0) {
          picked = true;
          console.log("IS PICKED " + charNames[i])
      }
      var imgName = "/img/"+charNames[i]+".png"
      characters.push(<CharacterIcon key={charNames[i]} icon={imgName} charName={charNames[i]} picked={picked} pickCharacter={this.props.pickCharacter}/>)
    }
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <ul className="ban-list">{characters}</ul>
        </div>
      </div>
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
        playerArray.push({isPlayerNameLocked:false, characterList:[]});
    }
    this.state = {players: playerArray, numOfLockedPlayers: 0, inDraftPhase: false, currentPlayer:0, finishedPicking:false};
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
    var playerArray = this.state.players.slice()
    var playerCharacterList = playerArray[this.state.currentPlayer].characterList
    if(playerArray[this.state.currentPlayer].characterList == null) {
      playerCharacterList = []
    }
    playerCharacterList.push(characterName)
    playerArray[this.state.currentPlayer].characterList = playerCharacterList
    var finishedPicking = false;
    if(this.state.currentPlayer === (this.props.numOfPlayers - 1) && playerCharacterList.length === this.props.maxNumOfPicks) {
        finishedPicking = true
    }
    var newPlayer = (this.state.currentPlayer + 1) % this.props.numOfPlayers
    this.setState({players:playerArray, currentPlayer: newPlayer, finishedPicking:finishedPicking})
  }

  render() {
    const numOfPlayers = this.props.numOfPlayers;
    const currentPlayerName = this.state.players[this.state.currentPlayer].name;
    var playerArray = [];
    const inDraftPhase = this.state.inDraftPhase;
    const finishedPicking = this.state.finishedPicking;
    let header = null
    if(finishedPicking) {
      header = <h3>Banning Phase Complete</h3>;
    } else {
      header = <h3>Ban a character for {currentPlayerName}</h3>;
    }

    var playerPools = [];
    if(inDraftPhase) {
      for(var i = 0; i < numOfPlayers; i++) {
        playerPools.push(
          <PlayerPool
            key={i.toString()}
            playerName={this.state.players[i].name}
            characterList={this.state.players[i].characterList}
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
          {header}
          {playerPools}
          { !finishedPicking &&
          <CharacterList pickCharacter={this.pickCharacter} currentlyPicked={this.state.players[this.state.currentPlayer].characterList} />
          }
          </div>
        }
      </div>
    );
  }
}
export default Calculator;
