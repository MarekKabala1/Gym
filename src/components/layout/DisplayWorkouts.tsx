import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../firebseConfig/AuthContext';
import Loading from '../../pages/Loading';

const DisplayWorkouts = () => {
    const location = useLocation()
    const musclePartUrl = location.state

    const [newData, setNewData] = useState<any>([])
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { currentUser } = useAuth()

    // const db = getDatabase();
    // const getWorkout = ref(db, `${currentUser.uid}`);

    // onValue(getWorkout, (snapshot) => {
    //     if (snapshot.exists()) {
    //         snapshot.forEach((childSnapshot) => {
    //             const childKey = childSnapshot.key;
    //             const childData = childSnapshot.val();
    //         });
    //     }
    // });

    useEffect(() => {
        const db = getDatabase();
        const getWorkout = ref(db, `${currentUser.uid}/${musclePartUrl}`);
        onValue(getWorkout, (snapshot) => {
            setNewData([])
            setLoading(true)
            let exercisesArray: any[] = []

            const data = snapshot.val()
            if (data !== null) {
                setLoading(false)
                Object.values(data).map((val: any) => {
                    exercisesArray.push(val)
                    setNewData((oldArray: any) => [...oldArray, val])
                    // console.log(val.uuid);
                    return val
                })
            } else {
                setError(error.massage)
                return error
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])


    return (
        <>
            {
                loading ? <Loading /> :
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
                                            state={exercise.title}
                                            id={exercise.uuid}
                                            key={exercise.uuid}
                                            className='workoutPage-body-link'>{exercise.title}</Link>
                                    ))
                                )
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default DisplayWorkouts
