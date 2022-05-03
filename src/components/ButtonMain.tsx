const MainButton = ({ color, text, onClick }: ButtonProp) => {

    return (
        <button className="btn" onClick={onClick} style={{ backgroundColor: color }}>{text}</button>
    )
}
MainButton.defaultProps = {
    text: 'Sign Up',
    color: '--clr_button'
}
type ButtonProp = {
    text: string,
    color: string,
    onClick: any
}






export default MainButton