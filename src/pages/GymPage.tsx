//React react router react hooks
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs"
//Components
import BottomMenu from "../components/BottomMenu"
import MainButton from "../components/ButtonMain";
//Firebase Firestore and config
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebseConfig/fireaseConfig";
import {
    doc,
    onSnapshot,
    getDoc,
    arrayUnion,
    updateDoc,
    deleteField,
} from "firebase/firestore";
import { useAuth } from "../firebseConfig/AuthContext";



const GymPage = () => {
    let navigate = useNavigate();
    const [workOutData, setWorkOutData] = useState<any>([])
    const [workout, setWorkout] = useState<string>('')
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [muscle, setMuscle] = useState([''])

    const { currentUser } = useAuth()
    const ref = useRef(null)


    // const input = () => {
    //     return <WorkOutList />
    // }

    const handleWorkoutSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (workout) {

            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                weekRutines: arrayUnion(workout.toUpperCase(),)
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
    const muscleGrup = [
        { id: 0, value: 'SELECT MUSCLE GROUP' },
        { id: 1, value: 'CHEST-TRICEPS' },
        { id: 2, value: 'BACK-BICEPS' },
        { id: 3, value: 'BICEPS' },
        { id: 4, value: 'TRICEPS' },
        { id: 5, value: 'CHEST' },
        { id: 6, value: 'BACK' },
        { id: 7, value: 'SHOULDERS' },
        { id: 8, value: 'ASB' },
        { id: 9, value: 'PULL' },
        { id: 10, value: 'PUSCH' },
        { id: 11, value: 'LEGS' },
        { id: 12, value: 'LEGS-GLUTEUS' },
        { id: 13, value: 'CARDIO' }
    ]
    const deleteMuscleGrup = async (e: any) => {

        console.log(ref.current, e.target, e.id, e.key)
        const cityRef = doc(db, 'users', `${currentUser.uid}`);

        await updateDoc(cityRef, {
            // weekRutines: deleteField()
        });


    }


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
                        id={workout}
                        ref={ref}
                        onChange={(e) => setWorkout(e.target.value)}>

                        {muscleGrup.map((workout, id) => {
                            return <option
                                key={id}
                                value={workout.value}
                            >
                                {workout.value}
                            </option>
                        })};
                    </select>
                    <MainButton
                        disabled={loading}
                        color={'lightgreen'}
                        onClick={handleWorkoutSubmit}
                        text={'Add'}
                        type={"submit"}></MainButton>
                </form>
                <div className="grid gap-l">
                    {React.Children.toArray(
                        workOutData && workOutData.map((workout: (any), id: number) => (
                            <div
                                className="gymPageCardShadow padding-normal"
                                ref={ref}
                                key={id}>
                                <div className="flex f-space-b">
                                    <p>{workout}</p>
                                    <BsTrash
                                        id={workout}
                                        key={id}
                                        color="red"
                                        onClick={deleteMuscleGrup} />
                                </div>
                                <img src={`img-svg/img/${workout}.png`}
                                    alt={`${workout}`}
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

