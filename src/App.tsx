import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from "axios";
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import PropertyManagement from './pages/PropertyManagement';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const getUser = async () => {
    try {

      const url = `${import.meta.env.VITE_BASE_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });

      console.error("======= response", data.response);
      localStorage.setItem("token", data.user.token);
      console.log("token: ", data)
      setUser(data.user);

    } catch (error) {
      console.log("======= error", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/properties" element={<Properties user={user}  />} />
          <Route path="/property/:id" element={<PropertyDetails user={user}  />} />
          <Route path="/property/management" element={<PropertyManagement user={user}  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
