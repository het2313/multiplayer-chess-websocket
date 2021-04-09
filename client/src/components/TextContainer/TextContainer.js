import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

export const TextContainer = ({ users }) => (
	<div className="textContainer">
		<div>
			<h1>
				Multiplayer Chess
				<br />
				Application
			</h1>
			<h2>
				This was created by
				<br />
				Het Patel
				<br />
				using React, Express,
				<br />
				Node, Socket.io, chess.js
			</h2>
		</div>
		{users ? (
			<div>
				<h1>Users Playing</h1>
				<div className="activeContainer">
					<h2>
						{users.map(({ name }) => (
							<div key={name} className="activeItem">
								{name}
								<img alt="Online Icon" src={onlineIcon} />
							</div>
						))}
					</h2>
				</div>
			</div>
		) : null}
	</div>
);
