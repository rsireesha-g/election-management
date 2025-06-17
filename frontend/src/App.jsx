import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard as VoterDashboard } from './pages/VoterDashboard';
import { Dashboard as CommitteeDashboard } from './pages/CommitteeDashboard';
import { CommitteePrivateRoute } from './components/Main/PrivateRoute/committee';
import { VoterPrivateRoute } from './components/Main/PrivateRoute/voter';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/voter/dashboard" element={
        <VoterPrivateRoute>
          <VoterDashboard />
        </VoterPrivateRoute>
      } />
      <Route path="/committee/dashboard" element={
        <CommitteePrivateRoute>
          <CommitteeDashboard />
        </CommitteePrivateRoute>
      } />
    </Routes>
  );
}

export default App;
