import{ useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import ThemeToggle from '../components/toggle';

export function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Specify the type of dropdownRef
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Specify the type of mobileMenuRef
  const mobileMenuRef2 = useRef<HTMLDivElement>(null); // Specify the type of mobileMenuRef2

  const [theme, setTheme] = useState('light');
console.log(isDropdownOpen)
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  };
console.log(toggleTheme)
  useEffect(() => {
console.log(isMobileMenuOpen)


    function handleClickOutside(event: MouseEvent) { // Specify the type of event
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { // Cast event.target to Node
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef2.current && !mobileMenuRef2.current.contains(event.target as Node)) { // Cast event.target to Node
        setIsMobileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) { // Cast event.target to Node
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, mobileMenuRef, mobileMenuRef2]);

  return (
    <nav className='w-full border-b backdrop-blur-lg transition-all'>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="flex flex-1 items-stretch justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to='/' className='flex  font-semibold'>
          <img
            src={"./Logo.png"}
            alt=""
            className="px-4"
            min-width="20px"

          />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to='/' className='flex  '>
                  <span className='ml-1 font-mono font-semibold my-auto'>Home</span>
                </Link>
                <Link to='/secret-keys' className='flex  font-semibold'>
                  
                <span className='ml-1 font-mono font-semibold my-auto'>Credentials</span>
                </Link>
                <Link to='/Settings' className='flex  font-semibold'>
                  <span className='ml-1 font-semibold font-mono my-auto'>Settings</span>
                  </Link>
              </div>
            </div>
          </div>
                  
          <ThemeToggle />

          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          </div>
          
        </div>
      </div>
      <div className="relative   h-4 w-full">
      <div className="flex  h-full w-full">

      </div>
    </div>
    </nav>
  );
}

