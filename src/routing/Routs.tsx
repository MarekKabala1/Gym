//react router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Components pages
import HomePage from '../pages/HomePage';
import SignUp from '../components/layout/registerLogIn/SignUp';
import LogIn from '../components/layout/registerLogIn/LogIn';
import UsersPage from '../pages/UsersPage';
import ResetPassword from '../components/layout/registerLogIn/ResetPassword';
import PageNotFound from '../pages/PageNotFound';
import GymPage from '../pages/gym/GymPage';
import Loading from '../pages/Loading';
import WorkoutPage from '../pages/gym/WorkoutPage';
import DisplayWorkoutDetails from '../components/layout/gym/DisplayWorkoutDetails';

const Routs = () => {
	return (
		<>
			<Router>
				<Routes>
					{/* public routs */}
					<Route path='*' element={<PageNotFound />} />
					<Route path='/' element={<HomePage />} />
					<Route path='/loading' element={<Loading />} />
					<Route path='/register' element={<SignUp />} />
					<Route path='/login' element={<LogIn />} />
					<Route path='/resetpassword' element={<ResetPassword />} />
					{/* protected routs */}
					<Route path='/userpage/:uid' element={<UsersPage />} />
					<Route path='/gym' element={<GymPage />} />
					<Route path='/gym/:workout' element={<WorkoutPage />} />
					<Route
						path='/gym/:workout/:uuid'
						element={<DisplayWorkoutDetails />}
					/>
					{/* <Route path="/gym/:workout/:uuid" element={<DisplayWorkoutDetailsForm />} /> */}

					{/* </Route> */}
				</Routes>
			</Router>
		</>
	);
};

export default Routs;
