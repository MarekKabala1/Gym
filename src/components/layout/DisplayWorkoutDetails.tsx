import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getDatabase, ref, onValue } from "firebase/database"
import { useAuth } from "../../firebseConfig/AuthContext"
import BottomMenu from "../BottomMenu"


const DisplayWorkoutDetails = () => {

    const [newData, setNewData] = useState<any>([])
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState<boolean>(false)

    let { uuid } = useParams()
    const location = useLocation()
    const title = location.state
    const { currentUser } = useAuth()

    useEffect(() => {
        const db = getDatabase();
        const getWorkout = ref(db, `${currentUser.uid}`);

        onValue(getWorkout, (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    console.log(childKey
                    )
                });
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])



    return (
        <>
            <h3>{title}</h3>
            <BottomMenu />
        </>
    )
}


export default DisplayWorkoutDetails