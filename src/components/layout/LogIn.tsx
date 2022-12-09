import { SetStateAction, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { IoMdClose } from 'react-icons/io';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
//firebase firestore
import { auth } from '../../firebseConfig/fireaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { collection } from 'firebase/firestore';
//styled
import Alert from '@mui/material/Alert';


const LogIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    let navigate = useNavigate();
    // const { uid } = useParams();




    const handelLogIn = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true)
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        ).then((userCred) => {
            const user = userCred.user;
            navigate(`/userpage/${user.uid}`)

            // return user
        }).catch((error: {
            message: SetStateAction<string>, code: any;
        }) => {
            if (error.code === 'auth/user-not-found') {
                return setError('Wrong Email Address')
            } else if (error.code === 'auth/wrong-password') {
                return setError('Wrong Password')
            } else {
                return setError(error.message)
            }
        });
        setEmail('')
        setPassword('')
        setLoading(false)
    }

    return (
        <div className="form_wrapper">
            <form className='form flex-column center' onSubmit={handelLogIn}>
                <Link to="/"> <IoMdClose className='close' /></Link>
                <h2 className='loginHeader'>Login</h2>
                {error && <Alert severity="error">{error}</Alert>}
                <input className="textField"
                    name="email"
                    placeholder='Email'
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input className="textField"
                    name="password"
                    type="password"
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className='resetPassword-link'><Link to='/resetpassword'><span>Forgot Password</span></Link></p>
                <button disabled={loading} className='register' type="submit">Log In</button>
                <p style={{ color: '#d0bed4' }}>-or-</p>
                <div className="divGoogleButton flex gap">
                    <FcGoogle />
                    <p> <Link to='/register'>Sign Up</Link></p>
                </div>
            </form>

        </div>

    )
}

export default LogIn