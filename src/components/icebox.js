import React, { Component } from 'react';
import IceboxToolbar from '../containers/iceboxToolbar';
import VisibleIceboxList from '../containers/visibleIceboxList';

class Icebox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: window.innerWidth,
		};
		this.scrollChecker = this.scrollChecker.bind(this);
	}
	componentDidMount() {
		document.addEventListener('scroll', this.scrollChecker);
	}
	componentWillUnmount() {
		document.removeEventListener('scroll', this.scrollChecker);
	}
	scrollChecker() {
		if (document.body.scrollTop > 72 || document.documentElement.scrollTop > 72) {
			document.getElementById('appheader').className = 'appheader-hidden';
			document.getElementById('icebox-toolbar').className = 'icebox-toolbar-scroll';
			document.getElementById('goTop').className = 'goTop-show';
		} else {
			document.getElementById('appheader').className = 'appheader';
			document.getElementById('icebox-toolbar').className = 'icebox-toolbar';
			document.getElementById('goTop').className = 'goTop';
		}
	}
	render() {
		return (
			<div className="icebox-container">
				<IceboxToolbar />
				<VisibleIceboxList windowWidth={this.state.windowWidth} />
			</div>
		);
	}
}

export default Icebox;
