import React, { Component } from 'react';
import PlayerNameInput from './PlayerNameInput'
import CharacterList from './CharacterList'
import PlayerPool from './PlayerPool'
import './App.css';

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
      for(var j = 0; j < numOfPlayers; j++) {
          playerArray.push(<PlayerNameInput
            key={j.toString()}
            playerNumber={i}
            onPlayerNameChange={this.handlePlayerNameChange}
            onPlayerNameLock={this.lockPlayerName}
            playerNameLocked={this.state.players[j].isPlayerNameLocked}
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
