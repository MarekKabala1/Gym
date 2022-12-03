import { getDatabase, ref, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../firebseConfig/AuthContext';

const DisplayWorkout = () => {
    const location = useLocation()
    const workout = location.state
    const [newData, setNewData] = useState<Array<any>[]>([])
    const [error, setError] = useState<any>('')

    const { currentUser } = useAuth()
    let exercisesArray: any[] = []





    useEffect(() => {
        const db = getDatabase();
        const getWorkout = ref(db, `${currentUser.uid}/${workout}`);
        // onValue(getWorkout, (snapshot) => {
        //     if (snapshot.exists()) {
        //         Object.keys(snapshot.val()).forEach((val) => {
        //             exercisesArray.push(val)
        //             setNewData(exercisesArray)
        //             // console.log(newData);
        //             return newData
        //         })
        //     } else {
        //         setError(error.massage)
        //         return error
        //     }
        // })
        onValue(getWorkout, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                console.log(childKey, childData)
                exercisesArray.push(childKey)
                setNewData(exercisesArray)
            });
        }, {
            onlyOnce: true
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="workoutPage-body flex-column center">
            <h2 className="workoutPage-body-header padding-large">
                {workout}
            </h2>
            <div className="flex-column gap" >
                {
                    newData.map((exercise: (any), id: number) => (
                        <Link
                            to={exercise}
                            key={id}
                            className='workoutPage-body-link'>{exercise}</Link>
                    ))

                }
            </div>
        </div>
    )
}

export default DisplayWorkout