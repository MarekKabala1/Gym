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
} from "firebase/firestore";
import React from "react";



const GymPage = () => {
    let navigate = useNavigate();
    const [inputDiv, setInputDiv] = useState<any>()
    const [workOutData, setWorkOutData] = useState<any>([])
    const [visible, setVisbile] = useState<boolean>()

    // const input = () => {
    //     return <WorkOutList />
    // }

    const addWorkout = (e: { target: any; }) => {
        setVisbile(true)
        visible ? setInputDiv(<WorkOutList />) : setInputDiv(null)
    }

    const fetchWorkoutData = async (user: User) => {
        const Ref = doc(db, "users", `${user.uid}`);
        onSnapshot(Ref, async (_doc) => {
            const Snap = await getDoc(Ref);
            const data: any = Snap.data()
            setWorkOutData(data.weekRutines)

            console.log(data.weekRutines);
        })
        setVisbile(false)

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
            <section className="gymPage-section flex-column center">
                <h1 className="gymPage_heading">GYM</h1>
                <div className="gymPage-sectionWrapper flex-column center">
                    <div className="gymPage_add flex center " onClick={addWorkout}><IoIosAddCircleOutline /><span>Add Workout</span></div>
                </div>
                <div className="outputDiv flex-column f-space-b">
                    {inputDiv}
                </div>
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

