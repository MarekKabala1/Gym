import { AuthProvider } from './firebseConfig/AuthContext';
import './index.css';
import Routs from './routing/Routs';

function App() {
  return (
    <AuthProvider>
      <Routs />
    </AuthProvider>
  );
}

export default App;
