import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../firebseConfig/AuthContext';
import Loading from '../../pages/Loading';
import { BsTrash } from 'react-icons/bs';

const DisplayWorkouts = () => {
	const location = useLocation();
	const musclePartUrl = location.state;

	const [newData, setNewData] = useState<any>([]);
	const [error, setError] = useState<any>('');
	const [loading, setLoading] = useState<boolean>(false);
	let parms = useParams();

	const { currentUser } = useAuth();

	// const db = getDatabase();
	// const getWorkout = ref(db, `${currentUser.uid}/${parms.workout?.toUpperCase()}`);

	// onValue(getWorkout, (snapshot) => {
	//     if (snapshot.exists()) {
	//         snapshot.forEach((childSnapshot) => {
	//             const childKey = childSnapshot.key;
	//             const childData = childSnapshot.val();
	//             console.log(childKey)
	//             console.dir(childData)
	//         });
	//     }
	// });

	useEffect(() => {
		const db = getDatabase();
		const getWorkout = ref(db, `${currentUser.uid}/${musclePartUrl}`);
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
					// console.log(newData, exercisesArray);
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
		console.log(e.target);
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
											id={exercise.description.uuid}
											key={exercise.description.uuid}
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
