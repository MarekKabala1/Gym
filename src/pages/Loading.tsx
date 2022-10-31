import Logo from "../components/Logo"
const Loading = () => {
    return (
        <section className=" loading-wrapper flex-column center">
            <Logo />
            <div className="loading-wrapper_text">Loading<span>...</span></div>
        </section>
    )
}

export default Loading
