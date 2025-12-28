# Heritage Frontend

Interface web pour le site de réservation de robes orientales Heritage.

## Technologies

- React 19
- TypeScript
- React Router v7
- TanStack Query (React Query)
- Tailwind CSS
- Axios

## Installation

```bash
npm install
```

## Configuration

Créer un fichier `.env` (optionnel) :

```env
VITE_API_URL=http://localhost:3000/api
```

## Démarrage

```bash
# Développement
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Layout
│   ├── ui/            # Composants réutilisables
│   └── ProtectedRoute.tsx
├── contexts/          # AuthContext
├── pages/
│   ├── admin/         # Pages admin
│   ├── HomePage.tsx
│   ├── DressesPage.tsx
│   ├── DressDetailPage.tsx
│   └── BookingPage.tsx
├── services/          # API services
├── types/             # Types TypeScript
├── utils/             # Helpers
├── App.tsx
├── main.tsx
└── index.css
```

## Pages

### Public
- `/` - Accueil
- `/robes` - Catalogue
- `/robe/:id` - Détails d'une robe
- `/reserver` - Formulaire de réservation

### Admin
- `/admin/login` - Connexion
- `/admin/dashboard` - Tableau de bord
- `/admin/robes` - Gestion des robes
- `/admin/rendez-vous` - Gestion des rendez-vous

## Design System

### Couleurs
- Gold: #D4AF37
- Burgundy: #8B0000
- Cream: #F5F5DC
- Emerald: #50C878

### Composants
- Button (primary, secondary, outline)
- Card
- Modal
- Input / Select / Textarea
- Loading / Skeleton

## Authentification

Le contexte d'authentification gère :
- Login / Logout
- Token JWT dans localStorage
- Routes protégées pour l'admin
