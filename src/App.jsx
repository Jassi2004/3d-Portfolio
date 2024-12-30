// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import HomePage from './Pages/HomePage'; // Assuming HomePage is a component you want to render
import { AboutModal } from './Pages/PagesComponents/AboutModal';
import { EducationModal } from './Pages/PagesComponents/EducationModal';
import { ExperienceModal } from './Pages/PagesComponents/ExperienceModal';
import { SkillsModal } from './Pages/PagesComponents/SkillsModal';
import ProjectsModal from './Pages/PagesComponents/ProjectsModal';
import AccomplishmentsModal from './Pages/PagesComponents/AccomplishmentsModal';
import MainPage from './Pages/MainPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/about" element={<AboutModal />} />
        <Route path="/education" element={<EducationModal />} />
        <Route path="/experience" element={<ExperienceModal />} />
        <Route path="/skills" element={<SkillsModal />} />
        <Route path="/projects" element={<ProjectsModal />} />
        <Route path="/accomplishments" element={<AccomplishmentsModal />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
