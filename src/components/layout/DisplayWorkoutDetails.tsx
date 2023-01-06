import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { format, formatDistance } from 'date-fns';
import { uid } from 'uid';
import { useAuth } from '../../firebseConfig/AuthContext';
import BottomMenu from '../BottomMenu';
import DisplayWorkoutDetailsForm from '../DisplayWorkoutDetailsForm';
import { BsTrash } from 'react-icons/bs';

const DisplayWorkoutDetails = () => {
	const [newData, setNewData] = useState<any>([]);
	const [newData1, setNewData1] = useState<any>([]);
	// const [message, setMessage] = useState<string>('')
	// const [error, setError] = useState<string>('')
	// const [loading, setLoading] = useState<boolean>(false)
	let exercisesArray1: any[] = [];

	let { uuid } = useParams();
	const location = useLocation();
	const title = location.state;
	const { currentUser } = useAuth();
	let parms = useParams();

	useEffect(() => {
		const db = getDatabase();
		const getWorkout = ref(
			db,
			`${
				currentUser.uid
			}/${parms.workout?.toUpperCase()}/${title.toUpperCase()}`
		);

		onValue(getWorkout, (snapshot) => {
			if (snapshot.exists()) {
				snapshot.forEach((childSnapshot) => {
					const childKey = childSnapshot.key;
					const childData = childSnapshot.val();
					console.log(childKey);
					setNewData([]);
					exercisesArray1.push(childData);
					exercisesArray1.map((val) => {
						setNewData((newData: any) => [...newData, val]);

						return newData;
					});
				});
			}
		});
	}, [currentUser]);
	const deleteExerciseValue = (e: { target: any }) => {
		console.log(e.target);
	};

	return (
		<>
			<main className='conteiner'>
				<section>
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
							<h2 className='displayWorkoutDetails-date-subheader'>Date</h2>
							{React.Children.toArray(
								newData! &&
									newData.map((exercise: any, key = exercise.uuid) => (
										<div
											className='displayWorkoutDetails-date-subheader-details flex gap-s'
											key={key}>
											<p>
												{new Intl.DateTimeFormat('en-GB', {
													dateStyle: 'full',
												}).format(exercise.createdAt)}
											</p>

											<BsTrash
												className=' gymPageCard-trash'
												id={exercise}
												key={key}
												color='red'
												onClick={deleteExerciseValue}
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
