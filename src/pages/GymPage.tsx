//React react router react hooks
import React from "react";
import { useEffect, useState, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs"
//Components
import BottomMenu from "../components/BottomMenu"
import MainButton from "../components/ButtonMain";
import Loading from "./Loading";
//Firebase Firestore and config
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebseConfig/fireaseConfig";
import {
    doc,
    getDoc,
    arrayUnion,
    updateDoc,
} from "firebase/firestore";
import { Alert } from "@mui/material";
import { useAuth } from "../firebseConfig/AuthContext";


const GymPage = (props: any) => {
    let navigate = useNavigate();
    const { currentUser } = useAuth()

    const [workOut, setWorkOut] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    const workoutReducer = (state: { workouts: []; }, action: { type: any; payload: any; }) => {
        switch (action.type) {
            case 'SET_WORKOUT':
                return {
                    workouts: action.payload
                }
            case 'CREATE_WORKOUT':
                return {
                    workouts: [...state.workouts, action.payload]
                }
            case 'DELETE_WORKOUT':
                return {
                    workouts:
                        state.workouts.filter((x) => x !== action.payload.id)
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
        dispatch({ type: 'CREATE_WORKOUT', payload: workOut })
        if (workOut) {
            setLoading(true)
            // const newExercise = doc(collection(db, "exercise"), `${currentUser.uid}`)
            // await setDoc(newExercise, {
            //     exercise: `${workOut}`
            // })
            const userRef = doc(db, 'exercise', `${currentUser.uid}`);
            await updateDoc(userRef, {
                exercise: arrayUnion(workOut.toUpperCase()),
            })

                .then(() => {
                    setWorkOut('')
                    setError(null)
                    setLoading(false)
                    console.log(...state.workouts, workOut);
                })
                .catch((err) => {
                    setError('ERROR! Please refresh the page and try again.')
                    console.log(err);
                })
        } else {
            return setError(error.message)
        }
    }

    const fetchWorkoutData = async (user: User) => {
        // const Ref = doc(db, "users", `${user.uid}`);
        // onSnapshot(Ref, async (_doc) => {
        //     const Snap = await getDoc(Ref);
        //     const data: any = Snap.data()
        //     dispatch({ type: 'SET_WORKOUT', payload: data.weekRutines })
        //     console.log("data fetched", state.workouts)
        // return { dispatch }
        // })
        setLoading(true)
        const Ref = doc(db, "exercise", `${user.uid}`);
        const Snap = await getDoc(Ref);
        const data = Snap.data()
        if (data) {
            dispatch({ type: 'SET_WORKOUT', payload: data.exercise })
            // console.log("data fetched", state.workouts)
            setLoading(false)

            return { state }
        }
    }
    const deleteMuscleGroup = async (e: any) => {
        dispatch({ type: 'DELETE_WORKOUT', payload: e.target })

        const cityRef = doc(db, 'exercise', `${currentUser.uid}`);
        await updateDoc(cityRef, {
            exercise: state.workouts
        })
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

    const muscleGroup = [
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
        { id: 13, value: 'TRAINING1' },
        { id: 14, value: 'TRAINING2' },
        { id: 15, value: 'TRAINING3' },
        { id: 16, value: 'TRAINING4' },
        { id: 17, value: 'TRAINING5' }
    ]

    return (
        <>
            {
                loading ? <Loading /> :
                    <main className="gymPage-section flex-column ">
                        <form className="flex gap-xl" onSubmit={handleWorkoutSubmit}>
                            <select
                                className="gymPage_form "
                                placeholder="Select Muscle Group"
                                name="workout"
                                id={workOut}
                                required
                                value={workOut}
                                onChange={(e) => setWorkOut(e.target.value)}>

                                {muscleGroup.map((muscleGroupe, id) => {
                                    return <option
                                        key={muscleGroupe.id}
                                        value={muscleGroupe.value}
                                    >
                                        {muscleGroupe.value}
                                    </option>
                                })};
                            </select>
                            <MainButton
                                className="gymPage-btn"
                                disabled={loading}
                                color={'lightgreen'}
                                onClick={handleWorkoutSubmit}
                                text={'Add'}
                                type={"submit"}></MainButton>
                        </form>
                        {
                            error && <Alert sx={{ maxWidth: '100%' }} severity="error">{error}</Alert>
                        }

                        <section className="grid gap-l">
                            {
                                React.Children.toArray(
                                    state.workouts! && state.workouts.map((muscleGroupe: (any), id: number) => (
                                        <div className="gymPageCard-shadow "
                                            key={muscleGroupe.id}>
                                            <div className=" gymPageCard-header flex f-space-b">
                                                <p className=" gymPageCard-header-text">{muscleGroupe}</p>
                                                <BsTrash
                                                    className=" gymPageCard-trash"
                                                    id={muscleGroupe}
                                                    key={muscleGroupe.id}
                                                    color="red"
                                                    onClick={deleteMuscleGroup} />

                                            </div>
                                            <Link to={muscleGroupe.toLowerCase()} state={muscleGroupe}>
                                                <img src={`${process.env.PUBLIC_URL}/img-svg/img/${muscleGroupe}.png`}
                                                    alt={`${muscleGroupe}`}
                                                    style={{ maxWidth: '100%', maxHeight: '100%' }} /></Link>
                                        </div>
                                    ))
                                )
                            }
                        </section>
                    </main>
            }
            <BottomMenu />
        </>
    )
}

export default GymPage

