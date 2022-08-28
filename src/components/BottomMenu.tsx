import {
    IoArrowUndoSharp,
    IoEllipseSharp,
    IoEllipsisVerticalSharp
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebseConfig/AuthContext';


const BottomMenu = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const navigateBack = () => {
        navigate(-1)
    }
    const navigateUserPage = () => {
        const user = currentUser
        navigate(`/userpage/${user.uid}`)
    }
    return (
        <div className="bottomMenu_wrapper flex f-space-b">
            <div className="bottomMenu bottomMenu_arrow" onClick={navigateBack}><IoArrowUndoSharp onClick={navigateBack} /></div>
            <div className="bottomMenu bottomMenu_middle-button" onClick={navigateUserPage}><IoEllipseSharp onClick={navigateUserPage} /></div>
            <div className="bottomMenu bottomMenu_menu"><IoEllipsisVerticalSharp /></div>
        </div>
    )
}

export default BottomMenu