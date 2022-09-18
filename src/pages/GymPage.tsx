//React react router react hooks
import React from "react";
import { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
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
import { Alert } from "@mui/material";


const GymPage = () => {
    let navigate = useNavigate();
    const [workout, setWorkout] = useState<string>('')
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { currentUser } = useAuth()

    const workoutReducer = (state: { workouts: []; }, action: { type: any; payload: any; }) => {
        switch (action.type) {
            case 'SET_WORKOUT':
                return {
                    workouts: action.payload
                }
            case 'CREATE_WORKOUT':
                return {
                    workouts: [action.payload, ...state.workouts]
                }
            case 'DELETE_WORKOUT':
                return {
                    workouts:
                        state.workouts.filter((workout) => workout !== action.payload.id)
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null
    })

    const handleWorkoutSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        dispatch({ type: 'CREATE_WORKOUT', payload: workout })
        if (workout) {
            const userRef = doc(db, 'users', `${currentUser.uid}`);
            await updateDoc(userRef, {
                weekRutines: arrayUnion(workout.toUpperCase()),

            })
                .then(() => {
                    setWorkout('')
                    setError(null)
                    setLoading(false)
                    console.log(state.workouts);
                })
                .catch((err) => {
                    setError('ERROR! Please refresh the page and try again.')
                    console.log(err);
                })
        } else {
            setLoading(true)
        }
    }

    const fetchWorkoutData = async (currentUser: { uid: string; }) => {
        // const Ref = doc(db, "users", `${user.uid}`);
        // onSnapshot(Ref, async (_doc) => {
        //     const Snap = await getDoc(Ref);
        //     const data: any = Snap.data()
        //     dispatch({ type: 'SET_WORKOUT', payload: data.weekRutines })
        //     console.log("data fetched", state.workouts)
        // return { dispatch }
        // })
        const Ref = doc(db, "users", `${currentUser.uid}`);
        const Snap = await getDoc(Ref);
        const data: any = Snap.data()
        dispatch({ type: 'SET_WORKOUT', payload: data.weekRutines })
        console.log("data fetched", state.workouts)

        return { state }
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/gym')
                fetchWorkoutData(currentUser)

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
        { id: 8, value: 'ABS' },
        { id: 9, value: 'PULL' },
        { id: 10, value: 'PUSH' },
        { id: 11, value: 'LEGS' },
        { id: 12, value: 'LEGS-GLUTEUS' },
        { id: 13, value: 'CARDIO' }
    ]
    // muscleGrup.forEach(muscle => { console.log(muscle.id); })
    const deleteMuscleGrup = async (e: any) => {

        console.log(e.target.id)
        dispatch({ type: 'DELETE_WORKOUT', payload: e.target })
        console.log(state.workouts)
        const cityRef = doc(db, 'users', `${currentUser.uid}`);

        await updateDoc(cityRef, {
            weekRutines: state.workouts
        })
    }


    return (
        <>
            <section className="gymPage-section flex-column ">
                <form className="flex gap-xl" onSubmit={handleWorkoutSubmit}>
                    <select
                        className="gymPage_form "
                        placeholder="Select Muscle Grup"
                        name="workout"
                        id={workout}
                        required
                        value={workout}
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
                {
                    error && <Alert sx={{ maxWidth: '100%' }} severity="error">{error}</Alert>
                }
                <div className="grid gap-l">
                    {React.Children.toArray(
                        state.workouts && state.workouts.map((workout: (any), id: number) => (
                            <div
                                className="gymPageCardShadow padding-normal"
                                key={id}>
                                <div className="flex f-space-b">
                                    <p>{workout}</p>
                                    <div className="trash"
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

