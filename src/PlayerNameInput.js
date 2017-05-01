
import React, { Component } from 'react';

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

export default PlayerNameInput;
