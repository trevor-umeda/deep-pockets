import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './App';

ReactDOM.render(
  <Calculator numOfPlayers={2} maxNumOfPicks={5}/>,
  document.getElementById('root')
);
