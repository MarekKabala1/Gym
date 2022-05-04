import LogoSvg from "./LogoSvg"
import MainButton from "./ButtonMain"

const Header = () => {
    const onClick = () => {
        console.log('click')
    }
    const onClick2 = () => {
        console.log('click2')
    }

    return (
        <header className='nav'>
            <LogoSvg />
            <div className='buttonWraper' style={{ display: 'flex', gap: '2rem' }}>
                <MainButton onClick={onClick} text={"Log In"}></MainButton>
                <MainButton onClick={onClick2}></MainButton>
            </div>
        </header>
    )
}

export default Header