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
import DisplayWorkout from "../components/layout/DisplayWorkout"

const WorkoutPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>('')
    const location = useLocation()
    const workout = location.state




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
                                <DisplayWorkout />
                            </div>
                        </section>
                    </main>
            }
            <BottomMenu />
        </>
    )
}

export default WorkoutPage