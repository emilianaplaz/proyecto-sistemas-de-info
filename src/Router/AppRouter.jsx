import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Navbar from '../Components/Navbar';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Account from '../Pages/Account'; 

export const AppRouter = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route index element={<Home />} />
				<Route path='login' element={<Login />} />
				<Route path='account' element={<PrivateRoute><Account /></PrivateRoute>} />
			</Routes>
		</>
	);
};