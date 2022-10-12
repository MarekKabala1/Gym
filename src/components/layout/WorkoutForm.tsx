import { Alert } from '@mui/material'
import { getDatabase, ref, set } from 'firebase/database'
import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../firebseConfig/AuthContext'
import MainButton from '../ButtonMain'

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
  const inputField: any = []
  const [inputLists, setInputLists] = useState<any>([])

  const location = useLocation()
  const element = location.state

  const workout: workoutType = {
    title, sets, load, reps,
  }

  const writeUserWorkoutData = async () => {
    const db = getDatabase();
    await set(ref(db, `${element}/` + currentUser.uid), {
      title: title,
      set: sets,
      reps: reps,
      load: load,
      createdAt: new Date()
    })
      .then(() => {
        setTitle('')
        setLoad('')
        setReps('')
      })
      .catch((error) => {
        setError(error.massage)
      })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    writeUserWorkoutData()
    console.log(workout);

  }
  const addSet = (event: any) => {
    let newField = { sets: '', load: '', reps: '' }
    setInputLists([...inputField, newField])
    console.log("click add");
  }
  const delSet = (event: any) => {
    console.log("click del", event);
  }

  return (
    <section className='flex-column gap-l center'>
      <form className="flex center gap-l" onSubmit={handleSubmit}>
        <div className="workoutForm flex-column center gap-l">
          <h3 className='workoutForm-header'>New Workout</h3>
          <div className='flex-column center width-l gap-s'>
            <label className='workoutForm-label '>Excersize Title:</label>
            <input
              className='workoutForm-Input'
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          {/* <div className='flex addSet'>
            <div className="flex-column gap-s center">
              <label className='workoutForm-label'>Set:</label>
              <input
                className='workoutForm-Input'
                type="number"
                onChange={(e) => setSets(e.target.value)}
                value={sets}
              />
            </div>
            <div className="flex-column gap-s center">
              <label className='workoutForm-label'>Load (in kg):</label>
              <input
                className='workoutForm-Input'
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
              />
            </div>
            <div className="flex-column gap-s center">
              <label className='workoutForm-label'>Number of Reps:</label>
              <input
                className='workoutForm-Input'
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
              />
            </div>
          </div> */}
          {
            React.Children.toArray(
              inputLists.map((inputList: (any), index: React.Key | null | undefined) => (
                <div className='flex center' key={index}>
                  <div className="flex-column gap-s center">
                    <label className='workoutForm-label'>Set:</label>
                    <input
                      className='workoutForm-Input'
                      type="text"
                      onChange={(e) => setSets(e.target.value)}
                      value={sets}
                    />
                  </div>
                  <div className="flex-column gap-s center">
                    <label className='workoutForm-label'>Load (in kg):</label>
                    <input
                      className='workoutForm-Input'
                      type="number"
                      onChange={(e) => setLoad(e.target.value)}
                      value={load}
                    />
                  </div>
                  <div className="flex-column gap-s center">
                    <label className='workoutForm-label'>Number of Reps:</label>
                    <input
                      className='workoutForm-Input'
                      type="number"
                      onChange={(e) => setReps(e.target.value)}
                      value={reps}
                    />
                  </div>
                </div>
              ))
            )
          }
        </div>
        {error && <Alert sx={{ maxWidth: '100%' }} severity="error">{error}</Alert>}
      </form>
      <div className='flex f-space-b width-l '>
        <button className='setButton margin-small flex center addSet' onClick={addSet}> + </button>
        <button className='setButton margin-small flex center delSet' onClick={delSet}> - </button>
      </div>
      {/* <button type='submit' onClick={handleSubmit}>Add</button> */}
      <MainButton
        disabled={loading}
        color={'lightgreen'}
        onClick={handleSubmit}
        text={'Add'}
        type={"submit"}></MainButton>
    </section>
  )
}

export default WorkoutForm
