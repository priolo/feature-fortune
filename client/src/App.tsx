import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import AccountPag from './pages/account/AccountPag';
import FeatureListPag from './pages/feature/list/ListPag';
import FeatureDetailPag from './pages/feature/detail/DetailPag';
import LoginPag from './pages/login/LoginPag';
import MsgBox from './layout/MsgBox';
import { useStore } from '@priolo/jon';
import themeSo from './stores/layout/theme';
import { useMemo } from 'react';
import { darkTheme, lightTheme } from './theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';



function App() {

	// STORES
	const themeSa = useStore(themeSo);

	// HOOKS
	const theme = useMemo(() => {
		return themeSa.mode === 'light' ? lightTheme : darkTheme;
	}, [themeSa.mode]);


	return <ThemeProvider theme={theme}>
		<CssBaseline />

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

	</ThemeProvider>
}

export default App;
