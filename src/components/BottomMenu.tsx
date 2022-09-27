import { IoIosArrowBack } from 'react-icons/io';
import { GrLineChart } from 'react-icons/gr';
import { ImCalendar } from 'react-icons/im';
import {
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
            <span className="bottomMenu bottomMenu_arrow" onClick={navigateBack}><IoIosArrowBack onClick={navigateBack} /></span>
            <span className="bottomMenu bottomMenu_cal bottomMenu_small"><ImCalendar /></span>
            <span className="bottomMenu bottomMenu_middle-button" onClick={navigateUserPage}><IoEllipseSharp onClick={navigateUserPage} /></span>
            <span className="bottomMenu bottomMenu_chart bottomMenu_small" ><GrLineChart /></span>
            <span className="bottomMenu bottomMenu_menu"><IoEllipsisVerticalSharp /></span>
        </div>
    )
}

export default BottomMenu