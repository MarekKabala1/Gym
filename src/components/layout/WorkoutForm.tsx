import { Alert } from '@mui/material'
import { getDatabase, push, ref, set } from 'firebase/database'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../firebseConfig/AuthContext'
import { uid } from 'uid'
import Loading from '../../pages/Loading'
import MainButton from '../ButtonMain'


const WorkoutForm = () => {
  const [title, setTitle] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const { currentUser } = useAuth()
  const location = useLocation()
  const musclePartUrl = location.state
  const uuid = uid()


  //To do: check if push is working on new users
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setMessage('Exercise Added!!!')
    e.preventDefault()
    setLoading(true)

    const db = getDatabase();
    set(ref(db, `${currentUser.uid}/${musclePartUrl}/${uuid}`), {
      title: `${title.toUpperCase()}`,
      uuid: uuid
    })

      .then(() => {
        setTitle('')
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
            <div className="workoutForm-btn-wrapper flex gap-l padding-bottom-large">
              <MainButton
                disabled={loading}
                color={'lightgreen'}
                onClick={handleSubmit}
                text={'Submit'}
                type={"submit"}></MainButton>
            </div>
          </section>
      }
    </>
  )
}

export default WorkoutForm
