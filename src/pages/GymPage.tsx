import { useEffect } from "react";
import BottomMenu from "../components/BottomMenu";
import { useAuth } from "../firebseConfig/AuthContext"

const GymPage = () => {
    const currentUser = useAuth()
    useEffect(() => {
        if (currentUser) {
            console.log(currentUser);
        }
    }, [currentUser])


    return (
        <section className="flex-column">
            <div className="gymSectionWrapper flex center">
                <h1>siemka </h1>
            </div>
            <BottomMenu />
        </section>
    )
}

export default GymPage

