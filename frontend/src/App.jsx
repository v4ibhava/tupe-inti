// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail';
import GalleryPage from './pages/GalleryPage';
import ServicesPage from './pages/ServicesPage';
import ArchitecturalDesign from './pages/ArchitecturalDesign';
import ResidentialDesignPage from './pages/ResidentialDesignPage';
import CommercialDesignPage from './pages/CommercialDesignPage';
import ConsultationPage from './pages/ConsultationPage';
import RenovationPage from './pages/RenovationPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import FrontUIDesign from './pages/admin/FrontUIDesign';
import PortfolioManagement from './pages/admin/PortfolioManagement';
import GalleryManagement from './pages/admin/GalleryManagement';
import EnquiriesManagement from './pages/admin/EnquiriesManagement';
import BlogManagement from './pages/admin/BlogManagement';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import useLenis from './hooks/useLenis';

function AppLayout() {
  useLenis();
  const { isNightMode } = useTheme();
  const location = useLocation();
  const showAdminSidebar = location.pathname.startsWith('/admin/') && location.pathname !== '/admin/login';
  const showGlobalFooter = location.pathname !== '/' && !location.pathname.startsWith('/admin/');

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isNightMode ? 'bg-[#0B0C0E] text-[#F3F4F6]' : 'bg-white text-[#111111]'}`}>
      <Navbar />
      {showAdminSidebar && <AdminSidebar />}
      <main className={`flex-1 ${showAdminSidebar ? 'lg:pl-64' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/residential" element={<ResidentialDesignPage />} />
          <Route path="/services/commercial" element={<CommercialDesignPage />} />
          <Route path="/services/architectural" element={<ArchitecturalDesign />} />
          <Route path="/services/consultation" element={<ConsultationPage />} />
          <Route path="/services/renovation" element={<RenovationPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/front-ui" element={<FrontUIDesign />} />
          <Route path="/admin/portfolio" element={<PortfolioManagement />} />
          <Route path="/admin/gallery" element={<GalleryManagement />} />
          <Route path="/admin/enquiries" element={<EnquiriesManagement />} />
          <Route path="/admin/blog" element={<BlogManagement />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {showGlobalFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;