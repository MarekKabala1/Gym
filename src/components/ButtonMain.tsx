const MainButton = ({ color, text, onClick, type, disabled, className }: ButtonProp) => {

    return (
        <button type={'button'} className={className} onClick={onClick} style={{ backgroundColor: color }}>{text}</button>
    )
}
MainButton.defaultProps = {
    text: 'Sign Up',
    color: '#0DF5E3',
    className: "btn center"

}
type ButtonProp = {
    text: string,
    color: string,
    type: string,
    disabled: boolean,
    className: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}






export default MainButton