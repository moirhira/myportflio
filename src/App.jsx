import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ZeroOps from './components/ZeroOps';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminAuth from './admin/AdminAuth';
import AdminLayout from './admin/AdminLayout';
import DashboardPage from './admin/DashboardPage';
import ProjectsPage from './admin/ProjectsPage';
import ProfilePage from './admin/ProfilePage';
import SettingsPage from './admin/SettingsPage';

function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ZeroOps />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/admin"
          element={
            <AdminAuth>
              <AdminLayout />
            </AdminAuth>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
