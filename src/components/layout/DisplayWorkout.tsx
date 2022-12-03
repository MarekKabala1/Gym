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
        onValue(getWorkout, (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    exercisesArray.push(childKey)
                    setNewData(exercisesArray)
                    console.log(childKey, childData, exercisesArray)
                });
            } else {
                return exercisesArray
            }
        });

    }, [])


    // useEffect(() => {
    //     const db = getDatabase();
    //     const getWorkout = ref(db, `${currentUser.uid}/${workout}`);
    //     onValue(getWorkout, (snapshot) => {
    //         if (snapshot.exists()) {
    //             Object.keys(snapshot.val()).forEach((val) => {
    //                 exercisesArray.push(val)
    //                 setNewData(exercisesArray)
    //                 // console.log(newData);
    //                 return newData
    //             })
    //         } else {
    //             setError(error.massage)
    //             return error
    //         }
    //     })



    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])


    return (
        <div className="workoutPage-body flex-column center gymPageCardShadow padding-normal">
            <h2 className="workoutPage-body-header padding-bottom">
                {workout}
            </h2>
            <div className="flex-column gap" >
                {
                    newData.map((exercise: (any), id: number) => (
                        <Link
                            to={`${id + 1}`}
                            key={id}
                            className='workoutPage-body-link'>{exercise}</Link>
                    ))

                }
            </div>
        </div>
    )
}

export default DisplayWorkout