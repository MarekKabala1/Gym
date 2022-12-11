import React from "react"
import { useLocation, useParams } from "react-router-dom"
import BottomMenu from "../BottomMenu"


const DisplayWorkoutDetails = () => {

    let { uuid } = useParams()
    const location = useLocation()
    const title = location.state


    return (
        <>
            <h3>{title}</h3>
            <BottomMenu />
        </>
    )
}


export default DisplayWorkoutDetails