import { getDatabase, ref, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../firebseConfig/AuthContext';

const DisplayWorkout = () => {
    const location = useLocation()
    const musclePartUrl = location.state
    const [newData, setNewData] = useState<any>([])
    const [error, setError] = useState<any>('')

    const { currentUser } = useAuth()
    let exercisesArray: any[] = []

    // useEffect(() => {
    //     const db = getDatabase();
    //     const getWorkout = ref(db, `${currentUser.uid}`);

    //     onValue(getWorkout, (snapshot) => {
    //         if (snapshot.exists()) {
    //             snapshot.forEach((childSnapshot) => {
    //                 const childKey = childSnapshot.key;
    //                 const childData = childSnapshot.val();
    //                 exercisesArray.push(childData)
    //                 setNewData(exercisesArray)
    //                 console.log(childData)

    //             });
    //         } else {
    //             return exercisesArray
    //         }
    //     });

    // }, [currentUser])


    useEffect(() => {
        const db = getDatabase();
        const getWorkout = ref(db, `${currentUser.uid}/${musclePartUrl}`);
        onValue(getWorkout, (snapshot) => {
            setNewData([])
            const data = snapshot.val()
            if (data !== null) {
                Object.values(data).map((val) => {
                    exercisesArray.push(val)
                    setNewData((oldArray: any) => [...oldArray, val])
                    console.log(newData);
                    return newData
                })
            } else {
                setError(error.massage)
                return error
            }
        })

    }, [currentUser])

    return (
        <div className="workoutPage-body flex-column center padding-normal">
            <h2 className="workoutPage-body-header padding-bottom">
                {musclePartUrl}
            </h2>
            <div className="flex-column gap" >
                {
                    React.Children.toArray(
                        newData! && newData.map((exercise: (any), _uuid: number) => (
                            <Link
                                to={exercise.uuid}
                                key={exercise.uuid}
                                className='workoutPage-body-link'>{exercise.title}</Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default DisplayWorkout