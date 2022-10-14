import { Alert } from '@mui/material'
import { getDatabase, ref, set } from 'firebase/database'
import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../firebseConfig/AuthContext'
import MainButton from '../ButtonMain'
import { BsTrash } from 'react-icons/bs'

type workoutType = {
  title: string
  sets: number
  load?: number
  reps?: number
}

const WorkoutForm = () => {
  const { currentUser } = useAuth()
  const [title, setTitle] = useState('')
  const [sets, setSets] = useState<any>(1)
  const [load, setLoad] = useState<any>('')
  const [reps, setReps] = useState<any>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [inputLists, setInputLists] = useState<any>([])
  const [formValues, setFormValues] = useState([{ sets: '', load: '', reps: '' }])

  const location = useLocation()
  const element = location.state

  const workout: workoutType = {
    title, sets, load, reps,
  }

  const writeUserWorkoutData = async () => {
    // console.log(formValues)
    // const db = getDatabase();
    // await set(ref(db, `${element}/` + currentUser.uid), {
    //   title: title,
    //   set: sets,
    //   reps: reps,
    //   load: load,
    //   createdAt: new Date()
    // })
    //   .then(() => {
    //     setTitle('')
    //     setLoad('')
    //     setReps('')
    //   })
    //   .catch((error) => {
    //     setError(error.massage)
    //   })
  }

  //To do: new form value not working
  let handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let newFormValues = [...formValues];
    // newFormValues[index + 1][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    console.log(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { sets, load, reps }])
    console.log()
  }

  let removeFormFields = (i: number) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    writeUserWorkoutData()
    console.log(workout);

  }

  return (
    <section className='flex-column gap-l center'>
      <form className="flex-column center gap-l" onSubmit={handleSubmit}>
        <div className='flex-column center width-l gap-s'>
          <label className='workoutForm-label '>Excersize Title:</label>
          <input
            className='workoutForm-Input'
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        {formValues.map((element, index) => (
          <div className="flex center" key={index}>
            <div className="flex-column gap-s center">
              <label className='workoutForm-label'>Sets</label>
              <input
                className='workoutForm-Input'
                type="number"
                name="sets"
                value={index + 1}
                onChange={e => handleChange(index, e)} />
            </div>
            <div className="flex-column gap-s center">
              <label className='workoutForm-label'>Reps</label>
              <input
                className='workoutForm-Input'
                type="number"
                name="reps"
                value={element.reps}
                onChange={e => handleChange(index, e)} />
            </div>
            <div className="flex-column gap-s center">
              <label className='workoutForm-label'>Load(kg)</label>
              <input
                className='workoutForm-Input'
                type="number"
                name="Load"
                value={element.load}
                onChange={e => handleChange(index, e)} />
            </div>
            {
              index ?
                <button
                  className="btn-trash"
                  type="button"
                  disabled={false}
                  onClick={() => removeFormFields(index)}>x</button>
                : null
            }
          </div>
        ))}
      </form>
      <div className="workoutForm-btn-wrapper flex gap-l">
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
      {/* <button className="button submit" type="submit">Submit</button> */}
    </section>
  )

}

export default WorkoutForm
