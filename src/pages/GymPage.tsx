import { useEffect } from "react";
import BottomMenu from "../components/BottomMenu";
import { useAuth } from "../firebseConfig/AuthContext"
import { GrAddCircle } from "react-icons/gr"

const GymPage = () => {
    const currentUser = useAuth()
    useEffect(() => {
        if (currentUser) {
            console.log(currentUser);
        }
    }, [currentUser])


    return (
        <section className="gym-section flex-column">
            <div className="gym-sectionWrapper flex-column flex center">
                <h1>GYM</h1>
                <div><GrAddCircle />Add Workout</div>
            </div>
            <BottomMenu />
        </section>
    )
}

export default GymPage

