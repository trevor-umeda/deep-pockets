import React, { Component } from 'react';

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

    var className = "";
    if(this.props.picked) {
      className = "picked-icon"
    }
    if(this.props.pickCharacter != null && !this.props.picked) {
      return (<li className={className} onClick={this.pickCharacter}><img src={imgName} alt="character-portrait"/></li>);
    } else {
      return (<li className={className} ><img src={imgName} alt="character-portrait" /></li>);
    }
  }
}

export default CharacterIcon;
