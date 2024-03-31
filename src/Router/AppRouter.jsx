import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Navbar from '../Components/Navbar';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup'; 
import Signup02 from '../Pages/Signup02'; 
import Home from '../Pages/Home';
import Account from '../Pages/Account'; 
import Paypal from '../Pages/Paypal';
import Buscaragrup from '../Pages/Buscador';
import Agrupacion from '../Pages/Agrupacion';
import Recuperation from '../Pages/Recuperation';
import Afiliarse from '../Pages/Afiliarse';
import Feedback from '../Pages/Feedback';
import Crearag from '../Pages/Crearagrup';
import { NotFoundPage } from '../Pages/404NotFound/404';

export const AppRouter = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route index element={<Home />} />
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='signup02' element={<Signup02 />} />
				<Route path='account' element={<PrivateRoute><Account /></PrivateRoute>} />
				<Route path='paypal' element={<Paypal />} />
				<Route path='buscador' element={<Buscaragrup />} />
				<Route path='agrupacion/:id' element={<Agrupacion />} />
				<Route path='afiliarse/:id' element={<Afiliarse />} />
				<Route path='recuperation' element={<Recuperation />} />
				<Route path='feedback' element={<Feedback />} />
				<Route path='crear' element={<Crearag />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</>
	);
};