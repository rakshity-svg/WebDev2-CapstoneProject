import Explore from './Explore';

// Thin wrapper — renders the Explore page locked to TV Shows filter
export default function TVShows() {
  return <Explore initialType="TV Shows" pageTitle="TV Shows" pageSubtitle="Binge-worthy series, limited runs & more" />;
}
