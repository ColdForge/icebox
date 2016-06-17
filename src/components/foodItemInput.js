import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Tabs, Tab } from 'material-ui/Tabs';

const grammar = [
	'#JSGF V1.0; grammar foods;',
	' public <food> = milk | eggs |',
	' bread | tomatoes | potatoes |',
	' lettuce | kale | bananas | apples |',
	' oranges | turkey breast ;',
].join(',');

class FoodItemInput extends Component {
	constructor(props) {
		super(props);
		// console.log('props: ', props);
		this.state = { term: '' };
	}

	render() {
		return (
			<div className="speech-text-input">
				<input
					size="100"
					value={this.state.term}
					// onChange={event => this.i}
				/>
			</div>
		);
	}
}

const createGrammarList = () => {

	const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
	const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
	const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

	const recognition = new SpeechRecognition();
	const speechRecognitionList = new SpeechGrammarList();
	speechRecognitionList.addFromString(grammar, 1);
	recognition.interimResults = true;

	let speechFlag = false;
	let speechResults = [];

	return;
};

export default FoodItemInput;
