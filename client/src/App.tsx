import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AccountPag from './pages/account/AccountPag';
import FeatureListPag from './pages/feature/ListPag';
import './styles/pages.css';
import FeatureDetailPag from './pages/feature/DetailPag';



function App() {
	return (
		<Router>
			<Routes>
				<Route path="/app" element={<Layout />}>

					<Route index element={<FeatureListPag />} />
					<Route path="account" element={<AccountPag />} />
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
