import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import LinearProgress from 'material-ui/LinearProgress';
import ICONS from '../styles/icons';
import FoodItemTable from './foodItemTable';
import {
	green500,
	green100,
	red500,
	red100,
} from 'material-ui/styles/colors';

const styles = {
	dialogTitle: {
		width: '100%',
	},
	speechButton: {
		width: '100%',
	},
	actionButtonCancel: {
		width: '50%',
		backgroundColor: red100,
	},
	actionButtonSubmit: {
		width: '50%',
		backgroundColor: green100,
	},
	progressBar: {
		paddingLeft: '5%',
		paddingRight: '5%',
		backgroundColor: '#FFFFFF',
		width: '100%',
	},
};

const confirmedItems = {};

class FoodItemInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			autoScrollBodyContent: true,
			recognitionStarted: false,
			newItemsAdded: false,
			newItems: [],
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.speechRecognitionInit = this.speechRecognitionInit.bind(this);
		this.startSpeechRecognition = this.startSpeechRecognition.bind(this);
		this.endSpeechRecognition = this.endSpeechRecognition.bind(this);
	}

	discardItems(item) {
		confirmedItems[item] = !confirmedItems[item];
		console.log('Discarded Items', confirmedItems);
	}

	startSpeechRecognition() {
		this.setState({
			recognitionStarted: true,
		}, this.recognition.start());
	}

	endSpeechRecognition() {
		this.setState({
			recognitionStarted: false,
		}, this.recognition.stop());
	}

	speechRecognitionInit() {
		/* eslint-disable */
		const SpeechRecognition = webkitSpeechRecognition;
		this.recognition = new SpeechRecognition();
		this.Kate = window.speechSynthesis;
		/* eslint-enable */

		// const SpeechGrammarList = webkitSpeechGrammarList;
		// const SpeechRecognitionEvent = SpeechRecognitionEvent;
		// const recognition = new SpeechGrammarList();
		// const speechRecognitionList = new SpeechGrammarList();
		// speechRecognitionList.addFromString(grammar, 1);
		this.recognition.interimResults = false;

		// let speechFlag = false;
		// const speechResults = [];


		this.recognition.onresult = (event) => {
			for (let i = event.resultIndex; i < event.results.length; ++i) {
				const identificated = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					console.log('Final sentence is : ', identificated);
					const tempRes = identificated.split('next');
					// function handling edge cases goes here
					const cleanList = this.listErrorHandling(tempRes);
					cleanList.forEach(item => { confirmedItems[item] = true; });
					const itemsToAdd = [...this.state.newItems, ...cleanList];
					this.setState({ newItems: itemsToAdd, newItemsAdded: true });
					console.log('this is state.newItems: ', this.state.newItems);
				} else {
					console.log('I understood : ', identificated);
				}
			}
		};

		this.recognition.onstart = () => {
			console.log('this.recognition.onstart fired');
		};
		this.recognition.onend = () => {
			console.log('this.recognition.onend fired');
			this.recognition.stop();
			const voices = window.speechSynthesis.getVoices();
			const areYouFinished = new SpeechSynthesisUtterance('Are you finished?');
			areYouFinished.voice = voices[20];
			areYouFinished.rate = 0.9;
			areYouFinished.pitch = 0.8;

			const finishedRecognition = new SpeechRecognition();
			setTimeout(() => {
				this.Kate.speak(areYouFinished);
				setTimeout(() => {
					finishedRecognition.start();
					setTimeout(() => {
						finishedRecognition.onresult = (evt) => {
							console.log('event is : ', evt);
							console.log('event on finishedRecognition onend is : ', evt.results[0][0].transcript);
							const result = evt.results[0][0].transcript.toLowerCase();
							if (result === 'yes' || result === 'yeah' || result === 'yup') {
								finishedRecognition.stop();
								this.endSpeechRecognition();
							} else {
								finishedRecognition.stop();
								this.startSpeechRecognition();
							}
						};
					}, 0);
				}, 650);
			}, 500);
		};
	}

	// make an array out of the Speech user input
	// map that array to the component state
	listErrorHandling(list) {
	// list1 takes off white space
		const list1 = list.map(item => {
			const tempItem = item.split(' ');
			if (item[0] === ' ') {
				tempItem.shift();
			}
			if (item[item.length - 1] === ' ') {
				tempItem.pop();
			}
			for (let i = 0; i < tempItem.length; i++) {
				const arr = tempItem[i].split('');
				if (arr[0] !== undefined) {
					arr[0] = arr[0].toUpperCase();
					tempItem[i] = arr.join('');
				}
			}
			return tempItem.join(' ');
		});
		for (let i = 0; i < list1.length; i++) {
			const curr = list1[i];
			if (curr === '' || curr === undefined) {
				list1.splice(i, 1);
				i--;
			}
		}
		return list1;
	}

	handleOpen() {
		this.speechRecognitionInit();
		this.setState({ open: true, newItemsAdded: false });
	}

	handleClose() {
		this.setState({ open: false, newItems: [], newItemsAdded: false });
	}

	handleSubmit() {
		this.props.submit(confirmedItems);
		this.setState({ open: false, newItems: [], newItemsAdded: false });
	}

	renderDialogBody() {
		if (!this.state.recognitionStarted && !this.state.newItemsAdded) {
			return (
				<div>
					<p> Read the names of your foods out loud, as you load them into the refrigerator.</p>
					<p> After each food say "next" and when you are done say "end" like this:</p>
					<p>"Tomatoes..next..Milk..next..Chicken...end"</p>
				</div>
			);
		} else if (this.state.recognitionStarted) {
			return <LinearProgress mode="indeterminate" style={styles.progressBar} />;
		}
		return <div></div>;
	}

	renderActions() {
		return (!this.state.recognitionStarted) ? (
			<RaisedButton
				label="Start Input"
				onTouchTap={this.startSpeechRecognition}
				backgroundColor={green500}
				style={styles.speechButton}
				icon={
					<SvgIcon className="icebox-toolbar-svgicon-speech">
						<path d={ICONS.Speech.d} />
					</SvgIcon>
				}
			/>
		) : (
			<RaisedButton
				label="End Input"
				onTouchTap={this.endSpeechRecognition}
				backgroundColor={red500}
				style={styles.speechButton}
				icon={
					<SvgIcon className="icebox-toolbar-svgicon-speech">
						<path d={ICONS.Speech.d} />
					</SvgIcon>
				}
			/>
		);
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				style={styles.actionButtonCancel}
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="Submit"
				style={styles.actionButtonSubmit}
				disabled={!this.state.newItemsAdded}
				onTouchTap={this.handleSubmit}
			/>,
		];

		return (
			<div>
				<IconButton
					tooltip="Speech"
					className="icebox-toolbar-speech"
					label="Dialog"
					onTouchTap={this.handleOpen}
				>
					<SvgIcon className="icebox-toolbar-svgicon-speech">
						<path d={ICONS.Speech.d} />
					</SvgIcon>
				</IconButton>
				<Dialog
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<div style={styles.dialogTitle}>
						{this.renderActions()}
					</div>
					<br />
					{this.renderDialogBody()}
					<br />
					<FoodItemTable items={this.state.newItems} discarded={this.discardItems} />
				</Dialog>
			</div>
		);
	}
}

FoodItemInput.propTypes = {
	submit: React.PropTypes.func,
};

export default FoodItemInput;

// title={this.renderActions()}
// titleStyle={styles.dialogTitle}
