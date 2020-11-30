import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	InputAdornment,
	makeStyles,
	MenuItem,
	Select,
	TextField,
	Theme,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Close';
import firebase from 'firebase/app';
import * as React from 'react';
import {
	applyVerificationCode,
	sendVerificationEmail,
	setPersistenceLevel,
	signInUser,
	signInWithApple,
	signInWithGoogle,
	signOut,
	signUpUser,
} from './firebaseMethods';

interface FirebaseDialogProps {
	open: boolean;
	onClose: () => void;
}

export function FirebaseDialog(props: FirebaseDialogProps) {
	const classes = useStyles();

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [persistence, setPersistence] = React.useState(firebase.auth.Auth.Persistence.NONE);
	const [code, setCode] = React.useState('');
	const [imageCropperOpen, setImageCropperOpen] = React.useState(false);
	const [imageCropperUrl, setImageCropperUrl] = React.useState('');
	const { open, onClose } = props;

	const handleChange = (event: any) => {
		setPersistence(event.target.value);
	};

	return (
		<Dialog open={open} onClick={e => e.stopPropagation()} onClose={onClose}>
			<DialogTitle>Firebase Admin</DialogTitle>
			<DialogContent className={classes.container}>
				<TextField
					className={classes.testCooperativeField}
					variant="filled"
					label="email"
					value={email}
					onChange={(ev: any) => setEmail(ev.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment variant="filled" position="end">
								<IconButton onClick={() => setEmail('')}>
									<ClearIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					className={classes.testCooperativeField}
					variant="filled"
					label="password"
					value={password}
					onChange={(ev: any) => setPassword(ev.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment variant="filled" position="end">
								<IconButton onClick={() => setPassword('')}>
									<ClearIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={() => {
						signInUser(email, password);
					}}
				>
					Login
				</Button>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={() => {
						signUpUser(email, password);
					}}
				>
					SignUp
				</Button>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						onClick={() => {
							signInWithApple();
						}}
					>
						SignInWithApple
					</Button>{' '}
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						onClick={() => {
							signInWithGoogle();
						}}
					>
						SignInWithGoogle
					</Button>
				</div>

				<TextField
					className={classes.testCooperativeField}
					variant="filled"
					label="Email verificationCode"
					value={code}
					onChange={(ev: any) => setCode(ev.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment variant="filled" position="end">
								<IconButton onClick={() => setCode('')}>
									<ClearIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={() => {
						applyVerificationCode(
							code,
							() => {},
							() => {},
							true
						);
					}}
				>
					Verify with Code
				</Button>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={persistence}
					onChange={handleChange}
				>
					<MenuItem value={firebase.auth.Auth.Persistence.LOCAL}>LOCAL</MenuItem>
					<MenuItem value={firebase.auth.Auth.Persistence.SESSION}>SESSION</MenuItem>
					<MenuItem value={firebase.auth.Auth.Persistence.NONE}>NONE</MenuItem>
				</Select>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={() => {
						setPersistenceLevel(
							persistence,
							() => {},
							() => {},
							true
						);
					}}
				>
					Set Persistence
				</Button>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={() => {
						sendVerificationEmail(
							() => {},
							() => {},
							true
						);
					}}
				>
					Send VerificationEmail
				</Button>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={() => {
						signOut();
					}}
				>
					SignOut
				</Button>
			</DialogContent>
			<DialogActions>
				<Button tabIndex={0} onClick={onClose} color="primary" autoFocus>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		padding: 30,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	},

	button: {
		margin: 20,
	},

	testCooperativeField: {
		marginBottom: 20,
		width: 400,
	},
}));
