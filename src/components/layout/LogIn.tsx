import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { IoMdClose } from 'react-icons/io';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
//firebase firestore
import { auth } from '../../firebseConfig/fireaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
// import { collection } from 'firebase/firestore';
//styled
import Alert from '@mui/material/Alert';


const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    let navigate = useNavigate();

    const handelLogIn = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    return (
        <div className='signUp'>
            <div className="form_wrapper">
                <form onSubmit={handelLogIn}>
                    <Link to="/"> <IoMdClose className='close' /></Link>
                    <h2>Log In</h2>
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
                    <button className='register' type="submit">Log In</button>
                    <p>or</p>
                    <div className="divGoogleButton">
                        <FcGoogle />
                        <button className='buttonGoogle'> Continue with Google</button>
                    </div>
                    <p>If you don`t have a account <Link to='/register'><span>Sign Up</span></Link></p>
                </form>
                <p><Link to='/newpassword'><span>Forgot Password</span></Link></p>
            </div>
        </div>
    )
}

export default LogIn