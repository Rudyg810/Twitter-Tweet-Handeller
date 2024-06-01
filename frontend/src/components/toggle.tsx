import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ThemeToggle() {
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

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Link
      to="#"
      className="flex items-center font-semibold p-2 rounded"
      role="button"
      onClick={toggleTheme}
    >

      <span className="ml-2">{theme === 'light' ? <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/1A1A1A/light-on.png" alt="light-on"/> : <img width="30" height="30" src="https://img.icons8.com/ios/50/FFFFFF/light-on--v1.png" alt="light-on--v1"/>}</span>
    </Link>
  );
}

export default ThemeToggle;
