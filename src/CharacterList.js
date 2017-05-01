
import React, { Component } from 'react';
import CharacterIcon from "./CharacterIcon"

const charNames = ["axl","bedman","chipp","elphelt","faust","i-no","jack-o","jam","johnny",
"kum","ky","leo-whitefang","may","millia","potemkin","ramlethal","raven","sin","slayer","sol-badguy",
"venom","zato-1"];

class CharacterList extends Component {
  
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

export default CharacterList;
