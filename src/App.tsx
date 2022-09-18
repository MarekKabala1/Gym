import { AuthContextProvider } from './firebseConfig/AuthContext';
import './index.css';
import Routs from './routing/Routs';

function App() {
  return (
    <AuthContextProvider>
      <Routs />
    </AuthContextProvider>

  );
}

export default App;
