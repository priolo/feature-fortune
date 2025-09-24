import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AuthorRegisterPag from './pages/account/AuthorRegisterPag';
import Analytics from './pages/Analytics';
import Customers from './pages/Customers';
import { default as FeatureDetailPag } from './pages/feature/DetailPag';
import FeatureListPag from './pages/feature/ListPag';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import './styles/pages.css';
import UserPag from './pages/account/UserPag';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/app" element={<Layout />}>

          <Route index element={<FeatureListPag />} />
          <Route path="feature" element={<FeatureDetailPag />} />
          <Route path="register" element={<AuthorRegisterPag />} />
          <Route path="account" element={<UserPag />} />

          
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
