import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Navbar } from './components/Navbar';
import { Toaster } from './components/ui/toaster';
import { Secrets } from './pages/secrets';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Private from './context/Private';
import Display from './pages/Display';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);



  return (
    <div className={`min-h-screen bg-${theme === 'dark' ? 'gray-900' : 'gray-100'} p-4`}>
      <Navbar  />
      <Routes>
        <Route path="/" element={<Private Component={Home} />} />
        <Route path="/secret-keys" element={<Private Component={Secrets} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-tweets" element={<Display />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <br />
      <Toaster />
    </div>
  );
}

export default App;
