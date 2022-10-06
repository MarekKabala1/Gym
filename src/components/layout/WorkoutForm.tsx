import { Alert } from '@mui/material'
import { getDatabase, ref, set } from 'firebase/database'
import { Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../firebseConfig/AuthContext'

type workoutType = {
  title: string
  load?: number
  reps?: number
}

const WorkoutForm = () => {
  const { currentUser } = useAuth()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState<any>('')
  const [reps, setReps] = useState<any>('')
  const [error, setError] = useState('')

  const location = useLocation()
  const element = location.state

  const workout: workoutType = {
    title, load, reps,
  }
  const writeUserWorkoutData = async () => {
    const db = getDatabase();
    await set(ref(db, `${element}/` + currentUser.uid), {
      title,
      reps,
      load,
      Timestamp
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




  return (
    <form className="workoutForm flex-column center gap-s" onSubmit={handleSubmit}>
      <h3 className='workoutForm-header'>New Workout</h3>

      <label className='workoutForm-label'>Excersize Title:</label>
      <input
        className='workoutForm-Input'
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label className='workoutForm-label'>Load (in kg):</label>
      <input
        className='workoutForm-Input'
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label className='workoutForm-label'>Number of Reps:</label>
      <input
        className='workoutForm-Input'
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <button>Add</button>
      {error && <Alert sx={{ maxWidth: '100%' }} severity="error">{error}</Alert>}
    </form>
  )
}

export default WorkoutForm
