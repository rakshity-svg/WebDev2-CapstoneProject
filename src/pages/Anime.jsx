import Explore from './Explore';

// Thin wrapper — renders the Explore page locked to TV Shows filter
export default function Anime() {
  return <Explore initialType="Anime" pageTitle="Anime" pageSubtitle="Top tier anime from Japan" />;
}