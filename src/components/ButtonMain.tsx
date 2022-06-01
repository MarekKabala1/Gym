const MainButton = ({ color, text, onClick, type }: ButtonProp) => {

    return (
        <button type={'button'} className="btn" onClick={onClick} style={{ backgroundColor: color }}>{text}</button>
    )
}
MainButton.defaultProps = {
    text: 'Sign Up',
    color: '#0DF5E3'
}
type ButtonProp = {
    text: string,
    color: string,
    type: string,
    onClick: () => void;
}






export default MainButton