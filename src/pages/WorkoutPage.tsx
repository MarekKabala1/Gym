import WorkoutForm from "../components/layout/WorkoutForm"
import BottomMenu from "../components/BottomMenu"
import { useLocation } from "react-router-dom"


const WorkoutPage = () => {
    // debugger
    const location = useLocation()
    const element = location.state

    return (
        <>
            <main className="workoutPage-wrapper">
                <section>
                    <div className="workoutPage-header flex center">
                        <div className="workoutPage-imgWrapper" style={{ height: '200px' }}>
                            <img src={`/img-svg/img/${element}.png`}
                                alt={`Muscle part for exersise: ${element}`}
                                style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </div>
                        <WorkoutForm />
                    </div>
                </section>
            </main>
            <BottomMenu />
        </>
    )
}

export default WorkoutPage