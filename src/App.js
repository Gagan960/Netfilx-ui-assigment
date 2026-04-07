
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="fade-in">
      {!user ? <Login setUser={setUser} /> : <Home />}
    </div>
  );
}

export default App;
