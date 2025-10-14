import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import AccountPag from './pages/account/AccountPag';
import FeatureListPag from './pages/feature/list/ListPag';
import FeatureDetailPag from './pages/feature/detail/DetailPag';
import LoginPag from './pages/login/LoginPag';
import MsgBox from './layout/MsgBox';



function App() {
	return <>
		<Router>
			<Routes>
				<Route path="/app" element={<Layout />}>

					<Route index element={<FeatureListPag />} />
					<Route path="account" element={<AccountPag />} />
					<Route path="login" element={<LoginPag />} />
					<Route path="feature/:id" element={<FeatureDetailPag />} />

				</Route>
			</Routes>
		</Router>

		<MsgBox />
	</>
}

export default App;
