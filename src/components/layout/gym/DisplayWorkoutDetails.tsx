import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
	getDatabase,
	ref,
	onValue,
	push,
	onChildRemoved,
	get,
	child,
} from 'firebase/database';
import { useAuth } from '../../../firebseConfig/AuthContext';
import BottomMenu from '../../BottomMenu';
import DisplayWorkoutDetailsForm from './DisplayWorkoutDetailsForm';
import { BsTrash } from 'react-icons/bs';
import { database } from '../../../firebseConfig/fireaseConfig';

const DisplayWorkoutDetails = () => {
	const [newData, setNewData] = useState<any>([]);
	const [newData1, setNewData1] = useState<any>([]);
	// const [message, setMessage] = useState<string>('')
	// const [error, setError] = useState<string>('')
	// const [loading, setLoading] = useState<boolean>(false)
	let exercisesArray1: any[] = [];
	let exercisesArray: any[] = [];

	let { uuid } = useParams();
	const location = useLocation();
	const title = location.state;
	const { currentUser } = useAuth();
	let parms = useParams();
	console.log(newData);

	useEffect(() => {
		const db = getDatabase();
		const getWorkout = ref(
			db,
			`${
				currentUser.uid
			}/${parms.workout?.toUpperCase()}/${title.toUpperCase()}`
		);
		onValue(getWorkout, (snapshot) => {
			exercisesArray1 = [];
			setNewData([]);
			if (snapshot.exists()) {
				snapshot.forEach((childSnapshot) => {
					const childKey = childSnapshot.key;
					const childData = childSnapshot.val();
					// console.log(childKey);
					exercisesArray1.push(childData);
					setNewData([]);
					exercisesArray1.map((val) => {
						setNewData((oldArray: any) => [...oldArray, val]);

						return newData;
					});
				});
			}
		});
	}, [currentUser]);

	//Check what is wrong
	const deleteExerciseValue = (e: any) => {
		const db = getDatabase();
		const getWorkout = ref(
			db,
			`${
				currentUser.uid
			}/${parms.workout?.toUpperCase()}/${title.toUpperCase()}`
		);

		onValue(getWorkout, (snapshot) => {
			exercisesArray = [];
			if (snapshot.exists()) {
				snapshot.forEach((childSnapshot) => {
					const childKey = childSnapshot.key;
					const childData = childSnapshot.val();
					// console.log(childData);
					exercisesArray.push(Object.values(childData));
					console.dir(exercisesArray);

					if (e.target.id === childData.uuid) {
						console.log(e.target.id, childData.uuid);
						setNewData(
							newData.filter((val: { uuid: any }) => val.uuid !== e.target.id)
						);
						console.log(newData);
					}
				});
			}
		});
	};
	return (
		<>
			<main className='conteiner displayWorkoutDetails-container'>
				<section className='displayWorkoutDetails-section'>
					<h2 className='displayWorkoutDetails-header'>
						{title.toUpperCase()}
					</h2>
					<DisplayWorkoutDetailsForm
						uuid={uuid}
						title={title}
						workout={`${parms.workout?.toLocaleUpperCase()}`}
					/>
					<div>
						<div className='displayWorkoutDetails-date flex-column center gap-l'>
							<h2 className='displayWorkoutDetails-date-subheader'>
								Exercise Data
							</h2>
							{React.Children.toArray(
								newData! &&
									newData.map((exercise: any, key = exercise.uuid) => (
										<div
											className='displayWorkoutDetails-date-subheader-details flex gap-s center'
											key={exercise.uuid}>
											<div>
												<p style={{ marginBottom: '1rem' }}>
													{new Intl.DateTimeFormat('en-GB', {
														// dateStyle: 'full',
														year: 'numeric',
														month: 'long',
														day: 'numeric',
														hour: 'numeric',
														minute: 'numeric',
													}).format(exercise.createdAt)}
												</p>
												<div>
													{exercise.exerciseValues! &&
														exercise.exerciseValues.map((el: any, key: any) => {
															// console.log(el.load, el.sets, el.reps);
															return (
																<div key={key} className=' flex gap center'>
																	<div className='displayWorkoutDetails-details flex center gap'>
																		<h3>SET</h3>
																		<p key={el.sets}>{el.sets}</p>
																	</div>
																	<div className='displayWorkoutDetails-details flex center gap'>
																		<h3>LOAD</h3>
																		<p key={el.index}>{el.load}</p>
																	</div>
																	<div className='displayWorkoutDetails-details flex center gap'>
																		<h3>REPS</h3>
																		<p key={el.reps.index}>{el.reps}</p>
																	</div>
																</div>
															);
														})}
												</div>
											</div>
											<BsTrash
												className=' gymPageCard-trash'
												color='red'
												onClick={deleteExerciseValue}
												id={exercise.uuid}
												key={exercise.uuid}
											/>
										</div>
									))
							)}
						</div>
					</div>
				</section>
			</main>
			<BottomMenu />
		</>
	);
};

export default DisplayWorkoutDetails;
