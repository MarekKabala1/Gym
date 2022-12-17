import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getDatabase, ref, onValue, push } from "firebase/database"
import { useAuth } from "../../firebseConfig/AuthContext"
import BottomMenu from "../BottomMenu"
import { uid } from "uid"
import DisplayWorkoutDetailsForm from "../DisplayWorkoutDetailsForm"


const DisplayWorkoutDetails = () => {

    const [newData, setNewData] = useState<any>([])
    // const [message, setMessage] = useState<string>('')
    // const [error, setError] = useState<string>('')
    // const [loading, setLoading] = useState<boolean>(false)
    let exercisesArray: any[] = []
    let exercisesArray1: any[] = []


    let { uuid } = useParams()
    const location = useLocation()
    const title = location.state
    const { currentUser } = useAuth()
    let parms = useParams()
    // console.log(uuid, uuid1)

    useEffect(() => {
        const db = getDatabase();
        const Ref = ref(db, `${currentUser.uid}/${parms.workout?.toLocaleUpperCase()}/${uuid}/-NJWAlqXR0MGdpvVugk4/exerciseValues`);
        onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                // setLoading(false)
                Object.values(data).map((val: any) => {
                    setNewData([])
                    exercisesArray.push(val)
                    exercisesArray.map((exercise: any) => {
                        exercisesArray1.push(exercise)
                        setNewData((oldArray: any) => [...oldArray, exercise])

                        return newData
                    })
                    console.log(newData);
                })
            }
        })
    }, [])


    return (
        <>
            <main className="conteiner">
                <section>
                    <h2 className="displayWorkoutDetail-header">{title}</h2>
                    <DisplayWorkoutDetailsForm
                        id={uuid}
                        workout={`${parms.workout?.toLocaleUpperCase()}`} />
                    <div>
                        {
                            React.Children.toArray(
                                newData! && newData.map((exercise: (any), _uuid: number) => (
                                    <div className="flex center gap-xl">
                                        <div>
                                            <h6>Set</h6>
                                            <p>{exercise.sets}</p>
                                        </div>
                                        <div>
                                            <h6>Load</h6>
                                            <p>{exercise.load}</p>
                                        </div>
                                        <div>
                                            <h6>Reps</h6>
                                            <p>{exercise.reps}</p>
                                        </div>
                                    </div>

                                ))
                            )
                        }
                    </div>
                </section>
            </main>
            <BottomMenu />
        </>
    )
}


export default DisplayWorkoutDetails