// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import HomePage from './Pages/HomePage'; // Assuming HomePage is a component you want to render
import AboutPage from './Pages/AboutPage';

const App = () => {
  return (
    <Router> {/* Wrap everything in BrowserRouter to enable routing */}
      <Routes> {/* Define your Routes here */}
        {/* Render HomePage for '/' and '/home' */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        {/* You can add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
