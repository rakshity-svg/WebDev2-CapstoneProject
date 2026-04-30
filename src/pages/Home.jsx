import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ContinueWatching from '../components/ContinueWatching';
import ContentRow from '../components/ContentRow';
import { contentRows } from '../data/mockData';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#141414]"
    >
      {/* Hero */}
      <HeroSection />

      {/* Content Rows — offset up to overlap hero bottom */}
      <div className="relative z-10 -mt-4">
        <ContinueWatching />

        <div className="space-y-2 pb-20">
          {contentRows.map((row, i) => (
            <ContentRow key={row.id} row={row} priority={i === 0} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
