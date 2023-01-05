import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getDatabase, ref, onValue, push } from "firebase/database"
import { format, formatDistanceStrict } from 'date-fns'
import { uid } from "uid"
import { useAuth } from "../../firebseConfig/AuthContext"
import BottomMenu from "../BottomMenu"
import DisplayWorkoutDetailsForm from "../DisplayWorkoutDetailsForm"



const DisplayWorkoutDetails = () => {

    const [newData, setNewData] = useState<any>([])
    const [newData1, setNewData1] = useState<any>([])
    // const [message, setMessage] = useState<string>('')
    // const [error, setError] = useState<string>('')
    // const [loading, setLoading] = useState<boolean>(false)
    let exercisesArray1: any[] = []


    let { uuid } = useParams()
    const location = useLocation()
    const title = location.state
    const { currentUser } = useAuth()
    let parms = useParams()

    useEffect(() => {
        // const db = getDatabase();
        // const Ref = ref(db, `${currentUser.uid}/${parms.workout?.toUpperCase()}`);
        // onValue(Ref, (snapshot) => {
        //     setNewData1([])
        //     const data = snapshot.val();
        //     console.log(data)
        //     // setLoading(false)
        //     let exercisesArray: any[] = []
        //     if (data !== null) {

        //         Object.values(data).map((val: any) => {
        //             setNewData([])
        //             exercisesArray.push(val)
        //             setNewData((oldArray: any) => [...oldArray, val])
        //             console.log(newData, exercisesArray);

        //             return newData
        //         })

        //         newData.map((ex: any) => {
        //             setNewData1([])
        //             exercisesArray1.push(ex)
        //             setNewData1((oldArray: any) => [...oldArray, ex])
        //             console.log(newData1.key);
        //         })

        //     }
        // })
        const db = getDatabase();
        const getWorkout = ref(db, `${currentUser.uid}/${parms.workout?.toUpperCase()}/${title.toUpperCase()}`);

        onValue(getWorkout, (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    setNewData([])
                    exercisesArray1.push(childData)
                    exercisesArray1.map((val) => {
                        setNewData((newData: any) => [...newData, val])

                        return newData
                    })
                })
            };
        })

    }, [currentUser])

    const timestamp = 1672833628040
    const milliseconds = timestamp
    const dateObject = new Date(milliseconds)
    console.log(format(new Date(dateObject), 'MM/dd/yyyy'))




    return (
        <>
            <main className="conteiner">
                <section>
                    <h2 className="displayWorkoutDetails-header">{title.toUpperCase()}</h2>
                    <DisplayWorkoutDetailsForm
                        uuid={uuid}
                        title={title}
                        workout={`${parms.workout?.toLocaleUpperCase()}`} />
                    <div>
                        <div className="displayWorkoutDetails-date flex-column center gap-l">
                            <h2 className="displayWorkoutDetails-date-subheader">Date</h2>
                            {
                                React.Children.toArray(
                                    newData! && newData.map((exercise: any, key = exercise.uuid) => (
                                        <div className="displayWorkoutDetails-date-subheader-details" key={key}>
                                            <p>{new Date(exercise.createdAt).toString()}</p>

                                        </div>

                                    ))
                                )
                            }
                        </div>
                    </div>
                </section>
            </main>
            <BottomMenu />
        </>
    )
}


export default DisplayWorkoutDetails