import React from 'react';
import IceboxToolbar from '../containers/iceboxToolbar';
import VisibleIceboxList from '../containers/visibleIceboxList';

export const Icebox = () => (
	<div className="icebox-container">
		<IceboxToolbar />
		<VisibleIceboxList />
	</div>
);
