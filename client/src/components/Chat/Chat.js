import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import queryString from 'query-string';
import io from 'socket.io-client';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';

import { InfoBar } from '../InfoBar/InfoBar';
import { Input } from '../Input/Input';
import { Messages } from '../Messages/Messages';
import { TextContainer } from '../TextContainer/TextContainer';
import { Ch } from '../Chess/Chess';

import './Chat.css';

let socket;

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	root: {
		flexGrow: 1,
	},
	header: {
		backgroundColor: 'black',
		color: 'white',
		boxShadow: '0px 0px 0px 0px',
	},
	button: {
		margin: theme.spacing(1),
	},
}));

export const Chat = ({ location }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [users, setUsers] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [moves, setMoves] = useState('start');
	const [fens, setFens] = useState(moves);
	const ENDPOINT = 'https://multichess-backend.herokuapp.com/';

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);

		setRoom(room);
		setName(name);

		socket.emit('join', { name, room }, (error) => {
			if (error) {
				alert(error);
			}
		});
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((msgs) => [...msgs, message]);
		});
		socket.on('moves', (moves) => {
			setFens(moves);
		});

		socket.on('roomData', ({ users }) => {
			setUsers(users);
		});
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};
	const sendMoves = () => {
		if (moves) {
			socket.emit('sendMoves', moves);
		}
	};

	useEffect(() => {
		sendMoves();
	}, [moves]);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen2 = () => {
		setOpen2(true);
	};

	const handleClose2 = () => {
		setOpen2(false);
	};
	return (
		<div className="main">
			<div className={classes.root}>
				<AppBar position="static" className={classes.header}>
					<Toolbar variant="dense">
						<Typography variant="h6" color="inherit">
							Multiplayer Chess
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
			<div className="chess">
				<Ch name={name} users={users} setMoves={setMoves} fens={fens} sendMoves={sendMoves} setFens={setFens} />
			</div>
			<div className="btn-group">
				<div>
					<Button
						variant="contained"
						onClick={handleOpen}
						color="default"
						className={classes.button}
						startIcon={<ChatIcon />}
					>
						Chat with your friends
					</Button>
				</div>
				<div>
					<Button
						variant="contained"
						onClick={handleOpen2}
						color="default"
						className={classes.button}
						startIcon={<ChatIcon />}
					>
						Room details
					</Button>
				</div>
			</div>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<div className="outerContainer">
							<div className="container">
								<InfoBar room={room} />
								<Messages messages={messages} name={name} />
								<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open2}
				onClose={handleClose2}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open2}>
					<div className={classes.paper}>
						<div className="outerContainer">
							<div className="container">
								<TextContainer users={users} />
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};
