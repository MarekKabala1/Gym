import { useEffect } from "react";
import BottomMenu from "../components/BottomMenu";
import { useAuth } from "../firebseConfig/AuthContext"
import { IoIosAddCircleOutline } from "react-icons/io"

const GymPage = () => {
    const currentUser = useAuth()
    useEffect(() => {
        if (currentUser) {

        }
    }, [currentUser])
    const addWorkout = () => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('gymPage_workout')
    }


    return (
        <section className="gymPage-section flex-column">
            <h1 className="gymPage_heading">GYM</h1>
            <div className="gymPage-sectionWrapper flex-column center">
                <div className="gymPage_add flex center " onClick={addWorkout}><IoIosAddCircleOutline /><span>Add Workout</span></div>
            </div>
            <BottomMenu />
        </section>
    )
}

export default GymPage

