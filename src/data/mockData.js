// ============================================================
// MOCK DATA — OTT Platform (Real Movies)
// ============================================================

// --- Local movie asset imports ---
import duneImg from '../assets/movies/Dune.jpg';
import fightClubImg from '../assets/movies/Fight Club.jpg';
import greenMileImg from '../assets/movies/GreenMIle.jpg';
import hangoverImg from '../assets/movies/Hangover.jpg';
import inglouriousImg from '../assets/movies/Inglourious Basterds.jpg';
import killBillImg from '../assets/movies/KIllBill.jpg';
import martianImg from '../assets/movies/Martian.jpg';
import oldboyImg from '../assets/movies/Oldboy.jpg';
import parasiteImg from '../assets/movies/Parasite.jpg';
import schindlersImg from '../assets/movies/Schindlers List.jpg';
import shawshankImg from '../assets/movies/Shawshank.jpg';
import shutterImg from '../assets/movies/Shutter.jpg';
import allQuietImg from '../assets/movies/all quiet on the western front.jpg';

// --- Local TV Show Asset Imports ---
import betterCallSaulImg from '../assets/TV_Shows/BetterCallSaul.jpg';
import blackMirrorImg from '../assets/TV_Shows/black mirror.jpg';
import breakingBadImg from '../assets/TV_Shows/breaking bad.jpg';
import brooklyn99Img from '../assets/TV_Shows/brooklyn 99.jpg';
import chernobylImg from '../assets/TV_Shows/Chernobyl_2019_Miniseries.jpg';
import darkImg from '../assets/TV_Shows/Dark.jpg';
import friendsImg from '../assets/TV_Shows/Friends.jpg';
import theWireImg from '../assets/TV_Shows/TheWire.jpg';
import trueDetectiveImg from '../assets/TV_Shows/True_Detective_season_1.png';
import twoAndAHalfMenImg from '../assets/TV_Shows/two and a half men.jpg';
import youngSheldonImg from '../assets/TV_Shows/YoungSheldon.jpg';

// ============================================================

