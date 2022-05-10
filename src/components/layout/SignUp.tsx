import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc'
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
//google firebase-firestore
import { db, auth } from '../../firebseConfig/fireaseConfig'
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'





const SignUp = () => {
    const [firstName, setfirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetPassword, setRepetPassword] = useState('');
    const [error, setError] = useState('')
    let navigate = useNavigate();

    //Vaalidate a password

    const validatePassword = () => {
        let isValid = true
        if (password !== '' && repetPassword !== '') {
            if (password !== repetPassword) {
                isValid = false
                setError('Passwords do not match')
                console.log('unable to sign up')
            } if (password.length < 6) {
                isValid = false
                setError('Password not long enough')
                console.log('Pasword not long')
            }
        }
        return isValid
    }


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError('')

        if (validatePassword()) {
            const signUp = async (email: string, password: string) => {
                try {
                    const userCredential = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    )
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: firstName + surname
                    })
                    await addDoc(collection(db, "users"), {
                        uid: user.uid,
                        email: user.email,
                        name: firstName,
                        surname: surname,
                        created: new Date()
                    });
                    navigate('/userpage')
                    console.log(user)
                } catch (error: any) {
                    return setError(error.message)
                };
            };
            signUp(email, password);
        }
        setfirstName('')
        setSurname('')
        setEmail('')
        setPassword('')
        setRepetPassword('')
        setTimeout(() => {
            setError('')
        }, 2000)

    }

    return (
        <div className="signUp">
            <div className="form_wrapper">
                <form onSubmit={handleSubmit}>
                    <Link to="/"> <IoMdClose className='close' /></Link>
                    <h2>Create Your Account</h2>
                    {error && <Alert sx={{ maxWidth: '70%' }} severity="error">{error}</Alert>}
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
                    <button className='register' type="submit">Create Account</button>
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


