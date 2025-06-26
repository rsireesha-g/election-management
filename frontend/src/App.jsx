import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { Dashboard as VoterDashboard } from './pages/Dashboard/Voter';
import { Dashboard as CommitteeDashboard } from './pages/Dashboard/Committee';
import { CommitteePrivateRoute } from './components/Main/PrivateRoute/committee';
import { VoterPrivateRoute } from './components/Main/PrivateRoute/voter';
import { MyProfile } from './pages/Dashboard/Voter/MyProfile';
import { Register } from './pages/Dashboard/Voter/Register';
import { Receipt } from './pages/Dashboard/Voter/receipt';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard/voter" element={
        <VoterPrivateRoute>
          <VoterDashboard />
        </VoterPrivateRoute>
      }
      />
      <Route path="/dashboard/committee" element={
        <CommitteePrivateRoute>
          <CommitteeDashboard />
        </CommitteePrivateRoute>
      }
      />
      <Route path="/dashboard/voter/myProfile" element={<MyProfile />} />
      <Route path="/dashboard/voter/register" element={<Register />} />
      <Route path="/dashboard/voter/receipt" element={<Receipt />} />
    </Routes>
  );
}

export default App;
