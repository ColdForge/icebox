import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';

const grammar = '#JSGF V1.0; grammar foods; public <food> = milk | eggs | bread | tomatoes | potatoes | lettuce | kale | bananas | apples | oranges | turkey breast ;';

class FoodItemInput extends Component {
  constructor(props) {
    super(props);

    console.log('props: ', props);


    this.state = {term: ''}

  }

  render() {
    return (
      <div className="speech-text-input">
        <input
          size="100"
          value={this.state.term}
          onChange={event => this.i}
        />
      </div>
    );
  }

}

  const createGrammarList = () => {

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.interimResults = true;

    var speechFlag = false;
    var speechResults = [];

  }



export default FoodItemInput;
