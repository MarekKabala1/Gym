import { useEffect, useState } from "react";
import BottomMenu from "../components/BottomMenu";
import { useAuth } from "../firebseConfig/AuthContext"
import { IoIosAddCircleOutline } from "react-icons/io"

const GymPage = () => {
    const currentUser = useAuth()
    const [workOutDiv, setWorkOutDiv] = useState<any>([])
    useEffect(() => {
        if (currentUser) {

        }
    }, [currentUser])


    const newDiv = () => {
        return (
            <>
                <input className="gymPage_workout" placeholder="Add workout name" />
                <button>submit</button>
            </>
        )
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
                <div className="flex">
                    {workOutDiv}
                </div>

            </section>
            <BottomMenu />
        </>
    )
}

export default GymPage

