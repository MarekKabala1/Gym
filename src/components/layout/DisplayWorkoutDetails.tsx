import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getDatabase, ref, onValue, push } from "firebase/database"
import { useAuth } from "../../firebseConfig/AuthContext"
import BottomMenu from "../BottomMenu"
import { uid } from "uid"
import MainButton from "../ButtonMain"
import { BsTrash } from "react-icons/bs"


const DisplayWorkoutDetails = () => {


    const [newData, setNewData] = useState<any>([])
    const [message, setMessage] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [formValues, setFormValues] = useState(
        [{
            sets: 1,
            load: 0,
            reps: 0,
        }])


    let { uuid } = useParams()
    const location = useLocation()
    const title = location.state
    const { currentUser } = useAuth()
    const uuid1 = uid()
    let parms = useParams()
    console.log(parms.workout?.toLocaleUpperCase())



    const handleChange = (i: number, e: any) => {
        const newFormValues = [...formValues] as any
        newFormValues[i][e.target.name] = e.target.value
        setFormValues(newFormValues);
    }

    const addFormFields = () => {
        setFormValues([...formValues, { sets: 1, load: 0, reps: 0 }])
    }

    const removeFormFields = (i: number) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    const exercises = formValues

    //To do: check if push is working on new users
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        setMessage('Exercise Added!!!')
        const exercises = formValues
        e.preventDefault()
        setLoading(true)

        const db = getDatabase();
        push(ref(db, `${currentUser.uid}`), {
            timestamp: Date.now(),
            exercises,
            uuid
        })
            // push(ref(db, `${currentUser.uid}/${musclePartUrl}/${title.toUpperCase()}`), {
            //   timestamp: Date.now(),
            //   title: `${title.toUpperCase()}`,
            //   exercises,
            //   uuid
            // })
            .then(() => {
                setFormValues(
                    [{
                        sets: 1,
                        load: 0,
                        reps: 0,

                    }]
                )
                setLoading(false)
                setTimeout(() => {
                    setMessage('')
                }, 4000)
            })
            .catch((err) => {
                setError('ERROR!!! Please refresh the page and try again.')
                console.log(err);
                setLoading(false)
            })
    }



    return (
        <>
            <main className="conteiner">
                <section>
                    <h2 className="displayWorkoutDetail-header">{title}</h2>
                    {formValues.map((e, index) => (
                        <div className="flex center" key={index}>
                            <div className="flex-column gap-s center ">
                                <label className='workoutForm-label'>Sets</label>
                                <input
                                    className='workoutForm-Input'
                                    type="number"
                                    name="sets"
                                    value={e.sets = 1 + index}
                                    onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className="flex-column gap-s center">
                                <label className='workoutForm-label'>Load(kg)</label>
                                <input
                                    className='workoutForm-Input'
                                    type="number"
                                    name="load"
                                    value={e.load || ''}
                                    onChange={e => handleChange(index, e)} />
                            </div>
                            <div className="flex-column gap-s center">
                                <label className='workoutForm-label'>Reps</label>
                                <input
                                    className='workoutForm-Input'
                                    type="number"
                                    name="reps"
                                    value={e.reps || ''}
                                    onChange={(e) => handleChange(index, e)} />
                            </div>
                            {index ?
                                <BsTrash
                                    className="btn-trash"
                                    type="button"
                                    onClick={() => removeFormFields(index)} />
                                : null}
                        </div>
                    ))}
                    <div className="workoutForm-btn-wrapper flex center gap-l padding-large">
                        <MainButton
                            color={'lightgreen'}
                            disabled={false}
                            text={'Add Set'}
                            type="button"
                            onClick={() => addFormFields()}></MainButton>
                        <MainButton
                            disabled={loading}
                            color={'lightgreen'}
                            onClick={handleSubmit}
                            text={'Submit'}
                            type={"submit"}></MainButton>
                    </div>
                </section>
            </main>
            <BottomMenu />
        </>
    )
}


export default DisplayWorkoutDetails