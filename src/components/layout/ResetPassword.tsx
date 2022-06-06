import { Link } from "react-router-dom"
import { IoMdClose } from "react-icons/io"
import { useState } from "react";
import { sendPasswordResetEmail } from 'firebase/auth'
import { Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebseConfig/fireaseConfig";
import MainButton from "../ButtonMain";


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    let navigate = useNavigate()


    const send = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess(true)
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            })
            .catch((error) => {
                setError(error.message)
            });
        setEmail('')
        setSuccess(false)
        setError('')
    }


    return (
        <div className="resetPassword flex-column center">
            <div className="form_wrapper">
                <Link to="/"><IoMdClose className="close" /></Link>
                <form>
                    {success && <Alert severity="success">Reset Email Send Go to yor Inbox</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                    <h2>Reset Password</h2>
                    <input className="textField"
                        name="email"
                        placeholder='Email'
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </form>
                <MainButton onClick={send} text={"send"} type={""}></MainButton>
            </div>
        </div>
    )
}

export default ResetPassword
