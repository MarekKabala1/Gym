import { Alert } from '@mui/material'
import { getDatabase, ref, set } from 'firebase/database'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../firebseConfig/AuthContext'
import Loading from '../../pages/Loading'
import MainButton from '../ButtonMain'


// type workoutType = [{
//   sets: number,
//   load: number,
//   reps: number
// }]

const WorkoutForm = () => {
  const { currentUser } = useAuth()
  const [title, setTitle] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState(
    [{
      sets: 1,
      load: 0,
      reps: 0,
    }])

  const location = useLocation()
  const musclePartUrl = location.state
  const { db } = useAuth()



  const handleChange = (i: number, e: any) => {
    const newFormValues = [...formValues] as any
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues);
  }

  const addFormFields = () => {
    setFormValues([...formValues, { sets: 1, load: 0, reps: 0 }])
    console.log(formValues)
  }

  const removeFormFields = (i: number) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
    console.log(newFormValues)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)
    const db = getDatabase();
    set(ref(db, `${currentUser.uid}/${Date.now()}`), {
      title,
      id: currentUser.uid,
      formValues
    })
      .then(() => {
        setTitle('')
        setFormValues(
          [{
            sets: 1,
            load: 0,
            reps: 0,

          }]
        )
        setLoading(false)
      })
      .catch((err) => {
        setError('ERROR!!! Please refresh the page and try again.')
        console.log(err);
      })


    console.log(formValues);

  }
  if (loading) {
    return <Loading />
  } else {

    return (
      <section className='flex-column gap-l center'>
        {
          message && <Alert severity="success">{message}</Alert>
        }
        {
          error && <Alert severity="error">{error}</Alert>
        }
        {/* <form className="flex-column center gap-l" onSubmit={handleSubmit}>
        <div className='flex-column center width-l gap-s'>
          <label className='workoutForm-label '>Exercise Title:</label>
          <input
            className='workoutForm-Input'
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div> */}

        <form className="flex-column center gap-l" onSubmit={handleSubmit}>
          <div className='flex-column center width-l gap-s' >
            <label className='workoutForm-label' htmlFor='title'>Exercise Title:</label>
            <input
              className='workoutForm-Input'
              type="text"
              id='title'
              name='title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
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

}

export default WorkoutForm
