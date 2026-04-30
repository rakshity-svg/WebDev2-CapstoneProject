import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Search, Bell, ChevronDown, X } from 'lucide-react';
import { notifications } from '../data/mockData';

export default function Navbar() {
  const { activeProfile } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const close = () => { setNotifOpen(false); setProfileOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Anime', path: '/anime' },
    { name: 'My List', path: '/my-list' },
    { name: 'Explore', path: '/explore' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      animate={{
        backgroundColor: scrolled ? 'rgba(20,20,20,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.05)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link to="/" className="text-2xl font-black text-red-500 tracking-wider shrink-0" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            STREAMVAULT
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Search — expands as an overlay so it doesn't push siblings */}
          <div className="relative flex items-center">
            <button
              onClick={(e) => { e.stopPropagation(); setSearchOpen((s) => !s); }}
              className="text-gray-300 hover:text-white transition-colors z-10 relative"
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute right-7 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    ref={searchRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Titles, genres, people..."
                    className="w-full bg-[#1a1a1a] border border-white/30 text-white text-sm px-3 py-1.5 rounded outline-none placeholder:text-gray-500 focus:border-white/60"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => { setNotifOpen((n) => !n); setProfileOpen(false); }}
              className="text-gray-300 hover:text-white transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-10 w-80 bg-[#1f1f1f] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${!n.read ? 'bg-red-500/5' : ''}`}>
                      <p className="text-sm text-gray-200 leading-snug">{n.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => { setProfileOpen((p) => !p); setNotifOpen(false); }}
              className="flex items-center gap-2 group"
            >
              <img
                src={activeProfile?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=default'}
                alt="Profile"
                className="w-8 h-8 rounded object-cover bg-gray-700"
              />
              <motion.div animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
              </motion.div>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-52 bg-[#1f1f1f] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                >
                  {['Account', 'Help', 'Settings'].map((item) => (
                    <button key={item} className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">
                      {item}
                    </button>
                  ))}
                  <button
                    onClick={() => navigate('/profiles')}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
