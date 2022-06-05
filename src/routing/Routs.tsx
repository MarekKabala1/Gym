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
import UsersPage from "../pages/UsersPage";
import ResetPassword from "../components/layout/ResetPassword";
import PageNotFound from "../pages/PageNotFound";

const Routs = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/resetpassword" element={<ResetPassword />} />
                    <Route path="/userpage/:uid" element={<UsersPage />} />
                </Routes>
            </Router>
        </>
    )
}

export default Routs