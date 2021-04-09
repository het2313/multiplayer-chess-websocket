import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './InfoBar.css';

export const InfoBar = ({ room }) => (
	<div className="infoBar">
		<div className="leftInnerContainer">
			<img className="onlineIcon" src={onlineIcon} alt="online icon" />
			<h3>{room}</h3>
		</div>
	</div>
);
