import { useEffect, useState } from "react";
import BottomMenu from "../components/BottomMenu";
import { useAuth } from "../firebseConfig/AuthContext"
import { IoIosAddCircleOutline } from "react-icons/io"

const GymPage = () => {
    const currentUser = useAuth()
    const [workOutDiv, setWorkOutDiv] = useState<any>([])
    const [typeOfWorkout, setTypeOfWorkout] = useState<string>()
    useEffect(() => {
        if (currentUser) {

        }
    }, [currentUser])


    const newDiv = () => {
        return (
            <form className="form_wrapper flex-column center" style={{ paddingTop: '1rem' }} onSubmit={submitTypeOfWorkout}>
                <input
                    className="gymPage_workout"
                    placeholder="Workout type"
                    type="text"
                    required
                    value={typeOfWorkout}
                    onChange={(e) => setTypeOfWorkout(e.target.value)} />
                <button
                    className="btn"
                    style={{ backgroundColor: 'lightgreen' }}
                    type="submit">Add</button>
            </form>
        )
    }

    const submitTypeOfWorkout = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('1');
        return typeOfWorkout
    }

    const addWorkout = () => {
        return setWorkOutDiv(newDiv)
    }


    return (
        <>
            <section className="gymPage-section flex-column center">
                <h1 className="gymPage_heading">GYM</h1>
                <div className="gymPage-sectionWrapper flex-column center">
                    <div className="gymPage_add flex center " onClick={addWorkout}><IoIosAddCircleOutline /><span>Add Workout</span></div>
                </div>
                <div style={{ gap: '1rem' }} className="flex-column center">
                    {workOutDiv}{typeOfWorkout}
                </div>

            </section>
            <BottomMenu />
        </>
    )
}

export default GymPage

