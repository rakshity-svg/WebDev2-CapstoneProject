import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Play, Plus, Check, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { allContent, genres, contentRows } from '../data/mockData';
import { useApp } from '../context/AppContext';

const FILTER_TYPES = ['All', 'Movies', 'TV Shows', 'Anime'];
const SORT_OPTIONS = ['Trending', 'Year', 'A-Z', 'Match %'];

function ExploreCard({ item }) {
  const navigate = useNavigate();
  const { toggleMyList, isInMyList } = useApp();
  const inList = isInMyList(item.id);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="relative cursor-pointer group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, zIndex: 10 }}
    >
      <div className="relative rounded-xl overflow-hidden bg-gray-900 shadow-lg">
        {/* Image */}
        <div className="aspect-[2/3] overflow-hidden bg-gray-800">
          <motion.img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
          />
        </div>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-green-400 text-xs font-bold">{item.match}%</span>
            <span className="border border-gray-600 text-gray-400 text-[10px] px-1.5 rounded">{item.rating}</span>
            <span className="text-gray-400 text-xs">{item.year}</span>
          </div>
          <h3 className="text-white font-bold text-base truncate mb-0.5">{item.title}</h3>
          <p className="text-gray-400 text-xs truncate max-w-full">{item.genre}</p>

          {/* Hover actions */}
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
                  className={`p-1.5 rounded-full border ${inList ? 'border-white bg-white/20' : 'border-gray-500 hover:border-white'} transition-colors`}
                >
                  {inList ? <Check className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-gray-300" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Explore({ initialType = 'All', pageTitle = 'Explore', pageSubtitle = 'Discover thousands of titles curated just for you' }) {
  const [searchParams] = useSearchParams();
  const [activeType, setActiveType] = useState(initialType);
  const [activeGenre, setActiveGenre] = useState('All');
  const [sortBy, setSortBy] = useState('Trending');
  const [genreOpen, setGenreOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [showGenreGrid, setShowGenreGrid] = useState(false);
  const navigate = useNavigate();

  const filteredContent = useMemo(() => {
    let items = [...allContent];
    if (activeType === 'Movies') items = items.filter(i => !i.duration?.includes('Season') && !i.duration?.includes('Episodes') && !i.id.includes('anime'));
    if (activeType === 'TV Shows') items = items.filter(i => (i.duration?.includes('Season') || i.duration?.includes('Episodes')) && !i.id.includes('anime'));
    if (activeType === 'Anime') {
      const animeIds = [
        "a-silent-voice", "anohana", "bakemonogatari", "bleach-tybw", "bocchi", "chainsaw-reze", "clannad-as", "code-geass", "cyberpunk", 
        "death-note", "evangelion-thrice", "fate-ubw", "fate-hf", "fate-strange", "frieren", "i-want-to-eat", "jojo-stardust", "kaguya", 
        "konosuba", "mushoku", "non-non", "steins-gate", "summertime", "takopi", "gurren-lagann", "haruhi", "sakurasou", "toradora", "vinland-saga", "violet-evergarden", "your-name"
      ];
      items = items.filter(i => animeIds.includes(i.id));
    }
    if (activeGenre !== 'All') items = items.filter(i => i.genre?.toLowerCase().includes(activeGenre.toLowerCase()));
    if (sortBy === 'Year') items.sort((a, b) => b.year - a.year);
    if (sortBy === 'A-Z') items.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'Match %') items.sort((a, b) => b.match - a.match);
    return items;
  }, [activeType, activeGenre, sortBy]);

  const genreNames = ['All', ...genres.map(g => g.label)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#141414] pt-20"
    >
      {/* Page Header */}
      <div className="px-8 lg:px-16 mb-8 pt-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-white mb-1"
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
        >
          {pageTitle}
        </motion.h1>
        <p className="text-gray-400 text-sm">{pageSubtitle}</p>
      </div>

      {/* Genre Grid Toggle */}
      <div className="px-8 lg:px-16 mb-8">
        <button
          onClick={() => setShowGenreGrid((s) => !s)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Browse by Genre
          <motion.div animate={{ rotate: showGenreGrid ? 180 : 0 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showGenreGrid && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                {genres.map((genre) => (
                  <motion.button
                    key={genre.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setActiveGenre(genre.label); setShowGenreGrid(false); }}
                    className="relative rounded-xl overflow-hidden h-20 group"
                  >
                    <img
                      src={`https://images.unsplash.com/${genre.img}?w=300&q=70`}
                      alt={genre.label}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${genre.color}cc, ${genre.color}66)` }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm drop-shadow-lg text-center px-2">{genre.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-30 bg-[#141414]/95 backdrop-blur-md border-b border-white/5 px-8 lg:px-16 py-3 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Type Filters */}
          <div className="flex items-center bg-white/5 rounded-lg p-1 gap-1">
            {FILTER_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeType === t
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Genre Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setGenreOpen((o) => !o); setSortOpen(false); }}
              className="flex items-center gap-2 border border-gray-600 hover:border-gray-400 text-gray-300 px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              {activeGenre}
              <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {genreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  className="absolute top-10 left-0 bg-[#1f1f1f] border border-white/10 rounded-xl shadow-2xl z-40 w-48 max-h-60 overflow-y-auto"
                >
                  {genreNames.map((g) => (
                    <button
                      key={g}
                      onClick={() => { setActiveGenre(g); setGenreOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${activeGenre === g ? 'text-red-400' : 'text-gray-300'}`}
                    >
                      {g}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setSortOpen((o) => !o); setGenreOpen(false); }}
              className="flex items-center gap-2 border border-gray-600 hover:border-gray-400 text-gray-300 px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              Sort: {sortBy}
              <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  className="absolute top-10 left-0 bg-[#1f1f1f] border border-white/10 rounded-xl shadow-2xl z-40 w-36"
                >
                  {SORT_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSortBy(s); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${sortBy === s ? 'text-red-400' : 'text-gray-300'}`}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results count */}
          <span className="text-gray-500 text-sm ml-auto">{filteredContent.length} titles</span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-8 lg:px-16 pb-20">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredContent.map(item => (
              <ExploreCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredContent.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2">No titles found</h3>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