export const profiles = [
  { id: 1, name: "Alex", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex&backgroundColor=b6e3f4", color: "#4f46e5" },
  { id: 2, name: "Jamie", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Jamie&backgroundColor=ffdfbf", color: "#f97316" },
  { id: 3, name: "Sam", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sam&backgroundColor=c0aede", color: "#8b5cf6" },
  { id: 4, name: "Kids", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Kids&backgroundColor=d1d4f9", color: "#06b6d4" },
];

// ============================================================
// Featured Hero — The Shawshank Redemption
// ============================================================
export const featuredContent = {
  id: "shawshank",
  title: "The Shawshank Redemption",
  tagline: "Fear can hold you prisoner. Hope can set you free.",
  description:
    "Falsely convicted of murder, banker Andy Dufresne is sentenced to life at the brutal Shawshank State Penitentiary. Over two decades, he endures hardship, forges an unlikely friendship with Red, and refuses to let the walls extinguish his hope.",
  genre: ["Drama", "Classic"],
  rating: "R",
  year: 1994,
  seasons: null,
  duration: "2h 22m",
  match: 99,
  thumbnail: shawshankImg,
};

// ============================================================
// Continue Watching
// ============================================================
export const continueWatching = [
  {
    id: "dune-cw",
    title: "Dune",
    thumbnail: duneImg,
    progress: 62,
    episode: "Movie • 38 min left",
    genre: "Sci-Fi",
  },
  {
    id: "parasite-cw",
    title: "Parasite",
    thumbnail: parasiteImg,
    progress: 45,
    episode: "Movie • 1h 10m left",
    genre: "Thriller",
  },
  {
    id: "oldboy-cw",
    title: "Oldboy",
    thumbnail: oldboyImg,
    progress: 80,
    episode: "Movie • 24 min left",
    genre: "Mystery",
  },
  {
    id: "hangover-cw",
    title: "The Hangover",
    thumbnail: hangoverImg,
    progress: 30,
    episode: "Movie • 1h 10m left",
    genre: "Comedy",
  },
];

// ============================================================
// TV Shows Section
// ============================================================
export const tvShowsRow = {
  id: "tv-shows",
  label: "📺 Top TV Shows",
  items: [
    {
      id: "breaking-bad",
      title: "Breaking Bad",
      thumbnail: breakingBadImg,
      year: 2008,
      rating: "TV-MA",
      match: 99,
      genre: "Crime Drama",
      synopsis: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
      seasons: 5,
      duration: "5 Seasons",
    },
    {
      id: "better-call-saul",
      title: "Better Call Saul",
      thumbnail: betterCallSaulImg,
      year: 2015,
      rating: "TV-MA",
      match: 98,
      genre: "Crime Drama",
      synopsis: "The trials and tribulations of criminal lawyer Jimmy McGill in the years leading up to his fateful run-in with Walter White and Jesse Pinkman.",
      seasons: 6,
      duration: "6 Seasons",
    },
    {
      id: "the-wire",
      title: "The Wire",
      thumbnail: theWireImg,
      year: 2002,
      rating: "TV-MA",
      match: 99,
      genre: "Crime Drama",
      synopsis: "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.",
      seasons: 5,
      duration: "5 Seasons",
    },
    {
      id: "black-mirror",
      title: "Black Mirror",
      thumbnail: blackMirrorImg,
      year: 2011,
      rating: "TV-MA",
      match: 95,
      genre: "Sci-Fi Thriller",
      synopsis: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
      seasons: 6,
      duration: "6 Seasons",
    },
    {
      id: "chernobyl",
      title: "Chernobyl",
      thumbnail: chernobylImg,
      year: 2019,
      rating: "TV-MA",
      match: 97,
      genre: "Historical Drama",
      synopsis: "A dramatization of the true story of one of the worst man-made catastrophes in history, the 1986 nuclear accident in Chernobyl.",
      seasons: 1,
      duration: "1 Season",
    },
    {
      id: "dark",
      title: "Dark",
      thumbnail: darkImg,
      year: 2017,
      rating: "TV-MA",
      match: 94,
      genre: "Sci-Fi Mystery",
      synopsis: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
      seasons: 3,
      duration: "3 Seasons",
    },
    {
      id: "true-detective",
      title: "True Detective",
      thumbnail: trueDetectiveImg,
      year: 2014,
      rating: "TV-MA",
      match: 96,
      genre: "Crime Thriller",
      synopsis: "Seasonal anthology series in which police investigations unearth the personal and professional secrets of those involved, both within and outside the law.",
      seasons: 4,
      duration: "4 Seasons",
    },
    {
      id: "friends",
      title: "Friends",
      thumbnail: friendsImg,
      year: 1994,
      rating: "TV-14",
      match: 98,
      genre: "Sitcom",
      synopsis: "Follows the personal and professional lives of six twenty to thirty year-old friends living in the Manhattan borough of New York City.",
      seasons: 10,
      duration: "10 Seasons",
    },
    {
      id: "brooklyn-99",
      title: "Brooklyn Nine-Nine",
      thumbnail: brooklyn99Img,
      year: 2013,
      rating: "TV-14",
      match: 95,
      genre: "Sitcom",
      synopsis: "Comedy series following the exploits of Det. Jake Peralta and his diverse, lovable colleagues as they police the NYPD's 99th Precinct.",
      seasons: 8,
      duration: "8 Seasons",
    },
    {
      id: "young-sheldon",
      title: "Young Sheldon",
      thumbnail: youngSheldonImg,
      year: 2017,
      rating: "TV-PG",
      match: 90,
      genre: "Sitcom",
      synopsis: "Meet a child genius named Sheldon Cooper (already seen as an adult in The Big Bang Theory) and his family. Some unique challenges face Sheldon, who is socially impaired.",
      seasons: 7,
      duration: "7 Seasons",
    },
    {
      id: "two-and-a-half-men",
      title: "Two and a Half Men",
      thumbnail: twoAndAHalfMenImg,
      year: 2003,
      rating: "TV-14",
      match: 88,
      genre: "Sitcom",
      synopsis: "A hedonistic jingle writer's free-wheeling life comes to an abrupt halt when his brother and 10-year-old nephew move into his beach-front house.",
      seasons: 12,
      duration: "12 Seasons",
    }
  ]
};

// ============================================================
// Content Rows — using real movie data
// ============================================================
export const contentRows = [
  tvShowsRow,
  {
    id: "trending",
    label: "🔥 Trending Now",
    items: [
      {
        id: "dune",
        title: "Dune",
        thumbnail: duneImg,
        year: 2021,
        rating: "PG-13",
        match: 97,
        genre: "Sci-Fi",
        synopsis:
          "Paul Atreides, a gifted young man born into a great destiny, must travel to the most dangerous planet in the universe to ensure the future of his family and people.",
        duration: "2h 35m",
      },
      {
        id: "parasite",
        title: "Parasite",
        thumbnail: parasiteImg,
        year: 2019,
        rating: "R",
        match: 99,
        genre: "Thriller",
        synopsis:
          "The impoverished Kim family schemes their way into the wealthy Park household, setting off a chain of darkly comic and shocking events that expose deep class divisions.",
        duration: "2h 12m",
      },
      {
        id: "fight-club",
        title: "Fight Club",
        thumbnail: fightClubImg,
        year: 1999,
        rating: "R",
        match: 96,
        genre: "Drama",
        synopsis:
          "An insomniac office worker and a soap salesman form an underground fight club that evolves into something far more anarchic and destructive than either man imagined.",
        duration: "2h 19m",
      },
      {
        id: "inglourious",
        title: "Inglourious Basterds",
        thumbnail: inglouriousImg,
        year: 2009,
        rating: "R",
        match: 95,
        genre: "War",
        synopsis:
          "In Nazi-occupied France, a Jewish cinema owner and a band of Jewish-American soldiers independently plot audacious assassination attempts against the Third Reich's leadership.",
        duration: "2h 33m",
      },
      {
        id: "all-quiet",
        title: "All Quiet on the Western Front",
        thumbnail: allQuietImg,
        year: 2022,
        rating: "R",
        match: 94,
        genre: "War Drama",
        synopsis:
          "A young German soldier volunteers for WWI with dreams of glory, only to face the unrelenting horror of trench warfare and the senseless cost of conflict.",
        duration: "2h 28m",
      },
      {
        id: "oldboy",
        title: "Oldboy",
        thumbnail: oldboyImg,
        year: 2003,
        rating: "NR",
        match: 93,
        genre: "Mystery",
        synopsis:
          "After being mysteriously imprisoned for 15 years, Oh Dae-su is released with no explanation and obsessively hunts for the truth behind his captivity in a web of dark secrets.",
        duration: "2h 00m",
      },
    ],
  },
  {
    id: "critically-acclaimed",
    label: "🏆 Critically Acclaimed",
    items: [
      {
        id: "schindlers-list",
        title: "Schindler's List",
        thumbnail: schindlersImg,
        year: 1993,
        rating: "R",
        match: 99,
        genre: "Historical Drama",
        synopsis:
          "German industrialist Oskar Schindler transforms from profit-seeker to humanitarian savior, rescuing over 1,100 Jewish lives from the Holocaust at great personal risk.",
        duration: "3h 15m",
      },
      {
        id: "shawshank",
        title: "The Shawshank Redemption",
        thumbnail: shawshankImg,
        year: 1994,
        rating: "R",
        match: 99,
        genre: "Drama",
        synopsis:
          "Falsely convicted banker Andy Dufresne endures decades of prison brutality at Shawshank, sustained by an unbreakable friendship with Red and an undying belief in hope.",
        duration: "2h 22m",
      },
      {
        id: "green-mile",
        title: "The Green Mile",
        thumbnail: greenMileImg,
        year: 1999,
        rating: "R",
        match: 97,
        genre: "Fantasy Drama",
        synopsis:
          "Death row officer Paul Edgecomb encounters gentle giant John Coffey, a condemned man gifted with inexplicable healing powers, forcing him to question guilt, justice, and mercy.",
        duration: "3h 09m",
      },
      {
        id: "parasite-acc",
        title: "Parasite",
        thumbnail: parasiteImg,
        year: 2019,
        rating: "R",
        match: 99,
        genre: "Dark Comedy",
        synopsis:
          "Bong Joon-ho's Oscar-winning masterpiece about class warfare, deception, and the devastating consequences of greed in modern Seoul.",
        duration: "2h 12m",
      },
      {
        id: "all-quiet-acc",
        title: "All Quiet on the Western Front",
        thumbnail: allQuietImg,
        year: 2022,
        rating: "R",
        match: 93,
        genre: "Anti-War Epic",
        synopsis:
          "Germany's shattering Netflix Oscar-winner follows Paul Bäumer from patriotic enlistment to the brutal trenches, where heroism quickly dissolves into survival.",
        duration: "2h 28m",
      },
      {
        id: "oldboy-acc",
        title: "Oldboy",
        thumbnail: oldboyImg,
        year: 2003,
        rating: "NR",
        match: 92,
        genre: "Neo-Noir",
        synopsis:
          "Park Chan-wook's revenge thriller, winner of the Grand Prix at Cannes, weaves a labyrinthine tale of identity, obsession, and devastating revelation.",
        duration: "2h 00m",
      },
    ],
  },
  {
    id: "action-thrillers",
    label: "💥 Action & Thrillers",
    items: [
      {
        id: "kill-bill",
        title: "Kill Bill: Volume 1",
        thumbnail: killBillImg,
        year: 2003,
        rating: "R",
        match: 96,
        genre: "Martial Arts",
        synopsis:
          "After waking from a four-year coma, The Bride unleashes a razor-sharp vendetta against the assassins who betrayed her, tearing through enemies with breathtaking, blood-soaked style.",
        duration: "1h 51m",
      },
      {
        id: "inglourious-action",
        title: "Inglourious Basterds",
        thumbnail: inglouriousImg,
        year: 2009,
        rating: "R",
        match: 95,
        genre: "Action",
        synopsis:
          "Tarantino's electrifying WWII epic pits Jewish-American soldiers against the Nazi high command in a collision of audacious schemes, razor-sharp dialogue, and explosive violence.",
        duration: "2h 33m",
      },
      {
        id: "shutter-island",
        title: "Shutter Island",
        thumbnail: shutterImg,
        year: 2010,
        rating: "R",
        match: 92,
        genre: "Psychological Thriller",
        synopsis:
          "U.S. Marshal Teddy Daniels investigates the disappearance of a patient from a remote island asylum, only to find his grip on reality unraveling with terrifying consequences.",
        duration: "2h 18m",
      },
      {
        id: "martian",
        title: "The Martian",
        thumbnail: martianImg,
        year: 2015,
        rating: "PG-13",
        match: 94,
        genre: "Sci-Fi",
        synopsis:
          "Stranded alone on Mars after a fierce storm, astronaut Mark Watney must use science, ingenuity, and stubborn optimism to survive while NASA races to bring him home.",
        duration: "2h 24m",
      },
      {
        id: "fight-club-action",
        title: "Fight Club",
        thumbnail: fightClubImg,
        year: 1999,
        rating: "R",
        match: 96,
        genre: "Thriller",
        synopsis:
          "When a frustrated office drone meets the anarchic Tyler Durden, their underground fight club becomes a global movement that spirals dangerously out of control.",
        duration: "2h 19m",
      },
      {
        id: "dune-action",
        title: "Dune",
        thumbnail: duneImg,
        year: 2021,
        rating: "PG-13",
        match: 97,
        genre: "Epic Sci-Fi",
        synopsis:
          "Denis Villeneuve's breathtaking adaptation of Frank Herbert's classic — a young nobleman's destiny collides with imperial treachery on a desert world of limitless power.",
        duration: "2h 35m",
      },
    ],
  },
  {
    id: "mind-benders",
    label: "🧠 Mind-Bending Cinema",
    items: [
      {
        id: "shutter",
        title: "Shutter Island",
        thumbnail: shutterImg,
        year: 2010,
        rating: "R",
        match: 91,
        genre: "Psychological Thriller",
        synopsis:
          "Scorsese's labyrinthine mystery traps a federal marshal inside an island asylum where every clue leads deeper into an abyss of paranoia and shattered truth.",
        duration: "2h 18m",
      },
      {
        id: "fight-club-mb",
        title: "Fight Club",
        thumbnail: fightClubImg,
        year: 1999,
        rating: "R",
        match: 96,
        genre: "Psychological Drama",
        synopsis:
          "A masterclass in unreliable narration — Fincher's blistering film builds to one of cinema's most shocking and intellectually devastating twists.",
        duration: "2h 19m",
      },
      {
        id: "parasite-mb",
        title: "Parasite",
        thumbnail: parasiteImg,
        year: 2019,
        rating: "R",
        match: 98,
        genre: "Dark Comedy",
        synopsis:
          "Just when you think you understand Bong Joon-ho's Oscar-winning thriller, it flips into a different genre entirely — and the result is unforgettable.",
        duration: "2h 12m",
      },
      {
        id: "oldboy-mb",
        title: "Oldboy",
        thumbnail: oldboyImg,
        year: 2003,
        rating: "NR",
        match: 93,
        genre: "Mystery Thriller",
        synopsis:
          "A labyrinthine mystery of captivity, identity, and revenge that leads to one of the most shocking and emotionally devastating revelations in film history.",
        duration: "2h 00m",
      },
      {
        id: "green-mile-mb",
        title: "The Green Mile",
        thumbnail: greenMileImg,
        year: 1999,
        rating: "R",
        match: 97,
        genre: "Supernatural Drama",
        synopsis:
          "Is John Coffey a murderer or a miracle? Darabont's haunting adaptation of King's novella invites you to question everything you believe about justice and the miraculous.",
        duration: "3h 09m",
      },
      {
        id: "hangover-mb",
        title: "The Hangover",
        thumbnail: hangoverImg,
        year: 2009,
        rating: "R",
        match: 88,
        genre: "Mystery Comedy",
        synopsis:
          "Three groomsmen wake up in a wrecked Vegas hotel suite with no memory of the night before. Piecing together the chaos before the wedding becomes a wild, hilarious mystery.",
        duration: "1h 40m",
      },
    ],
  },
];

export const genres = [
  { id: "action", label: "Action & Adventure", color: "#ef4444", img: killBillImg },
  { id: "scifi", label: "Sci-Fi & Fantasy", color: "#8b5cf6", img: duneImg },
  { id: "drama", label: "Drama", color: "#f59e0b", img: shawshankImg },
  { id: "thriller", label: "Thriller", color: "#06b6d4", img: shutterImg },
  { id: "comedy", label: "Comedy", color: "#10b981", img: hangoverImg },
  { id: "horror", label: "Horror", color: "#dc2626", img: oldboyImg },
  { id: "romance", label: "Romance", color: "#ec4899", img: greenMileImg },
  { id: "documentary", label: "Documentary", color: "#84cc16", img: allQuietImg },
  { id: "crime", label: "Crime & Mystery", color: "#6366f1", img: parasiteImg },
  { id: "war", label: "War & History", color: "#f97316", img: inglouriousImg },
];

export const allContent = contentRows.flatMap((r) => r.items);

export const notifications = [
  { id: 1, text: "Dune: Part Two is now available to stream", time: "2h ago", read: false },
  { id: 2, text: "Parasite — Director's Cut announced!", time: "1d ago", read: false },
  { id: 3, text: "Your watchlist has new recommendations", time: "3d ago", read: true },
  { id: 4, text: "Schindler's List won 3 new awards this decade", time: "5d ago", read: true },
];
