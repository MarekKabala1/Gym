import { Alert } from '@mui/material'
import { rejects } from 'assert'
import { getDatabase, ref, set } from 'firebase/database'
import { serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../firebseConfig/AuthContext'
import MainButton from '../ButtonMain'
// type workoutType = {
//   title: string
//   sets: number
//   load?: number
//   reps?: number
// }

const WorkoutForm = () => {
  const { currentUser } = useAuth()
  const [title, setTitle] = useState<string>('')
  const [messege, setMessege] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState(
    [{
      title,
      sets: '',
      load: '',
      reps: '',
      createdAt: serverTimestamp()
    }])

  const location = useLocation()
  const musclePartUrl = location.state

  const eee = (e: { sets: any; load: any; reps: any }) => {
    const newFormWithWorkoutDataSend = {
      title: title,
      sets: e.sets,
      load: e.load,
      reps: e.reps,
      createdAt: new Date()
    }
    console.log(newFormWithWorkoutDataSend);
  }


  const writeUserWorkoutData = (e: { sets: any; load: any; reps: any }) => {

    // const db = getDatabase();
    // // eslint-disable-next-line no-useless-concat
    // await set(ref(db, `${musclePartUrl}/` + `${currentUser.uid}`), {

    // })
    const promise = new Promise((resolve) => {
      resolve(eee)
      console.log("ide dalej");
    })
      .then(() => {
        setMessege('Exercise Added')
        setFormValues([{
          title,
          sets: '',
          load: '',
          reps: '',
          createdAt: serverTimestamp()

        }])
        setTimeout(() => {
          setMessege('')
        }, 2000)
        setTitle('')
      })
      .catch((_error) => {
        setError('Unable o send data. Please try later')
      })
    console.log(promise, formValues, eee(e))

  }

  // To do: new form value not working
  let handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let newFormValues = [...formValues] as any
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { title, sets: '', load: '', reps: '', createdAt: serverTimestamp() }])
    console.log(formValues)
  }

  let removeFormFields = (i: number) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    writeUserWorkoutData(e as any);
    // console.log(formValues);

  }

  return (
    <section className='flex-column gap-l center'>
      {
        messege && <Alert severity="success">{messege}</Alert>
      }
      {
        error && <Alert severity="error">{error}</Alert>
      }
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
        {formValues.map((e, index) => (
          <div className="flex center" key={index}>
            <div className="flex-column gap-s center">
              <label className='workoutForm-label'>Sets</label>
              <input
                className='workoutForm-Input'
                type="number"
                name="sets"
                value={e.sets || ''}
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

export default WorkoutForm
