import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FeatureListPag from './pages/feature/ListPag';
import Analytics from './pages/Analytics';
import FeatureDetailPag from './pages/feature/DetailPag';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import './styles/pages.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/app" element={<Layout />}>

          <Route index element={<FeatureListPag />} />
          <Route path="feature" element={<FeatureDetailPag />} />

          <Route path="analytics" element={<Analytics />} />
          
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
