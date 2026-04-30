import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { continueWatching } from '../data/mockData';

function ContinueCard({ item }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative shrink-0 cursor-pointer group"
      style={{ width: '220px' }}
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onClick={() => navigate(`/watch/${item.id}`)}
    >
      <div className="relative rounded-lg overflow-hidden bg-gray-900 shadow-xl">
        {/* Thumbnail */}
        <div className="aspect-video overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 card-gradient" />

        {/* Play button overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-600/70 rounded-full mb-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.progress}%` }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="h-full bg-red-500 rounded-full relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-500/50" />
            </motion.div>
          </div>

          <p className="text-white text-xs font-semibold truncate">{item.title}</p>
          <p className="text-gray-400 text-[10px] mt-0.5">{item.episode}</p>
        </div>

        {/* Genre tag */}
        <div className="absolute top-2 left-2">
          <span className="bg-black/60 backdrop-blur-sm text-gray-300 text-[9px] px-2 py-0.5 rounded-full border border-white/10">
            {item.genre}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ContinueWatching() {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir === 'left' ? -500 : 500, behavior: 'smooth' });
  };

  return (
    <div className="mb-10 -mt-16 relative z-10">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-white mb-4 px-8 lg:px-16 flex items-center gap-3"
      >
        <span className="w-1 h-5 bg-red-500 rounded-full inline-block" />
        Continue Watching
      </motion.h2>

      <div className="relative group">
        {/* Left / Right scroll buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 rounded-full p-2 hover:bg-black/90"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 rounded-full p-2 hover:bg-black/90"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        <motion.div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto no-scrollbar px-8 lg:px-16 py-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          {continueWatching.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <ContinueCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
