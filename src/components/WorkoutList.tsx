
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useAuth } from "../firebseConfig/AuthContext"
import { db } from "../firebseConfig/fireaseConfig"
import MainButton from "../components/ButtonMain"
import { Link } from "react-router-dom"
import { IoMdClose } from "react-icons/io"

const WorkOutList = () => {
    const { currentUser } = useAuth()
    const [workout, setWorkout] = useState<string>('')
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)



    const handleWorkoutSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()


        const newWorkout = { workout }
        if (workout) {

            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                weekRutines: arrayUnion(newWorkout)
            })
                .then(() => {
                    setWorkout('')
                    setError(null)
                    setLoading(false)
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