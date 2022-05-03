import MainButton from "./ButtonMain"

const TopButtons = () => {
    const onClick = () => {
        console.log('click')
    }
    return (
        <div className='buttonWraper' style={{ display: 'flex', gap: '2rem' }}>
            <MainButton onClick={onClick} text={"Log In"}></MainButton>
            <MainButton onClick={onClick}></MainButton>
        </div>
    )
}

export default TopButtons