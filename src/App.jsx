import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from './pages/Navbar';
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import ZeroOps from './pages/ZeroOps';
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import AdminAuth from './admin/components/AdminAuth';
import AdminLayout from './admin/components/AdminLayout';
import DashboardPage from './admin/pages/DashboardPage';
import ProjectsPage from './admin/pages/ProjectsPage';
import ProfilePage from './admin/pages/ProfilePage';
import SettingsPage from './admin/pages/SettingsPage';

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
