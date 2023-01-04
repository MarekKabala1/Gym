import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getDatabase, ref, onValue, push } from "firebase/database"
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
                    console.log(childKey)
                    console.dir(childData)
                    setNewData([])
                    exercisesArray1.push(childData)
                    exercisesArray1.map((val) => {
                        setNewData((newData: any) => [...newData, val])
                        console.log(newData);

                        return newData
                    })
                })
            };
        })

    }, [currentUser])

    const timestamp = 0
    const milliseconds = timestamp * 1000
    const dateObject = new Date(milliseconds)
    const humanDate = dateObject.getDay()




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
                        <div className="flex-column center gap-xl">
                            <h6>Date</h6>
                            {
                                React.Children.toArray(
                                    newData! && newData.map((exercise: any, key = exercise.uuid) => (
                                        <div key={key}>
                                            <p>{(exercise.createdAt)}</p>

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