import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import ProfileSelect from './pages/ProfileSelect';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Anime from './pages/Anime';
import MyList from './pages/MyList';
import Watch from './pages/Watch';

function ProtectedRoute({ children }) {
  const { activeProfile } = useApp();
  return activeProfile ? children : <Navigate to="/profiles" replace />;
}

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/profiles" element={<ProfileSelect />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-shows" element={<TVShows />} />
          <Route path="anime" element={<Anime />} />
          <Route path="my-list" element={<MyList />} />
          <Route path="watch/:id" element={<Watch />} />
        </Route>
        <Route path="*" element={<Navigate to="/profiles" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
