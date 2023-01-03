import React, { useState } from "react"
import { getDatabase, ref, push, set } from "firebase/database"
import { useAuth } from "../firebseConfig/AuthContext"
import MainButton from "./ButtonMain"
import { BsTrash } from "react-icons/bs"
import { Alert } from "@mui/material"
import { uid } from "uid"

const DisplayWorkoutDetailsForm = (props: any) => {

  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [exerciseValues, setExerciseValues] = useState(
    [{
      sets: 1,
      load: 0,
      reps: 0,
    }])

  const { currentUser } = useAuth()
  const uuid = uid()
  // console.log(props.workout, props.id)

  const handleChange = (i: number, e: any) => {
    const newFormValues = [...exerciseValues] as any
    newFormValues[i][e.target.name] = e.target.value
    setExerciseValues(newFormValues);
  }

  const addFormFields = () => {
    setExerciseValues([...exerciseValues, { sets: 1, load: 0, reps: 0 }])
  }

  const removeFormFields = (i: number) => {
    let newFormValues = [...exerciseValues];
    newFormValues.splice(i, 1);
    setExerciseValues(newFormValues)
  }

  //To do: check if push is working on new users
  const handleSubmit = async (e: { preventDefault: () => void }) => {

    setMessage('Exercise Added!!!')
    e.preventDefault()
    setLoading(true)
    let exerciseDetails: [] = []

    const db = getDatabase();
    push(ref(db, `${currentUser.uid}/${props.workout}/${props.title.toUpperCase()}/${exerciseDetails}`), {
      createdAt: Date.now(),
      exerciseValues,
    })
      .then(() => {
        setExerciseValues(
          [{
            sets: 1,
            load: 0,
            reps: 0,

          }]
        )
        setLoading(false)
        setTimeout(() => {
          setMessage('')
        }, 3000)
      })
      .catch((err) => {
        setError('Pls Refresh Page And Try Again')
        console.log(err);
        setLoading(false)
      })
  }

  return (
    <>
      {
        message && <Alert severity="success">{message}</Alert>
      }
      {
        error && <Alert severity="error">{error}</Alert>
      }
      <div>
        {exerciseValues.map((e, index) => (
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
      </div>
    </>
  )
}

export default DisplayWorkoutDetailsForm