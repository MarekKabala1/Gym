//React react router react hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io"
//Components
import BottomMenu from "../components/BottomMenu";
import WorkOutList from "../components/WorkoutList";
//Firebase Firestore and config
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebseConfig/fireaseConfig";
import {
    doc,
    onSnapshot,
    getDoc,
    arrayUnion,
    updateDoc,
} from "firebase/firestore";
import React from "react";
import { useAuth } from "../firebseConfig/AuthContext";
import MainButton from "../components/ButtonMain";



const GymPage = () => {
    let navigate = useNavigate();
    const [inputDiv, setInputDiv] = useState<any>()
    const [workOutData, setWorkOutData] = useState<any>([])
    const [visible, setVisbile] = useState<boolean>()
    const [workout, setWorkout] = useState<string>('')
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [muscle, setMuscle] = useState([''])
    const muscleGrup = ['BICEPS', 'TRICEPS', 'PUSCH', 'PULL']
    const { currentUser } = useAuth()


    // const input = () => {
    //     return <WorkOutList />
    // }

    const addWorkout = (e: { target: any; }) => {
        setVisbile(true)
        setInputDiv(<WorkOutList />)
        console.log(e.target)
    }
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

    const fetchWorkoutData = async (user: User) => {
        const Ref = doc(db, "users", `${user.uid}`);
        onSnapshot(Ref, async (_doc) => {
            const Snap = await getDoc(Ref);
            const data: any = Snap.data()
            setWorkOutData(data.weekRutines)

            console.log(data.weekRutines);
            setVisbile(false)
            console.log('data added');
        })



        return { workOutData }

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/gym')
                fetchWorkoutData(user)
            } else {
                navigate('/')
            }
        });
        unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <section className="gymPage-section flex-column ">
                <form className="flex gap-xl" onSubmit={handleWorkoutSubmit}>
                    <select
                        className="gymPage_form "
                        placeholder="Select Muscle Grup"
                        name="workout"
                        required
                        value={workout}
                        onChange={(e) => setWorkout(e.target.value)}>

                        <option value="">Select Muscle Grup</option>
                        <option value="BICEPS">BICEPS</option>
                        <option value="TRICEPS">TRICEPS</option>
                        <option value="BACK">BACK</option>
                        <option value="BACK/TRICEPS">BACK/TRICEPS</option>
                        <option value="ASB">ASB</option>
                        <option value="CHEST">CHEST</option>
                        <option value="CHEST/TRICEPS">CHEST/TRICEPS</option>
                        <option value="SHOULDERS">SHOULDERS</option>
                        <option value="LEGS">LEGS</option>
                        <option value="LEGS/GLUTEUS">LEGS/GLUTEUS</option>
                        <option value="PUSCH">PUSCH</option>
                        <option value="PULL">PULL</option>
                        <option value="CARDIO">CARDIO</option>
                    </select>
                    <MainButton disabled={loading} color={'lightgreen'} onClick={handleWorkoutSubmit} text={'Add'} type={"submit"}></MainButton>
                </form>
                <div className="grid gap-l">
                    {React.Children.toArray(
                        workOutData && workOutData.map((workOut: (any), index: number) => (
                            <div className="gymPageCardShadow padding-normal" key={index}>
                                <p>{workOut}</p>
                                <img src={`img-svg/img/${workOut}.png`} alt={`${workOut}`}
                                    style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        ))
                    )

                    }
                </div>
            </section>
            <BottomMenu />
        </>
    )
}

export default GymPage

