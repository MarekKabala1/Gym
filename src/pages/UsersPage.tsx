//components
import SvgLogo2 from '../components/LogoSvg'
import MainButton from '../components/ButtonMain';
import Avatar from '@mui/material/Avatar';
// import Alert from '@mui/material/Alert';
import { auth } from '../firebseConfig/fireaseConfig'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
    const logOut = () => {
        console.log('logged out')
    }

    return (
        <section className='conteiner'>
            <header className='headerWrapper'>
                <SvgLogo2 />
                <div className="flexGapWrapper">
                    <MainButton text={'Log Out'} color={'lightgreen'} onClick={logOut}></MainButton>
                    <div className='avatar'>MK</div>
                </div>
            </header>
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