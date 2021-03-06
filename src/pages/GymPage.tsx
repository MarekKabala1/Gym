//React react router react hooks
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io"
//Components
import BottomMenu from "../components/BottomMenu";
import WorkOutList from "../components/WorkoutList";
//Firebase Firestore and config
import { useAuth } from "../firebseConfig/AuthContext"
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebseConfig/fireaseConfig";
import {
    doc,
    onSnapshot,
    setDoc,
} from "firebase/firestore";


const GymPage = () => {
    let navigate = useNavigate();
    const currentUser = useAuth()
    const [inputDiv, setInputDiv] = useState<any>()

    const input = () => {
        return <WorkOutList />
    }

    const addWorkout = () => {
        console.log(currentUser.currentUser.displayName);
        return setInputDiv(input)
    }

    const WorkOutDiv = () => {
        return (
            <div>
                <div className="flex f-space-b">

                </div>
            </div>
        )
    }

    const currentUserData = (currentUser: User) => {
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            console.log("Current data: ", doc.data());
        });
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate('/gym')
                // newSnapshot()
                currentUserData(currentUser)
                // newSnapshot()
            } else {
                navigate('/')
            }
        });
        unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <section className="gymPage-section flex-column center">
                <h1 className="gymPage_heading">GYM</h1>
                <div className="gymPage-sectionWrapper flex-column center">
                    <div className="gymPage_add flex center " onClick={addWorkout}><IoIosAddCircleOutline /><span>Add Workout</span></div>
                </div>
                <div className="outputDiv flex-column f-space-b">
                    {inputDiv}
                </div>
            </section>

            <BottomMenu />
        </>
    )
}

export default GymPage

