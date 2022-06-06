//react, react-router
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//components
import SvgLogo2 from '../components/LogoSvg'
import MainButton from '../components/ButtonMain'
//firestore irebase
import { auth, db } from '../firebseConfig/fireaseConfig'
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { doc, getDoc, deleteDoc } from "firebase/firestore"


const UsersPage = () => {
    let navigate = useNavigate();
    const [authed, setAuthed] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<any[]>([]);
    const [error, setError] = useState<any>('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                setAuthed(false)
                navigate('/')
                console.log(authed, 'logged out')
                return authed
            } else {
                setAuthed(true)
                const fetchData = async () => {
                    const Ref = doc(db, "users", `${user.uid}`);
                    const Snap = await getDoc(Ref);
                    const data: any = Snap.data()
                    setNewUser(() => [data])
                    console.log(data);
                    return { newUser, user }
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
        const user = auth.currentUser;

        if (user) {
            deleteUser(user).then(() => {
                // auth User deleted.
                navigate('/')
            }).catch((error: any) => {
                return setError(error.message)
            });
            //cloud firestore user deleted
            deleteDoc(doc(db, "users", `${user.uid}`));
            console.log('delete')
        } else {
            console.log(error.message)
            return setError(error.message)
        }
    };

    return (
        <section className='conteiner flex-column'>
            <header className='headerWrapper flex'>
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
                    <MainButton text={'Log Out'} color={'lightgreen'} onClick={logOut} type={''}></MainButton>
                    <MainButton text={'Delete'} color={'red'} onClick={deleteCurrentUser} type={''}></MainButton>
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
            <article className='mainContent flex-column center'>
                <div className="imgWrapper imgGym flex center">
                    <p>Gym</p>
                </div>
                <div className="imgWrapper imgNutri flex center">
                    <p>Nutrition</p>
                </div>
            </article>
        </section>

    )
}

export default UsersPage





