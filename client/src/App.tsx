import { CssBaseline, ThemeProvider } from '@mui/material';
import { useStore } from '@priolo/jon';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import MsgBox from './layout/MsgBox';
import AccountPag from './pages/account/AccountPag';
import FeatureDetailPag from './pages/feature/detail/DetailPag';
import FeatureListPag from './pages/feature/list/ListPag';
import LoginPag from './pages/login/LoginPag';
import MessagePag from './pages/message/MessagePag';
import themeSo from './stores/layout/theme';
import { ErrorBoundary } from './components/ErrorBoundary';
import PolicyDialog from './layout/policy/PolicyDialog';



function App() {

	// STORES
	useStore(themeSo);

	// HOOKS
	return <ThemeProvider theme={themeSo.state.current}>
		<CssBaseline />

		<ErrorBoundary>
			<Router>
				<Routes>
					<Route path="/app" element={<Layout />}>

						<Route index element={<FeatureListPag />} />
						<Route path="account" element={<AccountPag />} />
						<Route path="login" element={<LoginPag />} />
						<Route path="messages" element={<MessagePag />} />
						<Route path="feature/:id" element={<FeatureDetailPag />} />

					</Route>
				</Routes>
			</Router>
		</ErrorBoundary>

		<MsgBox />
		<PolicyDialog />

	</ThemeProvider>
}

export default App;
