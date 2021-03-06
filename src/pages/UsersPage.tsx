//react, react-router
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//components
import SvgLogo2 from '../components/LogoSvg'
import MainButton from '../components/ButtonMain'
//firestore irebase
import { auth, db } from '../firebseConfig/fireaseConfig'
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import { useAuth } from '../firebseConfig/AuthContext';

const UsersPage = () => {
    let navigate = useNavigate();
    const [authed, setAuthed] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<any[]>([]);
    const [error, setError] = useState<any>('')
    const { currentUser } = useAuth()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                setAuthed(false)
                navigate('/')
                console.log(authed, 'logged out')
                return authed
            } else {
                setAuthed(true)
                const fetchData = async () => {
                    const Ref = doc(db, "users", `${currentUser.uid}`);
                    const Snap = await getDoc(Ref);
                    const data: any = Snap.data()
                    setNewUser(() => [data])
                    console.log(data);
                    return { newUser, currentUser }
                }
                fetchData()
            }
        });
        unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const logOut = () => {
        signOut(auth)
            .then((authed) => {
                navigate('/')
                setAuthed(false)
                console.log('click')
                return authed

            })
            .catch(() => {
                console.log('somthing wrong')
                return setError(error.message)
            });
    }

    const deleteCurrentUser = () => {
        const user = currentUser;

        if (user) {
            deleteUser(user)
                .then(() => {
                    // auth User deleted.
                    navigate('/')
                }).catch((error: any) => {
                    return setError(error.message)
                });
            //cloud firestore user deleted
            deleteDoc(doc(db, "users", `${user.uid}`));
            console.log('delete')
        } else {
            console.log(error.message, 'somthing wrong')
            return setError(error.message)
        }
    };

    return (
        <section className='conteiner flex-column'>
            <header className='headerWrapper flex f-space-b'>
                {
                    React.Children.toArray(
                        newUser.map((data) => (
                            <div className='avatar flex center' key={data.id}>
                                {data.name.charAt(0)}
                                {data.surname.charAt(0)}
                            </div>
                        ))
                    )
                }
                <div className="userPage-flex_gap flex">
                    <MainButton disabled={false} text={'Log Out'} color={'lightgreen'} onClick={logOut} type={''}></MainButton>
                    <MainButton disabled={false} text={`Delete account`} color={'red'} onClick={deleteCurrentUser} type={''}></MainButton>
                </div>
            </header>
            <div className='svgWrapper'>
                <SvgLogo2 />
            </div>

            {
                React.Children.toArray(
                    newUser.map((data) => (
                        <p key={data.id} style={{ fontSize: '1.4rem', color: 'rgba(247, 240, 240)', fontWeight: '700' }}>
                            Hi <span className='userPageName'>{data.name.toUpperCase()}</span><br /> have a lovely day
                        </p>
                    ))
                )
            }
            <article className='mainContent flex-column '>
                <Link to="/gym"><div className="imgWrapper imgGym flex center">
                    <p>Gym</p>
                </div>
                </Link>
                <div className="imgWrapper imgNutri flex center">
                    <p>Nutrition</p>
                </div>
            </article>
        </section>


    )
}

export default UsersPage





