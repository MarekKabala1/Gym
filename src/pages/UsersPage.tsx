//react, react-router
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//components
import Logo from '../components/Logo';
import MainButton from '../components/ButtonMain';
//firestore irebase
import { auth, db } from '../firebseConfig/fireaseConfig';
import {
	signOut,
	onAuthStateChanged,
	deleteUser,
	getAuth,
} from 'firebase/auth';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../firebseConfig/AuthContext';

const UsersPage = () => {
	let navigate = useNavigate();
	const [authed, setAuthed] = useState<boolean>(false);
	const [newUser, setNewUser] = useState<any[]>([]);
	const [error, setError] = useState<any>('');

	const { currentUser } = useAuth();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				setAuthed(false);
				navigate('/');
				console.log(authed, 'logged out');
				return authed;
			} else {
				setAuthed(true);
				const fetchData = async () => {
					const Ref = doc(db, 'users', `${user.uid}`);
					const Snap = await getDoc(Ref);
					const data: any = Snap.data();
					setNewUser(() => [data]);
					// console.log(data);
					return { newUser, user };
				};
				fetchData();
			}
		});
		unsubscribe();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logOut = () => {
		signOut(auth)
			.then((authed) => {
				navigate('/');
				setAuthed(false);
				console.log('click');
				return authed;
			})
			.catch(() => {
				console.log('something wrong');
				return setError(error.message);
			});
	};

	const deleteCurrentUser = () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			deleteUser(user)
				.then(() => {
					// auth User deleted.
					navigate('/');
					console.log('user deleted from auth');
				})
				.catch((error: any) => {
					return setError(error.message);
				});
			//cloud firestore user deleted
			deleteDoc(doc(db, 'users', `${user.uid}`));
			deleteDoc(doc(db, 'exercise', `${user.uid}`));
			console.log('user deleted');
		} else {
			console.log(error.message, 'something wrong');
			return setError(error.message);
		}
	};

	return (
		<section className='conteiner flex-column'>
			<header className='headerWrapper flex f-space-b'>
				{<div className='avatar flex center'>kk</div> &&
					React.Children.toArray(
						newUser.map((data) => (
							<div className='avatar flex center' key={data.id}>
								{data.name.charAt(0)}
								{data.surname.charAt(0)}
							</div>
						))
					)}
				<div className='userPage-flex_gap flex'>
					<MainButton
						disabled={false}
						text={'Log Out'}
						color={'lightgreen'}
						onClick={logOut}
						type={''}></MainButton>
					<MainButton
						disabled={false}
						text={`Delete account`}
						color={'red'}
						onClick={deleteCurrentUser}
						type={''}></MainButton>
				</div>
			</header>
			<div className='svgWrapper'>
				<Logo />
			</div>

			{React.Children.toArray(
				newUser.map((data) => (
					<p
						key={data.id}
						style={{
							fontSize: '1.4rem',
							color: 'rgba(247, 240, 240)',
							fontWeight: '700',
						}}>
						Hi <span className='userPageName'>{data.name.toUpperCase()}</span>
						<br /> have a lovely day
					</p>
				))
			)}
			<article className='mainContent flex gap-xl center '>
				<Link to='/gym'>
					<div className='imgWrapper imgGym flex center'>
						<p className='userPage_imgText'>Gym</p>
					</div>
				</Link>
				<div className='imgWrapper imgNutri flex center'>
					<p className='userPage_imgText'>Nutrition</p>
				</div>
				<div
					style={{ border: '1px solid azure' }}
					className='imgWrapper flex center'>
					<p style={{ backgroundColor: 'azure' }} className='userPage_imgText'>
						ToDo
					</p>
				</div>
				<div
					style={{ border: '1px solid azure' }}
					className='imgWrapper  flex center'>
					<p style={{ backgroundColor: 'azure' }} className='userPage_imgText'>
						Notes
					</p>
				</div>
			</article>
		</section>
	);
};

export default UsersPage;
