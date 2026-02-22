import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Terminal from './Terminal';
import MusicPlayer from './MusicPlayer';
import SnakeGame from './SnakeGame';
import Popup from './Popup';

// Import your logo
import logo from './logo.png';
import meImg from './me.png';      
import aboutImg from './about.png'; 

// Import the specific icons
import { FaGithub, FaLinkedin, FaTerminal, FaMusic, FaGamepad } from 'react-icons/fa';
import { 
  SiMongodb, SiReact, SiExpress, SiNodedotjs, SiDocker, SiN8N, 
  SiPython, SiPytorch, SiGit, SiGithub, SiPostgresql, SiHtml5, 
  SiCss3, SiJavascript, SiC, SiCplusplus, SiGnubash, SiArchlinux,
  SiLeetcode
} from 'react-icons/si';

const playlist = [
  { id: 1, title: 'Chill Lofi Beat', src: '/music/track1.mp3' },
  { id: 2, title: 'Focus Flow', src: '/music/track2.mp3' },
  { id: 3, title: 'Late Night Coding', src: '/music/track3.mp3' },
];

function App() {
  // --- LOADING STATE & LOGIC ---
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Initializing RoboShep OS...");

  useEffect(() => {
    const imagesToPreload = [logo, meImg, aboutImg];
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === imagesToPreload.length) {
        setLoadingText("System Ready.");
        // Short delay so the user actually sees the "System Ready" message
        setTimeout(() => setIsLoading(false), 600);
      }
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      // Trigger check whether it loads successfully or fails
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; 
    });

    // Fallback: If network is incredibly slow, force load after 3 seconds
    const safetyTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(safetyTimeout);
  }, []);
  // -----------------------------

  const [activePopup, setActivePopup] = useState(null);

  // --- AUDIO STATE & LOGIC ---
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => console.log("Autoplay prevented:", error));
      }
    }
  }, [currentTrackIndex, isPlaying]);
  // ---------------------------

  const closePopup = () => setActivePopup(null);

  // --- RENDER LOADING SCREEN ---
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1e1e1e', // Dark terminal-like background
        color: '#a9dc76', // Hacker/Terminal green
        fontFamily: 'monospace',
        fontSize: '1.5rem'
      }}>
        <div className="blinking-cursor-container" style={{ display: 'flex', alignItems: 'center' }}>
          <span>{loadingText}</span>
          <span style={{
            display: 'inline-block',
            width: '10px',
            height: '1.2em',
            backgroundColor: '#a9dc76',
            marginLeft: '5px',
            animation: 'blink 1s step-end infinite'
          }} />
        </div>
        <style>
          {`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}
        </style>
      </div>
    );
  }

  // --- RENDER MAIN APP ---
  return (
    <div className="App">
      {/* Persistent Audio Element */}
      <audio 
        ref={audioRef} 
        src={playlist[currentTrackIndex].src} 
        onEnded={playNext} 
      />

      {/* 1. Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Logo" className="nav-logo" />
        </div>
        <div className="nav-right">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
        </div>
      </nav>

      <main className="main-content">
        
        {/* 2. Home Section */}
        <section id="home" className="section split-section">
          <div className="text-content">
            <h1>Hi, I'm Anant Srivastava</h1>
            <h3>Or you may call me RoboShep</h3>
            <p>
              I am a Software Engineer focused on building robust full-stack applications and 
              exploring the mechanics of artificial intelligence. Welcome to my interactive space.
            </p>
          </div>
          <div className="image-content right-align">
            <div className="placeholder-img-container">
              <img src={meImg} alt="Profile" className="profile-img" />
            </div>
          </div>
        </section>

        {/* 3. About Section */}
        <section id="about" className="section split-section">
          <div className="image-content left-align">
             <div className="placeholder-img-container">
              <img src={aboutImg} alt="About" className="profile-img" />
            </div>
          </div>
          
          <div className="text-content">
            <h2>About Me</h2>
            <p>
              My journey in tech often revolves around optimizing complex systems and game AI, digging deep into 
              everything from low-level algorithms to neural networks like PPOs and LSTMs. Whether I'm designing 
              state machines, working with theoretical models like Turing machines, or building seamless web interfaces 
              with React and Express, I love bridging the gap between raw logic and user experience.
            </p>
          </div>
        </section>

        {/* 4. Skills Section */}
        <section id="skills" className="section">
          <h2>Skills</h2>
          <div className="skills-grid">
            <button className="skill-btn"><SiMongodb /> MongoDB</button>
            <button className="skill-btn"><SiReact /> React</button>
            <button className="skill-btn"><SiExpress /> ExpressJS</button>
            <button className="skill-btn"><SiNodedotjs /> NodeJS</button>
            <button className="skill-btn"><SiDocker /> Docker</button>
            <button className="skill-btn"><SiN8N /> n8n</button>
            <button className="skill-btn"><SiPython /> Python</button>
            <button className="skill-btn"><SiPytorch /> PyTorch</button>
            <button className="skill-btn"><SiGit /> Git</button>
            <button className="skill-btn"><SiGithub /> GitHub</button>
            <button className="skill-btn"><SiPostgresql /> PostgreSQL</button>
            <button className="skill-btn"><SiHtml5 /> HTML</button>
            <button className="skill-btn"><SiCss3 /> CSS</button>
            <button className="skill-btn"><SiJavascript /> JS</button>
            <button className="skill-btn"><SiC /> C</button>
            <button className="skill-btn"><SiCplusplus /> C++</button>
            <button className="skill-btn"><SiGnubash /> Bash</button>
            <button className="skill-btn"><SiArchlinux /> Arch Linux</button>
          </div>
        </section>

        {/* 5. Projects Section */}
        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>Project S.A.R.S</h3>
              <p>It is a self trained Neural network in which a human competes against an AI trained by me</p>
            </div>
            <div className="project-card">
              <h3>Project Carpet</h3>
              <p>A World generator using Perlin noise to generate a pre determined world</p>
            </div>
            <div className="project-card">
              <h3>Project HumanVAI</h3>
              <p>A human races against a perfect AI (In Progress)</p>
            </div>
            <div className="project-card">
              <h3>Project LegalSLM</h3>
              <p>An SLM trained on the Indian Legal burecracy (In Progress)</p>
            </div>
          </div>
          <div style={{ height: '100px' }}></div> 
        </section>
      </main>

      {/* Fixed Creamy White Frame & Integrated Docks */}
      <div className="page-frame">
        {/* LEFT DOCK: External Links */}
        <div className="left-dock">
          <a href="https://github.com/Robo-shep" target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/anant-srivastava-023585329/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://leetcode.com/u/Roboshep/" target="_blank" rel="noopener noreferrer" title="LeetCode">
            <SiLeetcode />
          </a>
        </div>

        {/* RIGHT DOCK: Interactive Modules */}
        <div className="floating-dock">
          <button onClick={() => setActivePopup('music')} title="Music Player">
            <FaMusic />
          </button>
          <button onClick={() => setActivePopup('terminal')} title="Terminal">
            <FaTerminal />
          </button>
          <button onClick={() => setActivePopup('snake')} title="Snake Game">
            <FaGamepad />
          </button>
        </div>
      </div>

      {/* Popups */}
      {activePopup === 'music' && (
        <Popup title="Music Player" onClose={closePopup}>
          <MusicPlayer 
            playlist={playlist}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            playNext={playNext}
            playPrev={playPrev}
            onTrackSelect={handleTrackSelect}
          />
        </Popup>
      )}

      {activePopup === 'terminal' && (
        <Popup title="Interactive Terminal" onClose={closePopup}>
          <Terminal />
        </Popup>
      )}

      {activePopup === 'snake' && (
        <Popup title="Snake Game" onClose={closePopup}>
          <SnakeGame />
        </Popup>
      )}
    </div>
  );
}

export default App;