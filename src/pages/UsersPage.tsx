import React, { useContext } from 'react';
//components
import SvgLogo2 from '../components/LogoSvg'
import MainButton from '../components/ButtonMain';
//firestore irebase
import { auth, db } from '../firebseConfig/fireaseConfig'
import { signOut, onAuthStateChanged, deleteUser, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../firebseConfig/AuthContext';




const UsersPage = () => {
    let navigate = useNavigate();
    const [authed, setAuthed] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<any[]>([]);
    const [error, setError] = useState<any>('')
    const currentUser = useAuth()

    const logOut = async () => {
        await signOut(auth)
            .then((authed) => {
                setAuthed(false)
                return authed
            })
            .catch(() => {
                return setError(error.message)
            });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                // const students: DocumentData[] = []
                // const querySnapshot = await getDocs(collection(db, "users"));
                // querySnapshot.forEach((doc: { data: () => any; }) => {
                //     const data = doc.data()
                //     students.push(data)
                //     // doc.data() is never undefined for query doc snapshots
                //     console.log(students)
                // });
                setAuthed(false)
                navigate('/')
                console.log(authed, 'logged out')
                return authed
                // const uid = user.uid
                // console.log(authed, uid);

            } else {
                setAuthed(true)
                const fetchData = async () => {
                    const Ref = doc(db, "users", `${user.uid}`);
                    const Snap = await getDoc(Ref);
                    const data: any = Snap.data()
                    setNewUser(() => [data])
                    console.log(newUser, user, data);

                    return { newUser, user }
                }
                fetchData()
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // const deleteCurrentUser = (user: User) => {
    //     // const user = currentUser
    //     deleteUser(user).then(() => {
    //         // User deleted.
    //         navigate('/')
    //     }).catch((error: any) => {
    //         setError(error.message)
    //     });
    //     console.log('delete')

    // };




    return (
        <section className='conteiner'>
            <header className='headerWrapper'>
                <SvgLogo2 />
                <div className="flexGapWrapper">
                    <MainButton text={'Log Out'} color={'lightgreen'} onClick={logOut} type={''}></MainButton>
                    {/* <MainButton text={'Delete'} color={'red'} onClick={deleteCurrentUser}></MainButton> */}
                    {
                        React.Children.toArray(
                            newUser.map((data) => (
                                <div className='avatar' key={data.id}>
                                    {data.name.charAt(0)}
                                    {data.surname.charAt(0)}
                                </div>
                            ))
                        )
                    }
                </div>
            </header>
            {
                React.Children.toArray(
                    newUser.map((data) => (
                        <p key={data.id} style={{ fontSize: '1.4rem', color: 'rgba(247, 240, 240)', fontWeight: '700' }}>
                            Hi {data.name}
                        </p>
                    ))
                )
            }
            <article className='mainContent'>
                <div className="imgWrapper imgGym">
                    <p>Gym</p>
                </div>
                <div className="imgWrapper imgNutri">
                    <p>Nutrition</p>
                </div>
            </article>
        </section>

    )
}

export default UsersPage





