import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Check, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

function MyListCard({ item }) {
  const navigate = useNavigate();
  const { toggleMyList } = useApp();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.25 }}
      className="relative cursor-pointer group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, zIndex: 10 }}
    >
      <div className="relative rounded-xl overflow-hidden bg-gray-900 shadow-lg">
        <div className="aspect-video overflow-hidden">
          <motion.img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-green-400 text-xs font-bold">{item.match}%</span>
            <span className="border border-gray-600 text-gray-400 text-[10px] px-1.5 rounded">{item.rating}</span>
            <span className="text-gray-400 text-xs">{item.year}</span>
          </div>
          <h3 className="text-white font-semibold text-sm truncate">{item.title}</h3>
          <p className="text-gray-400 text-xs">{item.genre}</p>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 mt-3"
              >
                <button
                  onClick={() => navigate(`/watch/${item.id}`)}
                  className="flex items-center gap-1 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Play className="w-3 h-3 fill-black" /> Play
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMyList(item); }}
                  className="p-1.5 rounded-full border border-red-500 bg-red-500/20 hover:bg-red-500/40 transition-colors"
                  title="Remove from My List"
                >
                  <Trash2 className="w-3 h-3 text-red-400" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function MyList() {
  const { myList } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#141414] pt-20"
    >
      <div className="px-8 lg:px-16 mb-8 pt-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-white mb-1"
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
        >
          My List
        </motion.h1>
        <p className="text-gray-400 text-sm">Your saved titles, ready to watch</p>
      </div>

      <div className="px-8 lg:px-16 pb-20">
        {myList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-white mb-2">Your list is empty</h3>
            <p className="text-gray-400">Add titles by clicking the + button on any content card</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-6">{myList.length} title{myList.length !== 1 ? 's' : ''} saved</p>
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {myList.map((item) => (
                  <MyListCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
