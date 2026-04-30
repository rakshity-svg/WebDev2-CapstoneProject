import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

function MovieCard({ item, priority = false }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { toggleMyList, isInMyList } = useApp();
  const inList = isInMyList(item.id);

  return (
    <motion.div
      className="relative shrink-0 cursor-pointer"
      style={{ width: '160px' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Base Card */}
      <motion.div
        className="relative rounded-md overflow-hidden bg-gray-900 shadow-xl"
        animate={{
          scale: hovered ? 1.08 : 1,
          zIndex: hovered ? 40 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{ transformOrigin: 'center center' }}
      >
        {/* Thumbnail */}
        <div className="aspect-[2/3] overflow-hidden bg-gray-800">
          <motion.img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
            loading={priority ? 'eager' : 'lazy'}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Hover Overlay Panel */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute bottom-0 left-0 right-0 bg-[#1f1f1f] overflow-hidden"
            >
              {/* Mini preview gradient */}
              <div className="h-1 bg-gradient-to-r from-red-600 to-red-400" />
              
              <div className="p-3">
                {/* Quick Actions */}
                <div className="flex items-center gap-2 mb-2">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); navigate(`/watch/${item.id}`); }}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); toggleMyList(item); }}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      inList ? 'border-white bg-white/20' : 'border-gray-500 hover:border-white'
                    }`}
                  >
                    {inList ? <Check className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-gray-300" />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full border-2 border-gray-500 hover:border-white flex items-center justify-center transition-colors duration-200"
                  >
                    <ThumbsUp className="w-4 h-4 text-gray-300" />
                  </motion.button>
                  <div className="flex-1" />
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    className="w-9 h-9 rounded-full border-2 border-gray-500 hover:border-white flex items-center justify-center transition-colors duration-200"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-300" />
                  </motion.button>
                </div>

                {/* Title */}
                <p className="text-white text-xs font-semibold truncate mb-1">{item.title}</p>

                {/* Match + Genre */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400 text-xs font-semibold">{item.match}%</span>
                  <span className="border border-gray-600 text-gray-400 text-[10px] px-1 rounded">{item.rating}</span>
                  <span className="text-gray-400 text-[10px]">{item.duration}</span>
                </div>

                {/* Synopsis snippet */}
                <p className="text-gray-400 text-[10px] leading-tight line-clamp-2">{item.synopsis}</p>

                {/* Genre Tag */}
                <div className="mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="text-gray-400 text-[10px]">{item.genre}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Non-hover gradient */}
        {!hovered && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent" />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ContentRow({ row, priority = false }) {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const amount = dir === 'left' ? -600 : 600;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(() => {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }, 400);
  };

  return (
    <div className="mb-10">
      {/* Row Header */}
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold text-white mb-4 px-8 lg:px-16 flex items-center gap-2"
      >
        {row.label}
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-red-400 text-sm font-medium hover:underline cursor-pointer ml-2 opacity-0 group-hover:opacity-100"
        >
          Explore All ›
        </motion.span>
      </motion.h2>

      {/* Scroll Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <AnimatePresence>
          {showLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#141414] to-transparent flex items-center justify-start pl-2"
            >
              <div className="bg-black/60 rounded-full p-2 hover:bg-black/90 transition-colors">
                <ChevronLeft className="w-5 h-5 text-white" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right Arrow */}
        <AnimatePresence>
          {showRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#141414] to-transparent flex items-center justify-end pr-2"
            >
              <div className="bg-black/60 rounded-full p-2 hover:bg-black/90 transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Cards */}
        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto no-scrollbar px-8 lg:px-16 pb-8 pt-2"
          onScroll={(e) => {
            const el = e.currentTarget;
            setShowLeft(el.scrollLeft > 0);
            setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
          }}
        >
          {row.items.map((item, i) => (
            <MovieCard key={item.id} item={item} priority={priority && i < 3} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Import ChevronLeft/Right properly
import { ChevronLeft, ChevronRight } from 'lucide-react';
