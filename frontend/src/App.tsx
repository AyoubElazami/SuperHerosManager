import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { HeroDetails } from './pages/HeroDetails';
import { AddHero } from './pages/AddHero';
import { EditHero } from './pages/EditHero';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/hero/:id" element={<HeroDetails />} />
              <Route path="/add-hero" element={<AddHero />} />
              <Route path="/edit-hero/:id" element={<EditHero />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
