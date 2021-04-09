import React, { useState, useEffect, useRef } from 'react';
import Chessboard from 'chessboardjsx';
import './chess.css';
const chess = require('chess.js');

export const Ch = ({ setMoves, fens, sendMoves, setFens }) => {
	let game = useRef(null);

	const onDrop = ({ sourceSquare, targetSquare }) => {
		let move = game.current.move({
			from: sourceSquare,
			to: targetSquare,
		});
		setMoves(game.current.fen());
	};

	const playAgain = () => {
		game.current.clear();
		game.current.reset();
		setFens('start');
	};

	useEffect(() => {
		game.current = new chess();
		setMoves(game.current.fen());
		console.log(game);
	}, []);

	return (
		<div className="flex-center">
			{game.current && game.current.game_over() ? (
				<div>
					<h1>GAME OVER</h1>
					<button onClick={playAgain}>Play again</button>
				</div>
			) : (
				<span></span>
			)}
			<Chessboard width={320} position={fens} orientation="white" onDrop={onDrop} />
		</div>
	);
};
