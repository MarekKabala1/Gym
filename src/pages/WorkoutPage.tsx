/* eslint-disable react-hooks/exhaustive-deps */
import WorkoutForm from "../components/layout/WorkoutForm"
import BottomMenu from "../components/BottomMenu"
import { Link, useLocation } from "react-router-dom"
import { getDatabase, ref, onValue } from "firebase/database"
import { useAuth } from "../firebseConfig/AuthContext"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import React from "react"
import { Alert } from "@mui/material"

const WorkoutPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [newData, setNewData] = useState<Array<any>[]>([])
    const [error, setError] = useState<any>('')
    const location = useLocation()
    const workout = location.state
    const { currentUser } = useAuth()
    let exercisesArray: any[] = []

    const DisplayWorkout = async () => {
        const db = getDatabase();
        const getWorkout = ref(db, `${currentUser.uid}/${workout}`);
        onValue(getWorkout, (snapshot) => {
            if (snapshot.exists()) {
                Object.keys(snapshot.val()).forEach((val) => {
                    exercisesArray.push([val])
                    setNewData(exercisesArray)
                    // console.log(newData);
                    return newData
                })
            } else {
                setError(error.massage)
                return error
            }
        })
    }
    useEffect(() => {
        DisplayWorkout()

    }, [])



    return (
        <>
            {
                error && <Alert severity="error">{error}</Alert>
            }
            {
                loading ? <Loading /> :
                    <main className="workoutPage-wrapper">
                        <section>
                            <div className="workoutPage-header flex-column center">
                                <div className="workoutPage-imgWrapper" style={{ height: '200px' }}>
                                    <img src={`${process.env.PUBLIC_URL}/img-svg/img/${workout}.png`}
                                        alt={`Muscle part for exercise: ${workout}`}
                                        style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                </div>
                                <WorkoutForm />
                            </div>
                            <div className="workoutPage-body flex-column center">
                                <h2 className="workoutPage-body-header padding-large">
                                    {workout}
                                </h2>
                                <div className="flex-column gap" >
                                    {
                                        React.Children.toArray(
                                            newData! && newData.map((exercise: (any), id: number) => (
                                                <Link
                                                    to={exercise}
                                                    key={id}
                                                    className='workoutPage-body-link'>{String(exercise)}</Link>
                                            ))
                                        )
                                    }
                                </div>
                            </div>

                        </section>
                    </main>
            }
            <BottomMenu />
        </>
    )
}

export default WorkoutPage