import { Link } from "react-router-dom"
import SvgLogo2 from "../components/LogoSvg"

const PageNotFound = () => {
    return (
        <div className="pageNotFound_wrapper">
            <SvgLogo2 />
            <h1 className="pageNotFound">
                <span className="pageNotFound_number">404</span><br />
                Page not found!!!
            </h1>
            <Link to="" className="pageNotFound_link">Redirect to homepage</Link>
        </div>
    )
}

export default PageNotFound