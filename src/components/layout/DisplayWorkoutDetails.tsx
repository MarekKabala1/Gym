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
        const Ref = ref(db, `${currentUser.uid}/${parms.workout?.toLocaleUpperCase()}/${parms.uuid}`);
        onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            setNewData((newData: any) => [...newData, data])
            console.log(data);
            // if (data !== null) {
            //     // setLoading(false)
            //     Object.values(data).map((val: any) => {
            //         exercisesArray.push(val)
            //         // console.log(exercisesArray)
            //         exercisesArray.map((exercise: any) => {
            //             setNewData([])
            //             exercisesArray1.push(exercise)
            //             setNewData((oldArray: any) => [...oldArray, exercise])

            // return console.log(newData)
        })
        // setNewData1([])
        // exercisesArray1.map((ex: any) => {
        //     setNewData1((newData1: any) => [...newData, ex])
        //     return console.dir(newData1)
        // })
        // console.log(newData);
        // })


        // }
        // })
    }, [currentUser])


    return (
        <>
            <main className="conteiner">
                <section>
                    <h2 className="displayWorkoutDetail-header">{title}</h2>
                    <DisplayWorkoutDetailsForm
                        uuid={uuid}
                        workout={`${parms.workout?.toLocaleUpperCase()}`} />
                    <div>
                        {
                            React.Children.toArray(
                                newData! && newData.map((exercise: (any), _uuid: number) => (
                                    <div className="flex center gap-xl">
                                        <div>
                                            <h6>Date</h6>
                                            <p>{new Intl.DateTimeFormat
                                                ('en-US',
                                                    {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit'
                                                    }).format(exercise.createdAt)}</p>
                                            <p>{exercise.uuid}</p>
                                            <p>{exercise.title}</p>
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