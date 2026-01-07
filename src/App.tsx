import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import { ScrollToTop } from './components/ScrollToTop';

// Public pages
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { TenuesAlgeriennesPage } from './pages/TenuesAlgeriennesPage';
import { AccessoiresPage } from './pages/AccessoiresPage';
import { ContactPage } from './pages/ContactPage';
import { NotreHistoirePage } from './pages/NotreHistoirePage';
import { MentionsLegalesPage } from './pages/MentionsLegalesPage';
import { ConditionsVentePage } from './pages/ConditionsVentePage';
import { DressesPage } from './pages/DressesPage';
import { DressDetailPage } from './pages/DressDetailPage';
import { BookingPage } from './pages/BookingPage';

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
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/tenues-algeriennes" element={<TenuesAlgeriennesPage />} />
          <Route path="/accessoires" element={<AccessoiresPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/notre-histoire" element={<NotreHistoirePage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/conditions-vente" element={<ConditionsVentePage />} />
          <Route path="/robes" element={<DressesPage />} />
          <Route path="/robe/:id" element={<DressDetailPage />} />
          <Route path="/reserver" element={<BookingPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
