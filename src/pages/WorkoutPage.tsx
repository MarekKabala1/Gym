import WorkoutForm from "../components/layout/WorkoutForm"
import BottomMenu from "../components/BottomMenu"
import { useLocation } from "react-router-dom"

const WorkoutPage = () => {
    const location = useLocation()
    const element = location.state

    return (
        <>
            <main className="workoutPage-wrapper">
                <section>
                    <div className="workoutPage-header flex-column center">
                        <div className="workoutPage-imgWrapper" style={{ height: '200px' }}>
                            <img src={`/img-svg/img/${element}.png`}
                                alt={`Muscle part for exersise: ${element}`}
                                style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </div>
                        <WorkoutForm />
                    </div>
                    {/* <>
                        {
                            React.Children.toArray(
                                newWorkout! && newWorkout.map((workout: (any), id: number) => (
                                    <div
                                        className="gymPageCardShadow padding-normal"
                                        key={id}>
                                        {workout.title1}
                                    </div>
                                ))
                            )
                        }
                    </> */}

                </section>
            </main>
            <BottomMenu />
        </>
    )
}

export default WorkoutPage