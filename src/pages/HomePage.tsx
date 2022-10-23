import LogoSvg from "../components/LogoSvg"
import MainButton from "../components/ButtonMain"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('/login')
    }
    const onClick2 = () => {
        navigate('/register')
    }

    return (
        <main className="homePage-wrapper flex-column gap-xl ">
            <header className='nav flex'>
                <LogoSvg />
                <div className='buttonWraper flex gap-l'>
                    <MainButton disabled={false} color={'lightgreen'} onClick={onClick2} type={""}></MainButton>
                    <MainButton disabled={false} onClick={onClick} text={"Log In"} type={""}></MainButton>
                </div>
            </header>
            <section className='heroConteiner flex-column center gap-l'>
                <h1>MAKE YOUR OWN PLAN </h1>
                <h2>TRACK YOUR PROGRES</h2>
                <h2>NUTRITION AND GYM IN ONE PLACE</h2>
            </section>
        </main>
    )
}

export default HomePage