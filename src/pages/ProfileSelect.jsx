import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Edit3, ChevronRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
};

export default function ProfileSelect() {
  const { profiles, setActiveProfile } = useApp();
  const [managing, setManaging] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [selecting, setSelecting] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (profile) => {
    if (managing) return;
    setSelecting(profile.id);
    setTimeout(() => {
      setActiveProfile(profile);
      navigate('/');
    }, 600);
  };

  return (
    <motion.div
      className="min-h-screen bg-[#141414] flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-black tracking-tight text-red-500 drop-shadow-lg" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
          STREAMVAULT
        </h1>
        <p className="text-gray-400 text-sm mt-1 tracking-widest uppercase">Premium Streaming</p>
      </motion.div>

      {/* Who's Watching */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-semibold text-white mb-10"
      >
        {managing ? 'Manage Profiles' : "Who's Watching?"}
      </motion.h2>

      {/* Profiles Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-8 max-w-2xl"
      >
        {profiles.map((profile) => (
          <motion.div
            key={profile.id}
            variants={itemVariants}
            className="flex flex-col items-center gap-3 cursor-pointer group"
            onClick={() => handleSelect(profile)}
            onHoverStart={() => setHovered(profile.id)}
            onHoverEnd={() => setHovered(null)}
          >
            <motion.div
              className="relative w-32 h-32 rounded-lg overflow-hidden"
              animate={{
                scale: selecting === profile.id ? 1.15 : hovered === profile.id ? 1.07 : 1,
                borderRadius: hovered === profile.id ? '8px' : '6px',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                boxShadow:
                  selecting === profile.id
                    ? `0 0 0 3px ${profile.color}, 0 0 30px ${profile.color}60`
                    : hovered === profile.id
                    ? `0 0 0 2px ${profile.color}90`
                    : 'none',
              }}
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover bg-gray-800"
                style={{ filter: selecting === profile.id ? 'brightness(1.2)' : 'none' }}
              />
              {/* Hover overlay */}
              <AnimatePresence>
                {hovered === profile.id && !managing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center"
                  >
                    <ChevronRight className="text-white w-8 h-8" />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Manage edit overlay */}
              {managing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center"
                >
                  <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                    <Edit3 className="text-white w-6 h-6" />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Profile Name */}
            <motion.span
              className="text-gray-400 text-sm font-medium tracking-wide group-hover:text-white transition-colors duration-200"
              animate={{ color: hovered === profile.id ? '#ffffff' : '#9ca3af' }}
            >
              {profile.name}
            </motion.span>
          </motion.div>
        ))}

        {/* Add Profile Button */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-32 h-32 rounded-lg border-2 border-gray-600 flex items-center justify-center bg-transparent group-hover:border-white transition-colors duration-200">
            <span className="text-gray-500 text-5xl font-light group-hover:text-white transition-colors duration-200">+</span>
          </div>
          <span className="text-gray-500 text-sm group-hover:text-white transition-colors duration-200">Add Profile</span>
        </motion.div>
      </motion.div>

      {/* Manage Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={() => setManaging((m) => !m)}
        className="mt-12 px-8 py-2.5 border border-gray-500 text-gray-400 text-sm tracking-widest uppercase hover:border-white hover:text-white transition-all duration-300 rounded-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {managing ? 'Done' : 'Manage Profiles'}
      </motion.button>

      {/* Selecting animation overlay */}
      <AnimatePresence>
        {selecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#141414]/70 backdrop-blur-sm flex items-center justify-center pointer-events-none z-20"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-3 h-3 bg-red-500 rounded-full mx-auto animate-ping" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
