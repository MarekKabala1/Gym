import { Alert } from '@mui/material'
import { useState } from 'react'

const WorkoutForm = () => {
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const workout = { title, load, reps }
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