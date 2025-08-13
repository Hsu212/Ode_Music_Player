import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- ICONS ---
const PlayIcon = ({size = 24}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>);
const PauseIcon = ({size = 24}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>);
const SkipBackIcon = ({size=32}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>);
const SkipForwardIcon = ({size=32}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>);
const SpeakerIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>);
const MutedSpeakerIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>);
const MoonIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>);
const SunIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>);
const SoundWaveIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 10h3v4H3z M8 6h3v12H8z M13 2h3v20h-3z M18 6h3v12h-3z"></path></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const XIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const ChevronDownIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>);

// --- HELPER & UI COMPONENTS ---
const LoadingIndicator = ({ text = "Loading Music..." }) => (
    <div className="status-indicator">
        <div className="spinner"></div>
        <p>{text}</p>
    </div>
);

const ErrorDisplay = ({ message }) => (
    <div className="status-indicator error">
        <p>Error: {message}</p>
    </div>
);

const MusicSection = ({ title, songs, onSongSelect, currentSong, isPlaying }) => (
  <section className="music-section">
    <h2 className="section-title">{title}</h2>
    <div className="song-carousel">
      {songs.map((song) => (
        <div key={song.id} className={`song-card ${currentSong?.id === song.id ? 'active' : ''}`} onClick={() => onSongSelect(song.id)}>
          <div className="card-artwork-container">
            <img src={song.albumArt} alt={song.title} className="song-album-art" />
            <div className="card-play-button">
                {currentSong?.id === song.id && isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
            </div>
            {currentSong?.id === song.id && isPlaying && <div className="sound-wave-overlay"><SoundWaveIcon /></div>}
          </div>
          <div className="song-details">
            <span className="song-title">{song.title}</span>
            <span className="song-artist">{song.artist}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const FullScreenPlayer = ({ isOpen, onClose, currentSong, isPlaying, progress, duration, togglePlayPause, playNext, playPrevious, handleProgressBarChange, formatTime, volume, handleVolumeChange }) => {
    if (!currentSong) return null;
    return (
        <div className={`player-modal-overlay ${isOpen ? 'visible' : ''}`}>
            <div className="player-modal-background" style={{ backgroundImage: `url(${currentSong.albumArt})` }} />
            <div className="player-modal-content">
                <button className="player-modal-close" onClick={onClose}><ChevronDownIcon /></button>
                <div className="player-modal-artwork"><img src={currentSong.albumArt} alt={currentSong.title} /></div>
                <div className="player-modal-details">
                    <h2 className="player-modal-title">{currentSong.title}</h2>
                    <p className="player-modal-artist">{currentSong.artist}</p>
                </div>
                <div className="player-modal-progress">
                    <div className="progress-container">
                        <span className="progress-time">{formatTime(duration * (progress / 100))}</span>
                        <input type="range" min="0" max="100" value={progress} onChange={handleProgressBarChange} className="progress-bar" />
                        <span className="progress-time">{formatTime(duration)}</span>
                    </div>
                </div>
                <div className="player-modal-controls">
                    <button onClick={playPrevious} className="control-button"><SkipBackIcon /></button>
                    <button onClick={togglePlayPause} className="play-pause-button large">{isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}</button>
                    <button onClick={playNext} className="control-button"><SkipForwardIcon /></button>
                </div>
                 <div className="player-modal-volume">
                    <div className="volume-container">
                         <button className="control-button" onClick={() => handleVolumeChange({target: {value: volume > 0 ? 0 : 1}})}>{volume > 0 ? <SpeakerIcon /> : <MutedSpeakerIcon />}</button>
                         <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-bar" />
                     </div>
                </div>
            </div>
        </div>
    );
};

const ProfileModal = ({ isOpen, onClose, isAuthenticated, onLogin, onLogout }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(); // Simulate login
        onClose();
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}><XIcon /></button>
                <h2 className="modal-title">{isAuthenticated ? 'Profile' : (isLoginView ? 'Login' : 'Create Account')}</h2>
                {isAuthenticated ? (
                    <div className="profile-view">
                        <p>Welcome, User!</p>
                        <button className="form-button">Change Password</button>
                        <button className="form-button secondary" onClick={onLogout}>Logout</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required className="form-input" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required className="form-input" />
                        </div>
                        {!isLoginView && (
                            <div className="form-group">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" required className="form-input" />
                            </div>
                        )}
                        <button type="submit" className="form-button">{isLoginView ? 'Login' : 'Create Account'}</button>
                        <p className="form-switch">
                            {isLoginView ? "Don't have an account?" : "Already have an account?"}
                            <button type="button" onClick={() => setIsLoginView(!isLoginView)}>
                                {isLoginView ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

const SettingsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}><XIcon /></button>
                <h2 className="modal-title">Settings</h2>
                <div className="setting-item">
                    <label htmlFor="language">Language</label>
                    <select id="language" className="form-input">
                        <option>English</option>
                        <option>Español</option>
                        <option>Français</option>
                    </select>
                </div>
                <div className="setting-item">
                    <label>Download Quality</label>
                    <div className="radio-group">
                        <label><input type="radio" name="quality" value="wifi" defaultChecked /> Wi-Fi Only</label>
                        <label><input type="radio" name="quality" value="always" /> Always</label>
                    </div>
                </div>
                <div className="setting-item">
                    <label>Save Data</label>
                    <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
                <button className="form-button" onClick={onClose}>Save Changes</button>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
function App() {
  // State management
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Feature states
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // API states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const audioRef = useRef(null);
  const currentSong = currentSongIndex !== null ? songs[currentSongIndex] : null;

  // --- API & DATA ---
  const JAMENDO_CLIENT_ID = '2838a1f3'; 

  const formatJamendoData = (tracks) => tracks.filter(track => track.audio).map(track => ({
        id: track.id,
        title: track.name,
        artist: track.artist_name,
        albumArt: track.image.replace(/_200.jpg$/, '_600.jpg'),
        url: track.audio
    }));

  useEffect(() => {
    const fetchInitialSongs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=30&order=popularity_week&imagesize=600`);
        if (!response.ok) throw new Error('Failed to fetch popular songs.');
        const data = await response.json();
        setSongs(formatJamendoData(data.results));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialSongs();
  }, []);

   useEffect(() => {
        const handleSearch = async () => {
            if (searchTerm.trim().length < 3) {
                setSearchResults([]);
                return;
            }
            setIsSearching(true);
            try {
                const response = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&search=${searchTerm}&imagesize=600`);
                if (!response.ok) throw new Error('Search failed.');
                const data = await response.json();
                setSearchResults(formatJamendoData(data.results));
            } catch (err) {
                console.error(err);
            } finally {
                setIsSearching(false);
            }
        };
        const debounceSearch = setTimeout(() => { handleSearch(); }, 500);
        return () => clearTimeout(debounceSearch);
    }, [searchTerm]);

  const topCharts = useMemo(() => songs.slice(0, 10), [songs]);
  const latestReleases = useMemo(() => songs.slice(10, 20), [songs]);
  const recommendations = useMemo(() => songs.slice(20, 30), [songs]);
  
  // --- Handlers ---
  const playSongById = (songId) => {
    const allAvailableSongs = [...songs, ...searchResults.filter(sr => !songs.some(s => s.id === sr.id))];
    if(allAvailableSongs.length !== songs.length) {
        setSongs(allAvailableSongs);
    }
    const songIndex = allAvailableSongs.findIndex(song => song.id === songId);
    if (songIndex !== -1) {
      if (currentSongIndex === songIndex) {
          togglePlayPause();
      } else {
          setCurrentSongIndex(songIndex);
          setIsPlaying(true);
      }
    }
  };

  const togglePlayPause = () => { if (currentSong) setIsPlaying(prev => !prev); };
  const playNext = () => { if (songs.length === 0) return; setCurrentSongIndex(prev => (prev + 1) % songs.length); setIsPlaying(true); };
  const playPrevious = () => { if (songs.length === 0) return; setCurrentSongIndex(prev => (prev - 1 + songs.length) % songs.length); setIsPlaying(true);};
  const handleTimeUpdate = () => { const audio = audioRef.current; if (audio && !isNaN(audio.duration)) setProgress((audio.currentTime / audio.duration) * 100);};
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration);
  const handleProgressBarChange = (e) => { const audio = audioRef.current; audio.currentTime = (e.target.value / 100) * audio.duration; setProgress(e.target.value);};
  const handleVolumeChange = (e) => { const newVolume = parseFloat(e.target.value); audioRef.current.volume = newVolume; setVolume(newVolume);};
  const formatTime = (time) => { if (isNaN(time) || time === 0) return "0:00"; const minutes = Math.floor(time / 60); const seconds = Math.floor(time % 60); return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;};
  
  // --- Effects ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!currentSong) return;
    if (audio.src !== currentSong.url) {
      audio.src = currentSong.url;
      audio.load();
    }
    if (isPlaying) { audio.play().catch(console.error); } else { audio.pause(); }
  }, [isPlaying, currentSong]);

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme);}, [theme]);
  
  // --- Render Logic ---
  const renderMainContent = () => {
      if (isLoading) return <LoadingIndicator />;
      if (error) return <ErrorDisplay message={error} />;
      if (searchTerm) {
          return isSearching 
              ? <LoadingIndicator text="Searching..." /> 
              : <MusicSection title="Search Results" songs={searchResults} onSongSelect={playSongById} currentSong={currentSong} isPlaying={isPlaying} />;
      }
      return (
        <>
          <MusicSection title="Top Charts" songs={topCharts} onSongSelect={playSongById} currentSong={currentSong} isPlaying={isPlaying} />
          <MusicSection title="Latest Releases" songs={latestReleases} onSongSelect={playSongById} currentSong={currentSong} isPlaying={isPlaying} />
          <MusicSection title="Recommended For You" songs={recommendations} onSongSelect={playSongById} currentSong={currentSong} isPlaying={isPlaying} />
        </>
      );
  }

  return (
    <>
      <style>{`
        /* Base & Theme Styles */
        :root { --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; --transition-speed: 0.3s; --transition-speed-fast: 0.2s; }
        [data-theme='dark'] { --bg-primary: #121212; --bg-secondary: #1e1e1e; --bg-tertiary: #2a2a2a; --bg-modal: #282828; --text-primary: #ffffff; --text-secondary: #b3b3b3; --border-color: #333333; --accent-color: #1DB954; --accent-color-light: rgba(29, 185, 84, 0.2); --hover-bg: #282828; --shadow-color: rgba(0, 0, 0, 0.5); }
        [data-theme='light'] { --bg-primary: #f5f5f7; --bg-secondary: #ffffff; --bg-tertiary: #e5e5e5; --bg-modal: #ffffff; --text-primary: #1d1d1f; --text-secondary: #515154; --border-color: #d2d2d7; --accent-color: #007aff; --accent-color-light: rgba(0, 122, 255, 0.1); --hover-bg: #e8e8e8; --shadow-color: rgba(0, 0, 0, 0.1); }
        body { margin: 0; font-family: var(--font-family); background-color: var(--bg-primary); color: var(--text-primary); transition: background-color var(--transition-speed), color var(--transition-speed); }
        
        /* Layout & Sidebar */
        .app-container { display: grid; grid-template-columns: 240px 1fr; grid-template-rows: 1fr auto; height: 100vh; overflow: hidden; }
        .sidebar { grid-row: 1 / 2; background-color: var(--bg-secondary); padding: 1.5rem; border-right: 1px solid var(--border-color); display: flex; flex-direction: column; transition: background-color var(--transition-speed); }
        .main-content { grid-row: 1 / 2; padding: 2rem; overflow-y: auto; display: flex; flex-direction: column; gap: 2rem; }
        .sidebar-header { margin-bottom: 2rem; } .sidebar-logo { font-weight: 700; font-size: 1.25rem; } .sidebar-actions { display: flex; gap: 0.5rem; margin-top: auto; } .sidebar-button { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 0.5rem; border-radius: 50%; transition: all var(--transition-speed-fast); } .sidebar-button:hover { background-color: var(--hover-bg); color: var(--text-primary); } .sidebar-nav ul { list-style: none; padding: 0; margin: 0; } .sidebar-nav li a { display: block; padding: 0.75rem 0; color: var(--text-secondary); text-decoration: none; font-weight: 500; } .sidebar-nav li a:hover { color: var(--text-primary); }

        /* Search & Status Indicators */
        .search-bar-container { position: relative; } .search-icon { position: absolute; top: 50%; left: 1rem; transform: translateY(-50%); color: var(--text-secondary); } .search-input { width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-size: 1rem; transition: all var(--transition-speed); } .search-input:focus { outline: none; border-color: var(--accent-color); }
        .status-indicator { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center; color: var(--text-secondary); }
        .status-indicator.error p { color: #e53e3e; } .status-indicator p { margin-top: 1rem; font-weight: 500; }

        /* Music Carousel */
        .music-section { min-height: 320px; } .section-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; }
        .song-carousel { display: flex; overflow-x: auto; gap: 1.5rem; padding: 0.5rem 0 1.5rem 0; scrollbar-width: none; -ms-overflow-style: none; }
        .song-carousel::-webkit-scrollbar { display: none; }
        .song-card { width: 180px; flex-shrink: 0; cursor: pointer; transition: transform var(--transition-speed-fast); } .song-card:hover { transform: scale(1.03); }
        .card-artwork-container { position: relative; margin-bottom: 0.75rem; } .song-album-art { width: 100%; height: 180px; border-radius: 8px; object-fit: cover; display: block; box-shadow: 0 4px 15px var(--shadow-color); }
        .card-play-button { position: absolute; bottom: 0.75rem; right: 0.75rem; background-color: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); border-radius: 50%; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; color: white; opacity: 0; transform: translateY(10px); transition: all 0.3s ease; }
        .song-card:hover .card-play-button { opacity: 1; transform: translateY(0); } .song-card.active .card-play-button { opacity: 1; transform: translateY(0); color: var(--accent-color); }
        .song-details { display: flex; flex-direction: column; } .song-title { font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .song-card.active .song-title { color: var(--accent-color); } .song-artist { font-size: 0.875rem; color: var(--text-secondary); }
        .sound-wave-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--accent-color-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--accent-color); }

        /* Footer Mini-Player */
        .footer-player { grid-column: 1 / 3; grid-row: 2 / 3; background-color: var(--bg-secondary); border-top: 1px solid var(--border-color); display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: center; padding: 0 1.5rem; height: 90px; transition: background-color var(--transition-speed); }
        .current-track-info { display: flex; align-items: center; gap: 1rem; cursor: pointer; border-radius: 8px; padding: 4px; transition: background-color var(--transition-speed-fast); } .current-track-info:hover { background-color: var(--hover-bg); }
        .footer-album-art { width: 56px; height: 56px; border-radius: 6px; } .footer-song-details { display: flex; flex-direction: column; } .footer-song-title { font-weight: 600; } .footer-song-artist { font-size: 0.875rem; color: var(--text-secondary); }
        .footer-controls { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; } .controls-container { display: flex; align-items: center; gap: 1rem; } .control-button, .play-pause-button { background: none; border: none; color: var(--text-secondary); cursor: pointer; transition: all var(--transition-speed-fast); } .control-button:hover, .play-pause-button:hover { color: var(--text-primary); } .play-pause-button { background-color: var(--text-primary); color: var(--bg-secondary); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; } .play-pause-button:hover { transform: scale(1.05); }
        .progress-container { display: flex; align-items: center; gap: 0.75rem; width: 100%; max-width: 500px; } .progress-time { font-size: 0.75rem; color: var(--text-secondary); min-width: 35px; text-align: center;}
        input[type="range"] { -webkit-appearance: none; width: 100%; background: transparent; } input[type="range"]:focus { outline: none; } input[type="range"]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${progress}%, var(--bg-tertiary) ${progress}%, var(--bg-tertiary) 100%); border-radius: 3px; } input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 14px; width: 14px; border-radius: 50%; background: var(--text-primary); cursor: pointer; margin-top: -5px; transition: transform var(--transition-speed-fast); } input[type="range"]:hover::-webkit-slider-thumb { transform: scale(1.2); }
        .footer-right-controls { display: flex; justify-content: flex-end; } .volume-container { display: flex; align-items: center; gap: 0.5rem; width: 150px; } .volume-bar::-webkit-slider-runnable-track { background: linear-gradient(to right, var(--text-secondary) 0%, var(--text-secondary) ${volume * 100}%, var(--bg-tertiary) ${volume * 100}%, var(--bg-tertiary) 100%); }

        /* Full Screen Player */
        .player-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; transform: translateY(100%); transition: opacity 0.4s ease, transform 0.4s ease; pointer-events: none; }
        .player-modal-overlay.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .player-modal-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; filter: blur(40px) brightness(0.4); transform: scale(1.1); transition: background-image 0.5s ease-in-out; }
        .player-modal-content { z-index: 1; display: flex; flex-direction: column; align-items: center; padding: 2rem; max-width: 90vw; max-height: 90vh; color: white; }
        .player-modal-close { position: absolute; top: 2rem; left: 2rem; background: rgba(0,0,0,0.3); border-radius: 50%; border: none; color: white; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
        .player-modal-artwork { width: 100%; max-width: 40vh; margin-bottom: 2rem; } .player-modal-artwork img { width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
        .player-modal-details { text-align: center; margin-bottom: 1.5rem; } .player-modal-title { font-size: 2.5rem; font-weight: 700; margin: 0; } .player-modal-artist { font-size: 1.25rem; opacity: 0.8; margin-top: 0.5rem; }
        .player-modal-progress { width: 100%; max-width: 500px; margin-bottom: 1.5rem; }
        .player-modal-controls { display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem; } .player-modal-controls .play-pause-button.large { width: 72px; height: 72px; background-color: white; color: black; } .player-modal-controls .control-button { color: white; }
        .player-modal-volume { width: 100%; max-width: 200px; } .player-modal-volume .volume-container { color: white; }

        /* Spinner */
        .spinner { width: 48px; height: 48px; border: 5px solid var(--border-color); border-bottom-color: var(--accent-color); border-radius: 50%; display: inline-block; box-sizing: border-box; animation: rotation 1s linear infinite; }
        @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        /* Modals */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: var(--bg-modal); padding: 2rem; border-radius: 12px; width: 90%; max-width: 400px; position: relative; box-shadow: 0 10px 30px var(--shadow-color); }
        .modal-close-button { position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-secondary); cursor: pointer; }
        .modal-title { margin-top: 0; margin-bottom: 1.5rem; font-size: 1.5rem; }
        .form-group { margin-bottom: 1rem; } .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.875rem; color: var(--text-secondary); }
        .form-input { width: 100%; padding: 0.75rem; background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-size: 1rem; box-sizing: border-box; }
        .form-button { width: 100%; padding: 0.875rem; border: none; border-radius: 8px; background-color: var(--accent-color); color: white; font-size: 1rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
        .form-button:hover { opacity: 0.85; } .form-button.secondary { background-color: var(--bg-tertiary); color: var(--text-primary); margin-top: 0.5rem; }
        .form-switch { margin-top: 1rem; text-align: center; color: var(--text-secondary); } .form-switch button { background: none; border: none; color: var(--accent-color); font-weight: 600; cursor: pointer; }
        .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-color); } .setting-item:last-of-type { border-bottom: none; }
        .radio-group { display: flex; gap: 1rem; } .toggle-switch { position: relative; display: inline-block; width: 50px; height: 28px; } .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--bg-tertiary); transition: .4s; border-radius: 28px; } .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: var(--accent-color); } input:checked + .slider:before { transform: translateX(22px); }

        /* Responsive */
        @media (max-width: 768px) { .app-container { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; } .sidebar { grid-row: 1; flex-direction: row; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; border-right: none; border-bottom: 1px solid var(--border-color); } .sidebar-header { margin-bottom: 0; } .sidebar-nav { display: none; } .main-content { grid-row: 2; padding: 1rem; } .footer-player { grid-row: 3; grid-template-columns: auto 1fr auto; padding: 0 1rem; height: 70px; } .footer-controls { grid-column: 2; } .footer-right-controls { grid-column: 3; } .current-track-info { grid-column: 1; } .footer-song-details { display: none; } .volume-container { display: none; } .player-modal-close { top: 1rem; left: 1rem; } .player-modal-title { font-size: 1.5rem;} .player-modal-artist { font-size: 1rem;} }
      `}</style>

      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">MOTO Music</div>
          </div>
          <nav className="sidebar-nav">
             <ul>
               <li><a href="#/">Listen Now</a></li>
               <li><a href="#/">Browse</a></li>
               <li><a href="#/">Radio</a></li>
             </ul>
           </nav>
            <div className="sidebar-actions">
                <button className="sidebar-button" onClick={() => setSettingsModalOpen(true)}><SettingsIcon /></button>
                <button className="sidebar-button" onClick={() => setProfileModalOpen(true)}><UserIcon /></button>
                <button className="sidebar-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
        </aside>

        <main className="main-content">
          <div className="search-bar-container">
            <div className="search-icon"><SearchIcon /></div>
            <input type="text" placeholder="Search songs, artists..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          {renderMainContent()}
        </main>

        <footer className="footer-player">
          {currentSong ? (
            <>
            <div className="current-track-info" onClick={() => setIsPlayerExpanded(true)}>
              <img src={currentSong.albumArt} alt={currentSong.title} className="footer-album-art" />
              <div className="footer-song-details">
                <span className="footer-song-title">{currentSong.title}</span>
                <span className="footer-song-artist">{currentSong.artist}</span>
              </div>
            </div>
            <div className="footer-controls">
              <div className="controls-container">
                <button onClick={playPrevious} className="control-button"><SkipBackIcon size={24} /></button>
                <button onClick={togglePlayPause} className="play-pause-button">{isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}</button>
                <button onClick={playNext} className="control-button"><SkipForwardIcon size={24} /></button>
              </div>
              <div className="progress-container">
                <span className="progress-time">{formatTime(audioRef.current?.currentTime)}</span>
                <input type="range" min="0" max="100" value={progress} onChange={handleProgressBarChange} className="progress-bar" />
                <span className="progress-time">{formatTime(duration)}</span>
              </div>
            </div>
            <div className="footer-right-controls">
                <div className="volume-container">
                    <button className="control-button" onClick={() => handleVolumeChange({target: {value: volume > 0 ? 0 : 1}})}>{volume > 0 ? <SpeakerIcon /> : <MutedSpeakerIcon />}</button>
                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-bar" />
                </div>
            </div>
            </>
          ) : (
            <div style={{gridColumn: '1 / 4', textAlign: 'center', color: 'var(--text-secondary)'}}>Select a song to play</div>
          )}
        </footer>

        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={playNext} preload="metadata"></audio>
        
        <FullScreenPlayer 
            isOpen={isPlayerExpanded}
            onClose={() => setIsPlayerExpanded(false)}
            currentSong={currentSong}
            isPlaying={isPlaying}
            progress={progress}
            duration={duration}
            togglePlayPause={togglePlayPause}
            playNext={playNext}
            playPrevious={playPrevious}
            handleProgressBarChange={handleProgressBarChange}
            formatTime={formatTime}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
        />
        
        <ProfileModal 
            isOpen={isProfileModalOpen} 
            onClose={() => setProfileModalOpen(false)}
            isAuthenticated={isAuthenticated}
            onLogin={() => setIsAuthenticated(true)}
            onLogout={() => {
                setIsAuthenticated(false);
                setProfileModalOpen(false);
            }}
        />
        <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
      </div>
    </>
  );
}

export default App;
