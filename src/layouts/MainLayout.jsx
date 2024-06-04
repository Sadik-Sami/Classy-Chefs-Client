import React, { useEffect, useState } from 'react';
import Header from '../components/Shared/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import { ThemeProvider } from '../contexts/theme';

const MainLayout = () => {
  const [themeMode, setThemeMode] = useState('light');
  const darkTheme = () => {
    setThemeMode('dark');
  };
  const lightTheme = () => {
    setThemeMode('light');
  };
  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);
  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className='bg-background dark:bg-background h-screen '>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
