import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../components/share/Navbar';
import Home from '../pages/Home';
import Contents from '../pages/Contents';
import Map from '../pages/Map';

import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { ThemeType } from '../model/interface';
import Footer from '../components/share/Footer';

const Routers: React.FC<ThemeType> = ({ themeMode, toggleTheme }) => {
  const [currentLocation, setCurrentLocation] = useState<string | undefined>(
    '전체',
  );

  const excludedRoutes = ['/map'];
  const location = useLocation();

  return (
    <>
      <Navbar
        maxWidth={!excludedRoutes.includes(location.pathname) ? null : '98%'}
        themeMode={themeMode}
        toggleTheme={toggleTheme}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />
          }
        />
        <Route
          path="/contents"
          element={
            <Contents
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />
          }
        />
        <Route path="/map" element={<Map />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Routers;
