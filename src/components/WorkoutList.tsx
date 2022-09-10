
import { IoMdClose } from "react-icons/io"
import { useState } from "react"
import { Link } from "react-router-dom"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebseConfig/fireaseConfig"
import { useAuth } from "../firebseConfig/AuthContext"
import MainButton from "../components/ButtonMain"

const WorkOutList = (props: any) => {
    const { currentUser } = useAuth()
    const [workout, setWorkout] = useState<string>('')
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [visible, setVisbile] = useState<boolean>()

    const handleWorkoutSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (workout) {

            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                weekRutines: arrayUnion(workout.toUpperCase())
            })
                .then(() => {
                    setWorkout('')
                    setError(null)
                    setLoading(false)
                    setVisbile(false)
                    console.log('workout added')
                })
                .catch((err) => {
                    setError(error)
                    console.log(err);
                })
        } else {
            setLoading(true)
        }
    }



    return (
        <div className="signUp flex-column center ">
            <form className="flex-column center gap padding-l-top-bottom"
                onSubmit={handleWorkoutSubmit}
                style={{ position: 'relative' }}
            >
                <Link to="/gym" >
                    <IoMdClose
                        style={{ position: 'absolute', zIndex: '100', right: '0.4rem', top: '0.6rem' }} />
                </Link>
                <input className="textField"
                    name="workout"
                    autoComplete="off"
                    type="text"
                    placeholder="Workout Type"
                    required
                    value={workout}
                    onChange={(e) => setWorkout(e.target.value)} />
                <MainButton disabled={loading} color={'lightgreen'} onClick={handleWorkoutSubmit} text={'Add Workout'} type={"submit"}></MainButton>
            </form>
        </div>
    )
}

export default WorkOutList


