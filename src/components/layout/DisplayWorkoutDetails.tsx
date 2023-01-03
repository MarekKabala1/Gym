import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getDatabase, ref, onValue, push } from "firebase/database"
import { useAuth } from "../../firebseConfig/AuthContext"
import BottomMenu from "../BottomMenu"
import { uid } from "uid"
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
                    console.log(childKey)
                    console.dir(childData)
                    setNewData([])
                    exercisesArray1.push(childData)
                    setNewData((oldArray: any) => [...oldArray, childData])
                    console.log(newData[0].createdAt);

                    return newData
                })
            };
        })

    }, [currentUser])


    return (
        <>
            <main className="conteiner">
                <section>
                    <h2 className="displayWorkoutDetail-header">{title.toUpperCase()}</h2>
                    <DisplayWorkoutDetailsForm
                        uuid={uuid}
                        title={title}
                        workout={`${parms.workout?.toLocaleUpperCase()}`} />
                    <div>
                        <div className="flex center gap-xl">
                            <h6>Date</h6>
                            {
                                React.Children.toArray(
                                    newData! && newData.map((exercise: any, key = exercise.uuid) => (
                                        <div key={key}>
                                            <p>{new Intl.DateTimeFormat('en-US',
                                                {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                }).format(exercise.createdAt)}</p>
                                            {/* <p>{exercise["-NKiXQ8S_THFCBhypCeL"].createdAt}</p> */}
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