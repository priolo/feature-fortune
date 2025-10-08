import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AccountPag from './pages/account/AccountPag';
import FeatureListPag from './pages/feature/ListPag';
import './styles/pages.css';
import FeatureDetailPag from './pages/feature/DetailPag';
import LoginPag from './pages/login/LoginPag';



function App() {
	return (
		<Router>
			<Routes>
				<Route path="/app" element={<Layout />}>

					<Route index element={<FeatureListPag />} />
					<Route path="account" element={<AccountPag />} />
					<Route path="login" element={<LoginPag />} />
					<Route path="feature/:id" element={<FeatureDetailPag />} />

					{/* <Route path="register" element={<AuthorRegisterPag />} /> */}
					{/* <Route path="_account" element={<UserPag />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} /> */}
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
