import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Check if dark mode is enabled
  const isDarkMode = () => document.documentElement.classList.contains('dark');
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', newDarkMode ? 'dark' : 'light');
  };
  
  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    // Check for saved preference
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else if (savedMode === 'light') {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      // No saved preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      }
    }
  }, []);
  
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
};

export default DarkModeToggle; 