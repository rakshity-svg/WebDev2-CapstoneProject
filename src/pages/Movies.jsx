import Explore from './Explore';

// Thin wrapper — renders the Explore page locked to Movies filter
export default function Movies() {
  return <Explore initialType="Movies" pageTitle="Movies" pageSubtitle="Blockbusters, indie gems & everything in between" />;
}
