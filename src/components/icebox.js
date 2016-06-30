import React from 'react';
import IceboxToolbar from '../containers/iceboxToolbar';
import VisibleIceboxList from '../containers/visibleIceboxList';

const Icebox = () => {
	const scrollChecker = () => {
		if (document.body.scrollTop > 72 || document.documentElement.scrollTop > 72) {
			document.getElementById('appheader').className = 'appheader-hidden';
			document.getElementById('icebox-toolbar').className = 'icebox-toolbar-scroll';
			document.getElementById('goTop').className = 'goTop-show';
		} else {
			document.getElementById('appheader').className = 'appheader';
			document.getElementById('icebox-toolbar').className = 'icebox-toolbar';
			document.getElementById('goTop').className = 'goTop';
		}
	};

	window.onscroll = function () {
		scrollChecker();
	};
	
	return (
		<div className="icebox-container">
			<IceboxToolbar />
			<VisibleIceboxList />
		</div>
	);
};

export default Icebox;
