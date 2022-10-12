import SvgLogo2 from "../components/LogoSvg"
const Loading = () => {
    return (
        <section className=" loading-wrapper flex-column center">
            <SvgLogo2 />
            <div className="loading-wrapper_text">Loading<span>...</span></div>
        </section>
    )
}

export default Loading
