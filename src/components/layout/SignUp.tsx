import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc'
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
//google firebase-firestore
import { db } from '../../firebseConfig/fireaseConfig'
import { collection, doc, setDoc } from "firebase/firestore";
import { updateProfile } from 'firebase/auth'
import { useAuth } from '../../firebseConfig/AuthContext';
import Loading from '../../pages/Loading';


const SignUp = () => {
    const [firstName, setfirstName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repetPassword, setRepetPassword] = useState<string>('');
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    let navigate = useNavigate();
    const { signUp } = useAuth()

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (password !== '' && repetPassword !== '') {
            if (password !== repetPassword) {
                console.log('unable to sign up')
                return setError('Passwords do not match')
            } if (password.length < 6) {
                console.log('Pasword not long')
                return setError('Password not long enough')
            }
        } try {
            setError('')
            setLoading(true)
            const userCred = await signUp(email, password)

            const user = (userCred).user;
            updateProfile(user, {
                displayName: `${firstName} ${surname}`
            })
            const id = user.uid
            const newUser = doc(collection(db, "users"), id)
            await setDoc(newUser, {
                uid: user.uid,
                email: user.email,
                name: firstName,
                surname: surname,
                created: new Date(),
                weekRutines: ''
            })
            // console.log(user, newUser)
            navigate(`/userpage/${user.uid}`)
            // console.log(newUser);
            return user
        } catch {
            setError(error)
        }
        setLoading(false)
        setfirstName('')
        setSurname('')
        setEmail('')
        setPassword('')
        setRepetPassword('')
        setTimeout(() => {
            setError('')
        }, 6000)
    }

    return (

        <Loading /> && <div className="signUp flex-column center">
            <div className="form_wrapper flex-column f-space-a">
                <form className="flex-column f-space-a" onSubmit={handleSubmit}>
                    <Link to="/"> <IoMdClose className='close' /></Link>
                    <h2>Create Your Account</h2>
                    {
                        error && <Alert sx={{ maxWidth: '70%' }} severity="error">{error}</Alert>
                    }
                    <input className="textField"
                        name="name"
                        placeholder=' Name'
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                    />
                    <input className="textField"
                        name="surname"
                        placeholder='Surname'
                        type="text"
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
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
                    <input className="textField"
                        name="RepetPassword"
                        type="password"
                        placeholder='RepetPassword'
                        required
                        value={repetPassword}
                        onChange={(e) => setRepetPassword(e.target.value)}
                    />
                    <button disabled={loading} className='register' type="submit">Create Account</button>
                    <p>or</p>
                </form>
                <div className="divGoogleButton">
                    <FcGoogle />
                    <button className='buttonGoogle'> Continue with Google</button>
                </div>
                <p>If you have a account <Link to='/login'><span>Log In</span></Link> </p>
            </div>
        </div>

    )
};
export default SignUp