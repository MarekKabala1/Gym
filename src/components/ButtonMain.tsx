const MainButton = ({ color, text, onClick }: ButtonProp) => {

    return (
        <button className="btn" onClick={onClick} style={{ backgroundColor: color }}>{text}</button>
    )
}
MainButton.defaultProps = {
    text: 'Sign Up',
    color: '#0DF5E3'
}
type ButtonProp = {
    text: string,
    color: string,
    onClick(event: React.MouseEvent<HTMLButtonElement>): void
}






export default MainButton