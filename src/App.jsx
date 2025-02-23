
import { useState, useEffect } from 'react'
import PlayPage from './PlayPage'
import StartPage from './StartPage'
import BackGround from '../assets/backgroundCFO.mp4'
import './App.css'

const fetchCharacter = async () => {
  try {
    // Generate exactly 15 random unique IDs
    const randomIds = new Set();
    while (randomIds.size < 15) {
      randomIds.add(Math.floor(Math.random() * 686) + 1);
    }

    // Fetch all characters in a single request
    const response = await fetch(`https://rickandmortyapi.com/api/character/${[...randomIds].join(",")}`);
    if (!response.ok) throw new Error("Failed to fetch");

    const results = await response.json();
    const characters = Array.isArray(results) ? results : [results];

    // Filter by name length (<12 characters)
    return characters.filter(c => c.name.replace(/\s+/g, "").length < 12).slice(0, 15);

  } catch (error) {
    console.error(error);
    return [];
  }
};

function App() {
  const [mode, setMode] = useState('');
  const [startPage, setPage] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setPage((prev) => !prev); // Switch page after transition
        setIsTransitioning(false); // End transition effect
      }, 500); // Delay matches CSS animation
  
      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [isTransitioning]); 

  const switchPage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true); // Start transition
    }
  };
  
  const chooseMode = async (selectedMode) => {

    const characters = await fetchCharacter();

    if (startPage) {
      switchPage();
    }
    
    setMode(selectedMode);
    setCharacters(characters);

  };
  

  return (
    <>
      <video autoPlay loop muted id='myVideo'>
        <source src={BackGround} type='video/mp4'></source>
      </video>
      <div className={`page-container ${isTransitioning ? 'zoom-out' : 'zoom-in'}`}>
        {startPage ? (
          <StartPage switchPage={switchPage} chooseMode={chooseMode} />
        ) : (
          <PlayPage switchPage={switchPage} chooseMode={chooseMode} mode={mode} characters={characters} />
        )}
      </div>
    </>
  );
}

export default App
