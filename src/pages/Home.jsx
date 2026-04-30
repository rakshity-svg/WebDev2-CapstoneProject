import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ContinueWatching from '../components/ContinueWatching';
import ContentRow from '../components/ContentRow';
import { contentRows } from '../data/mockData';
import Explore from './Explore';

export default function Home() {
  const { 
    myList, 
    genresFilter, 
    toggleMyList, 
    isInMyList 
  } = useApp();

  const [heroHovered, setHeroHovered] = useState(false);

  // Filter content rows based on selected genres
  const filteredRows = useMemo(() => {
    if (genresFilter.length === 0) return contentRows;
    
    return contentRows.map(row => ({
      ...row,
      items: row.items.filter(item => 
        genresFilter.some(genre => item.genres.includes(genre))
      ),
    })).filter(row => row.items.length > 0);
  }, [genresFilter, contentRows]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#141414]"
    >
      {/* Hero */}
      <HeroSection 
        myList={myList} 
        toggleMyList={toggleMyList} 
        isInMyList={isInMyList} 
        onMouseEnter={() => setHeroHovered(true)} 
        onMouseLeave={() => setHeroHovered(false)} 
      />

      {/* Content Rows — offset up to overlap hero bottom */}
      <div className="relative z-10 -mt-4">
        <ContinueWatching />

        <div className="space-y-2 pb-20">
          {filteredRows.map((row, i) => (
            <ContentRow key={row.id} row={row} priority={i === 0} />
          ))}
        </div>
      </div>

      {/* Explore section — only show if no genres are filtered */}
      {genresFilter.length === 0 && <Explore />}
    </motion.div>
  );
}
