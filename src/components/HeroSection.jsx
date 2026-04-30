import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Info, Plus, ThumbsUp, VolumeX, Volume2 } from 'lucide-react';
import { featuredContent } from '../data/mockData';

export default function HeroSection() {
  const [muted, setMuted] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[92vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src={featuredContent.thumbnail}
          alt={featuredContent.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Subtle vignette edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#141414]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-28 px-8 lg:px-16 max-w-3xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded tracking-widest uppercase">
            ⭐ Exclusive Series
          </span>
          <span className="text-gray-300 text-sm">#{featuredContent.match}% Match</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tight mb-2"
          style={{ fontFamily: 'Bebas Neue, sans-serif', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
        >
          {featuredContent.title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-300 text-lg italic mb-3"
        >
          {featuredContent.tagline}
        </motion.p>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4 mb-6 text-sm"
        >
          <span className="border border-gray-500 text-gray-400 px-2 py-0.5 rounded text-xs">{featuredContent.rating}</span>
          <span className="text-gray-300">{featuredContent.year}</span>
          {featuredContent.seasons
            ? <span className="text-gray-300">{featuredContent.seasons} Seasons</span>
            : <span className="text-gray-300">{featuredContent.duration}</span>
          }
          {featuredContent.genre.map((g) => (
            <span key={g} className="text-gray-400">{g}</span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-200 text-base leading-relaxed mb-8 max-w-xl"
        >
          {featuredContent.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-4"
        >
          <motion.button
            onClick={() => navigate(`/watch/${featuredContent.id}`)}
            className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3.5 rounded-md text-base hover:bg-gray-200 transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Play className="w-5 h-5 fill-black" />
            Play
          </motion.button>

          <motion.button
            onClick={() => setShowInfo(true)}
            className="flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3.5 rounded-md text-base hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Info className="w-5 h-5" />
            More Info
          </motion.button>

          <div className="flex-1" />

          {/* Mute button */}
          <motion.button
            onClick={() => setMuted((m) => !m)}
            className="rounded-full border border-gray-500 p-2.5 text-gray-300 hover:text-white hover:border-white transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>
        </motion.div>
      </div>

      {/* More Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20 p-8"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-[#1a1a1a] rounded-2xl max-w-lg w-full overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={featuredContent.thumbnail} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{featuredContent.title}</h2>
                <div className="flex items-center gap-3 mb-4 text-sm">
                  <span className="text-green-400 font-semibold">{featuredContent.match}% Match</span>
                  <span className="text-gray-400">{featuredContent.year}</span>
                  <span className="border border-gray-600 text-gray-400 px-1.5 py-0.5 rounded text-xs">{featuredContent.rating}</span>
                  {featuredContent.seasons
                    ? <span className="text-gray-400">{featuredContent.seasons} Seasons</span>
                    : <span className="text-gray-400">{featuredContent.duration}</span>
                  }
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">{featuredContent.description}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/watch/${featuredContent.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Play className="w-5 h-5 fill-black" /> Play
                  </button>
                  <button className="p-3 border border-gray-600 rounded-lg hover:border-white transition-colors">
                    <Plus className="w-5 h-5 text-gray-300" />
                  </button>
                  <button className="p-3 border border-gray-600 rounded-lg hover:border-white transition-colors">
                    <ThumbsUp className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
