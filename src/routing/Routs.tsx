//react router
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
//Components pages
import HomePage from "../pages/HomePage";
import SignUp from "../components/layout/SignUp";
import LogIn from "../components/layout/LogIn";

const Routs = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>
            </Router>
        </>
    )
}

export default Routs