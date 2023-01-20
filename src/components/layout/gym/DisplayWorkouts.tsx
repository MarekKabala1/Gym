import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../firebseConfig/AuthContext';
import Loading from '../../../pages/Loading';
import { BsTrash } from 'react-icons/bs';
import { Alert } from '@mui/material';

const DisplayWorkouts = () => {
	const location = useLocation();
	const musclePartUrl = location.state;

	const [newData, setNewData] = useState<any>([]);
	const [error, setError] = useState<any>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [massage, setMessage] = useState<string>();

	const { currentUser } = useAuth();

	const db = getDatabase();
	const getWorkout = ref(db, `${currentUser.uid}/${musclePartUrl}`);

	useEffect(() => {
		onValue(getWorkout, (snapshot) => {
			setNewData([]);
			setLoading(true);
			let exercisesArray: any[] = [];
			if (snapshot.val() === null) {
				setLoading(false);
			}
			const data = snapshot.val();
			if (data !== null) {
				setLoading(false);
				Object.values(data).map((val: any) => {
					exercisesArray.push(val);
					setNewData((oldArray: any) => [...oldArray, val]);
					return newData;
				});
			} else {
				setError(error.massage);
				return error;
			}
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	const deleteExerciseValue = (e: { target: any }) => {
		const workoutDbRef = ref(
			db,
			`${currentUser.uid}/${musclePartUrl}/${e.target.id.toUpperCase()}`
		);
		remove(workoutDbRef)
			.then(() => {
				setLoading(false);
				setMessage('Exercise data removed');
			})
			.catch(() => {
				setError('Something went wrong!!!Refresh and try again ');
			});
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className='workoutPage-body flex-column center padding-normal'>
					<h2 className='workoutPage-body-header padding-bottom'>
						{musclePartUrl}
					</h2>
					{massage && <Alert severity='success'>{massage}</Alert>}
					{error && <Alert severity='error'>{error}</Alert>}
					<div className='flex-column gap'>
						{React.Children.toArray(
							newData! &&
								newData.map((exercise: any, _uuid: number) => (
									<div className='flex gap-s center'>
										<Link
											to={exercise.description.uuid}
											state={exercise.description.title}
											id={exercise.description.uuid}
											key={exercise.description.uuid}
											className='workoutPage-body-link'>
											{exercise.description.title}
										</Link>
										<BsTrash
											className=' gymPageCard-trash'
											id={exercise.description.title}
											key={exercise.description.title}
											color='red'
											onClick={deleteExerciseValue}
										/>
									</div>
								))
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default DisplayWorkouts;
