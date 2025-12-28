import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Public pages
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { TenuesAlgeriennesPage } from './pages/TenuesAlgeriennesPage';
import { ContactPage } from './pages/ContactPage';
import { NotreHistoirePage } from './pages/NotreHistoirePage';
import { MentionsLegalesPage } from './pages/MentionsLegalesPage';
import { ConditionsVentePage } from './pages/ConditionsVentePage';
import { DressesPage } from './pages/DressesPage';
import { DressDetailPage } from './pages/DressDetailPage';
import { BookingPage } from './pages/BookingPage';

// Admin pages - Commented out for V1 (static site)
// import { AdminLoginPage } from './pages/admin/AdminLoginPage';
// import { AdminLayout } from './pages/admin/AdminLayout';
// import { AdminDashboard } from './pages/admin/AdminDashboard';
// import { AdminDressesPage } from './pages/admin/AdminDressesPage';
// import { AdminAppointmentsPage } from './pages/admin/AdminAppointmentsPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// 404 Page
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-serif text-gold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
        <a
          href="/"
          className="btn btn-primary inline-block"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/tenues-algeriennes" element={<TenuesAlgeriennesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/notre-histoire" element={<NotreHistoirePage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/conditions-vente" element={<ConditionsVentePage />} />
          <Route path="/robes" element={<DressesPage />} />
          <Route path="/robe/:id" element={<DressDetailPage />} />
          <Route path="/reserver" element={<BookingPage />} />

          {/* Admin routes - Disabled for V1 static site */}
          {/* Will be re-enabled when backend is needed */}
          {/* 
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="robes" element={<AdminDressesPage />} />
            <Route path="rendez-vous" element={<AdminAppointmentsPage />} />
          </Route>
          */}

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
