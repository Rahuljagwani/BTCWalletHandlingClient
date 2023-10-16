import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Transactions from './Components/Transactions';
import ListWallets from './Components/ListWallets';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListWallets />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
};

export default App;
