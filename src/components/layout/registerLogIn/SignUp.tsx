import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
//google firebase-firestore
import { db } from '../../../firebseConfig/fireaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '../../../firebseConfig/AuthContext';
import Loading from '../../../pages/Loading';

const SignUp = () => {
	const [firstName, setfirstName] = useState<string>('');
	const [surname, setSurname] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [repetPassword, setRepetPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	let navigate = useNavigate();
	const { signUp } = useAuth();

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		if (password !== '' && repetPassword !== '') {
			if (password !== repetPassword) {
				console.log('unable to sign up');
				return setError('Passwords do not match');
			}
			if (password.length < 6) {
				console.log('Password not long');
				return setError('Password not long enough');
			}
		}
		try {
			setError('');
			setLoading(true);
			const userCred = await signUp(email, password);

			const user = userCred.user;
			updateProfile(user, {
				displayName: `${firstName} ${surname}`,
			});
			const id = user.uid;
			const newUser = doc(collection(db, 'users'), id);
			await setDoc(newUser, {
				uid: user.uid,
				email: user.email,
				name: firstName,
				surname: surname,
				created: new Date(),
				weekRutines: [],
			});
			const newExercise = doc(collection(db, 'exercise'), id);
			await setDoc(newExercise, {
				exercise: [],
			});
			navigate(`/userpage/${user.uid}`);
		} catch {
			setError(error);
		}
		setLoading(false);
		setfirstName('');
		setSurname('');
		setEmail('');
		setPassword('');
		setRepetPassword('');
		setTimeout(() => {
			setError('');
		}, 3000);
	};

	return (
		<Loading /> && (
			<div className='form_wrapper'>
				<form className='form flex-column center' onSubmit={handleSubmit}>
					<Link to='/'>
						{' '}
						<IoMdClose className='close' />
					</Link>
					<h2 className='loginHeader'>Create Your Account</h2>
					{error && (
						<Alert sx={{ maxWidth: '70%' }} severity='error'>
							{error}
						</Alert>
					)}
					<input
						className='textField'
						name='name'
						placeholder=' Name'
						type='text'
						required
						value={firstName}
						onChange={(e) => setfirstName(e.target.value)}
					/>
					<input
						className='textField'
						name='surname'
						placeholder='Surname'
						type='text'
						required
						value={surname}
						onChange={(e) => setSurname(e.target.value)}
					/>
					<input
						className='textField'
						name='email'
						placeholder='Email'
						type='text'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className='textField'
						name='password'
						type='password'
						placeholder='Password'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						className='textField'
						name='RepetPassword'
						type='password'
						placeholder='RepetPassword'
						required
						value={repetPassword}
						onChange={(e) => setRepetPassword(e.target.value)}
					/>
					<button
						disabled={loading}
						className='register margin-top-large'
						type='submit'>
						Create Account
					</button>
					<p className='form-line' style={{ color: '#d0bed4' }}>
						or
					</p>
					<div className='divGoogleButton flex center gap-l'>
						<FcGoogle />
						<p>
							<Link to='/login'>Log In</Link>{' '}
						</p>
					</div>
				</form>
			</div>
		)
	);
};
export default SignUp;
