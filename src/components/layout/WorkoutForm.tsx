import { Alert } from '@mui/material'
import { getDatabase, push, ref, set, update } from 'firebase/database'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../firebseConfig/AuthContext'
import { uid } from 'uid'
import Loading from '../../pages/Loading'
import MainButton from '../ButtonMain'
import { BsTrash } from 'react-icons/bs'


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
  // const [formValues, setFormValues] = useState(
  //   [{
  //     sets: 1,
  //     load: 0,
  //     reps: 0,
  //   }])

  const location = useLocation()
  const musclePartUrl = location.state
  const uuid = uid()

  // const handleChange = (i: number, e: any) => {
  //   const newFormValues = [...formValues] as any
  //   newFormValues[i][e.target.name] = e.target.value
  //   setFormValues(newFormValues);
  // }

  // const addFormFields = () => {
  //   setFormValues([...formValues, { sets: 1, load: 0, reps: 0 }])
  // }

  // const removeFormFields = (i: number) => {
  //   let newFormValues = [...formValues];
  //   newFormValues.splice(i, 1);
  //   setFormValues(newFormValues)
  // }
  // const exercises = formValues
  // const exerciseData = {
  //   title: `${title.toUpperCase()}`,
  //   timestamp: Date.now(),
  //   exercises,
  //   uuid
  // }


  //To do: check if push is working on new users
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setMessage('Exercise Added!!!')
    e.preventDefault()
    setLoading(true)

    const db = getDatabase();
    push(ref(db, `${currentUser.uid}/${musclePartUrl}`), {
      title: `${title.toUpperCase()}`,
      uuid
      // timestamp: Date.now(),
      // exercises,
    })
      // push(ref(db, `${currentUser.uid}/${musclePartUrl}/${title.toUpperCase()}`), {
      //   timestamp: Date.now(),
      //   title: `${title.toUpperCase()}`,
      //   exercises,
      //   uuid
      // })
      .then(() => {
        setTitle('')
        // setFormValues(
        //   [{
        //     sets: 1,
        //     load: 0,
        //     reps: 0,

        //   }]
        // )
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
      {
        loading ? <Loading /> :
          <section className='workoutForm-section flex-column gap-l center'>
            {
              message && <Alert severity="success">{message}</Alert>
            }
            {
              error && <Alert severity="error">{error}</Alert>
            }
            <form className="workoutForm flex-column center gap-l" onSubmit={handleSubmit}>
              <label className='workoutForm-label' htmlFor='title'>Exercise Title:</label>
              <input
                className='workoutForm-Input'
                type="text"
                id='title'
                name='title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </form>
            {/* {formValues.map((e, index) => (
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
                      <BsTrash
                        className="btn-trash"
                        type="button"
                        onClick={() => removeFormFields(index)} />
                      : null
                  }
                </div>
              ))}
            </form> */}
            <div className="workoutForm-btn-wrapper flex gap-l padding-bottom-large">

              {/* <MainButton
                color={'lightgreen'}
                disabled={false}
                text={'Add Set'}
                type="button"
                onClick={() => addFormFields()}></MainButton> */}
              <MainButton
                disabled={loading}
                color={'lightgreen'}
                onClick={handleSubmit}
                text={'Submit'}
                type={"submit"}></MainButton>
            </div>
            {/* <button className="button submit" type="submit">Submit</button> */}
          </section>
      }
    </>
  )
}

export default WorkoutForm
