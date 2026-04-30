import { createContext, useContext, useState } from 'react';
import { profiles } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeProfile, setActiveProfile] = useState(null);
  const [myList, setMyList] = useState([]);

  const toggleMyList = (item) => {
    setMyList((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const isInMyList = (id) => myList.some((i) => i.id === id);

  return (
    <AppContext.Provider value={{ activeProfile, setActiveProfile, myList, toggleMyList, isInMyList, profiles }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
