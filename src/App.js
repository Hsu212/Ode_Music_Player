import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- ICONS ---
const PlayIcon = ({size = 24}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>);
const PauseIcon = ({size = 24}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>);
const SkipBackIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>);
const SkipForwardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>);
const SpeakerIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>);
const MutedSpeakerIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>);
const MoonIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>);
const SunIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>);
const SoundWaveIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 10h3v4H3z M8 6h3v12H8z M13 2h3v20h-3z M18 6h3v12h-3z"></path></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const XIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

// --- HELPER COMPONENTS ---
const LoadingIndicator = () => (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><div className="spinner"></div></div>);
const ErrorDisplay = ({ message }) => (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#e53e3e' }}><p>{message}</p></div>);

// --- MUSIC SECTION COMPONENTS ---
const HorizontalMusicSection = ({ title, songs, onSongSelect, currentSong, isPlaying }) => (
  <section className="music-section">
    <h2 className="section-title">{title}</h2>
    <div className="song-carousel">
      {songs.map((song) => (
        <div key={song.id} className={`song-card ${currentSong?.id === song.id ? 'active' : ''}`} onClick={() => onSongSelect(song.id)}>
          <div className="card-artwork-container">
            <img src={song.albumArt} alt={song.title} className="song-album-art" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/180x180/000000/FFFFFF?text=Error'; }}/>
            <div className="card-play-button">{currentSong?.id === song.id && isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}</div>
            {currentSong?.id === song.id && isPlaying && <div className="sound-wave-overlay"><SoundWaveIcon /></div>}
          </div>
          <div className="song-details"><span className="song-title">{song.title}</span><span className="song-artist">{song.artist}</span></div>
        </div>
      ))}
    </div>
  </section>
);
const VerticalMusicSection = ({ title, songs, onSongSelect, currentSong, isPlaying }) => (
  <section className="music-section">
    <h2 className="section-title">{title}</h2>
    <div className="song-list">
      {songs.map((song, index) => (
        <div key={song.id} className={`song-list-item ${currentSong?.id === song.id ? 'active' : ''}`} onClick={() => onSongSelect(song.id)}>
          <div className="list-item-index">{currentSong?.id === song.id && isPlaying ? <SoundWaveIcon /> : <span>{index + 1}</span>}</div>
          <img src={song.albumArt} alt={song.title} className="list-item-artwork" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/50x50/000000/FFFFFF?text=X'; }}/>
          <div className="song-details"><span className="song-title">{song.title}</span><span className="song-artist">{song.artist}</span></div>
          <div className="list-item-duration">{`3:${Math.floor(Math.random() * 50 + 10)}`}</div>
        </div>
      ))}
    </div>
  </section>
);

// --- MODAL COMPONENTS ---
const ProfileModal = ({ isOpen, onClose, isAuthenticated, onLogin, onLogout }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    if (!isOpen) return null;
    const handleSubmit = (e) => { e.preventDefault(); onLogin(); onClose(); };
    return (<div className="modal-overlay" onClick={onClose}><div className="modal-content" onClick={e => e.stopPropagation()}><button className="modal-close-button" onClick={onClose}><XIcon /></button><h2 className="modal-title">{isAuthenticated ? 'Profile' : (isLoginView ? 'Login' : 'Create Account')}</h2>{isAuthenticated ? (<div className="profile-view"><p>Welcome, User!</p><button className="form-button">Change Password</button><button className="form-button secondary" onClick={onLogout}>Logout</button></div>) : (<form onSubmit={handleSubmit}><div className="form-group"><label htmlFor="email">Email</label><input type="email" id="email" required className="form-input" placeholder="you@example.com" /></div><div className="form-group"><label htmlFor="password">Password</label><input type="password" id="password" required className="form-input" placeholder="••••••••" /></div>{!isLoginView && (<div className="form-group"><label htmlFor="confirm-password">Confirm Password</label><input type="password" id="confirm-password" required className="form-input" placeholder="••••••••" /></div>)}<button type="submit" className="form-button">{isLoginView ? 'Login' : 'Create Account'}</button><p className="form-switch">{isLoginView ? "Don't have an account?" : "Already have an account?"}<button type="button" onClick={() => setIsLoginView(!isLoginView)}>{isLoginView ? 'Sign Up' : 'Login'}</button></p></form>)}</div></div>);
};
const SettingsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (<div className="modal-overlay" onClick={onClose}><div className="modal-content" onClick={e => e.stopPropagation()}><button className="modal-close-button" onClick={onClose}><XIcon /></button><h2 className="modal-title">Settings</h2><div className="setting-item"><label htmlFor="language">Language</label><select id="language" className="form-input"><option>English</option><option>Español</option></select></div><div className="setting-item"><label>Download Quality</label><div className="radio-group"><label><input type="radio" name="quality" value="wifi" defaultChecked /> Wi-Fi Only</label><label><input type="radio" name="quality" value="always" /> Always</label></div></div><div className="setting-item"><span>Data Saver</span><label className="toggle-switch"><input type="checkbox" /><span className="slider"></span></label></div><button className="form-button" onClick={onClose}>Save Changes</button></div></div>);
};

// --- MAIN APP COMPONENT ---
function App() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllLatest, setShowAllLatest] = useState(false);
  
  const audioRef = useRef(null);
  const currentSong = currentSongIndex !== null ? songs[currentSongIndex] : null;

  const JAMENDO_CLIENT_ID = '2838a1f3';
  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=50&order=popularity_week&imagesize=600`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.results.length === 0) throw new Error('No songs found.');
        const formattedSongs = data.results.map(track => ({ id: track.id, title: track.name, artist: track.artist_name, albumArt: track.image, url: track.audio }));
        setSongs(formattedSongs);
      } catch (err) { setError(err.message); } 
      finally { setIsLoading(false); }
    };
    fetchSongs();
  }, []);

  const topCharts = useMemo(() => songs.slice(0, 15), [songs]);
  const latestReleases = useMemo(() => songs.slice(15, 35), [songs]);
  const recommendations = useMemo(() => songs.slice(35, 50), [songs]);
  const searchResults = useMemo(() => !searchTerm ? [] : songs.filter(song => song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm, songs]);

  const playSongById = (songId) => {
    const songIndex = songs.findIndex(song => song.id === songId);
    if (songIndex !== -1) {
      if (currentSongIndex === songIndex) setIsPlaying(prev => !prev);
      else { setCurrentSongIndex(songIndex); setIsPlaying(true); }
    }
  };

  const togglePlayPause = () => { if (currentSong) setIsPlaying(prev => !prev); };
  const playNext = () => { if (songs.length > 0) setCurrentSongIndex(prev => (prev + 1) % songs.length); setIsPlaying(true); };
  const playPrevious = () => { if (songs.length > 0) setCurrentSongIndex(prev => (prev - 1 + songs.length) % songs.length); setIsPlaying(true); };
  
  const handleTimeUpdate = () => { const audio = audioRef.current; if (audio) setProgress((audio.currentTime / audio.duration) * 100); };
  const handleLoadedMetadata = () => { if (audioRef.current) setDuration(audioRef.current.duration); };
  const handleProgressBarChange = (e) => { const audio = audioRef.current; audio.currentTime = (e.target.value / 100) * audio.duration; };
  const handleVolumeChange = (e) => { const newVolume = parseFloat(e.target.value); audioRef.current.volume = newVolume; setVolume(newVolume); };
  useEffect(() => { const audio = audioRef.current; if (!currentSong) return; if (audio.src !== currentSong.url) audio.src = currentSong.url; isPlaying ? audio.play().catch(console.error) : audio.pause(); }, [isPlaying, currentSong]);
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  const formatTime = (time) => { if (isNaN(time) || time === 0) return "0:00"; const minutes = Math.floor(time / 60); const seconds = Math.floor(time % 60); return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; };

  const renderMainContent = () => {
    if (isLoading) return <LoadingIndicator />;
    if (error) return <ErrorDisplay message={error} />;
    if (searchTerm) {
      return searchResults.length > 0 ? <VerticalMusicSection title="Search Results" songs={searchResults} onSongSelect={playSongById} currentSong={currentSong} isPlaying={isPlaying} /> : <ErrorDisplay message={`No results for "${searchTerm}"`} />
    }
    return (
      <>
        <VerticalMusicSection title="Latest Releases" songs={showAllLatest ? latestReleases : latestReleases.slice(0, 5)} onSongSelect={playSongById} currentSong={currentSong} isPlaying={isPlaying} />
        {!showAllLatest && latestReleases.length > 5 && (<div className="see-more-container"><button onClick={() => setShowAllLatest(true)} className="see-more-button">See More</button></div>)}
        <HorizontalMusicSection title="Top Charts" songs={topCharts} onSongSelect={playSongById} currentSong={currentSong} isPlaying={isPlaying} />
        <HorizontalMusicSection title="Recommended For You" songs={recommendations} onSongSelect={playSongById} currentSong={currentSong} isPlaying={isPlaying} />
      </>
    );
  }

  return (
    <>
      <style>{`
        /* --- Base & Theme Styles --- */
        :root { --font-family: 'Inter', sans-serif; --transition-speed: 0.3s; }
        [data-theme='dark'] { --bg-primary: #121212; --bg-secondary: #1e1e1e; --bg-tertiary: #2a2a2a; --bg-modal: #282828; --text-primary: #ffffff; --text-secondary: #b3b3b3; --border-color: #333333; --accent-color: #1DB954; --accent-color-light: rgba(29, 185, 84, 0.2); --hover-bg: #282828; --shadow-color: rgba(0, 0, 0, 0.5); }
        [data-theme='light'] { --bg-primary: #f5f5f7; --bg-secondary: #ffffff; --bg-tertiary: #e5e5e5; --bg-modal: #ffffff; --text-primary: #1d1d1f; --text-secondary: #515154; --border-color: #d2d2d7; --accent-color: #007aff; --accent-color-light: rgba(0, 122, 255, 0.1); --hover-bg: #e8e8e8; --shadow-color: rgba(0, 0, 0, 0.1); }
        body { margin: 0; font-family: var(--font-family); background-color: var(--bg-primary); color: var(--text-primary); transition: background-color var(--transition-speed), color var(--transition-speed); }
        
        /* --- Layout --- */
        .app-container { display: grid; grid-template-columns: 240px 1fr; grid-template-rows: 1fr auto; height: 100vh; overflow: hidden; }
        .sidebar { grid-row: 1 / 2; background-color: var(--bg-secondary); padding: 1.5rem; border-right: 1px solid var(--border-color); display: flex; flex-direction: column; }
        .main-content { grid-row: 1 / 2; padding: 2rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem; }
        .footer-player { grid-column: 1 / 3; grid-row: 2 / 3; background-color: var(--bg-secondary); border-top: 1px solid var(--border-color); display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: center; padding: 0 1.5rem; height: 90px; }
        
        /* --- Sidebar & Search --- */
        .sidebar-header { margin-bottom: 2rem; } .sidebar-logo { font-weight: 700; font-size: 1.25rem; } .sidebar-nav { flex-grow: 1; } .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
        .sidebar-nav li a { display: block; padding: 0.75rem 0; color: var(--text-secondary); text-decoration: none; font-weight: 500; transition: color 0.2s; }
        .sidebar-nav li a:hover { color: var(--text-primary); } .sidebar-actions { display: flex; gap: 0.5rem; padding-top: 1rem; }
        .sidebar-button { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 0.5rem; border-radius: 50%; transition: background-color 0.2s, color 0.2s; }
        .sidebar-button:hover { background-color: var(--hover-bg); color: var(--text-primary); }
        .search-bar-container { position: relative; } .search-icon { position: absolute; top: 50%; left: 1rem; transform: translateY(-50%); color: var(--text-secondary); pointer-events: none; }
        .search-input { width: 100%; box-sizing: border-box; padding: 0.75rem 1rem 0.75rem 3rem; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-size: 1rem; transition: border-color 0.2s; }
        .search-input:focus { outline: none; border-color: var(--accent-color); } .section-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; }
        
        /* --- Horizontal Carousel --- */
        .song-carousel { display: flex; overflow-x: auto; gap: 1.5rem; padding-bottom: 1rem; scrollbar-width: none; -ms-overflow-style: none; }
        .song-carousel::-webkit-scrollbar { display: none; } .song-card { flex: 0 0 180px; cursor: pointer; } .card-artwork-container { position: relative; margin-bottom: 0.75rem; }
        .song-album-art { width: 180px; height: 180px; border-radius: 8px; object-fit: cover; box-shadow: 0 4px 12px var(--shadow-color); transition: transform 0.3s; }
        .song-card:hover .song-album-art { transform: scale(1.03); }
        .card-play-button, .sound-wave-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.5); color: white; border-radius: 8px; opacity: 0; transition: opacity 0.3s; }
        .song-card:hover .card-play-button, .song-card.active .card-play-button { opacity: 1; }
        .sound-wave-overlay { opacity: 1; backdrop-filter: blur(4px); }
        .song-card .song-details { display: flex; flex-direction: column; } .song-card .song-title, .song-card .song-artist { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .song-card .song-title { font-weight: 600; } .song-card .song-artist { font-size: 0.875rem; color: var(--text-secondary); }

        /* --- Vertical List --- */
        .song-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .song-list-item { display: grid; grid-template-columns: 40px 50px 1fr auto; align-items: center; gap: 1rem; padding: 0.75rem; border-radius: 8px; cursor: pointer; transition: background-color 0.2s; }
        .song-list-item:hover { background-color: var(--hover-bg); } .song-list-item.active { background-color: var(--accent-color-light); }
        .list-item-index { text-align: center; color: var(--text-secondary); font-size: 1rem; } .list-item-artwork { width: 50px; height: 50px; border-radius: 6px; object-fit: cover; }
        .list-item-duration { color: var(--text-secondary); font-size: 0.875rem; }
        .song-list-item .song-details { display: flex; flex-direction: column; min-width: 0; }
        .song-list-item .song-title { font-weight: 600; } .song-list-item .song-artist { font-size: 0.875rem; color: var(--text-secondary); }
        .song-list-item.active .list-item-index, .song-list-item.active .song-title { color: var(--accent-color); }
        .see-more-container { margin-top: -1rem; margin-bottom: 1rem; padding-left: 0.75rem; }
        .see-more-button { background: none; border: none; color: var(--accent-color); font-size: 1rem; font-weight: 600; cursor: pointer; padding: 0.5rem; border-radius: 8px; transition: background-color 0.2s; }
        .see-more-button:hover { background-color: var(--hover-bg); }
        
        /* --- Footer Player --- */
        .footer-player { /* ... */ } .current-track-info { display: flex; align-items: center; gap: 1rem; min-width: 0; } .footer-album-art { width: 56px; height: 56px; border-radius: 6px; flex-shrink: 0; }
        .footer-song-details { display: flex; flex-direction: column; min-width: 0; } .footer-song-title, .footer-song-artist { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .footer-song-title { font-weight: 600; }
        .footer-song-artist { font-size: 0.875rem; color: var(--text-secondary); } .footer-controls { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .controls-container { display: flex; align-items: center; gap: 1rem; } .control-button, .play-pause-button { background: none; border: none; color: var(--text-secondary); cursor: pointer; transition: color 0.2s; }
        .control-button:hover, .play-pause-button:hover { color: var(--text-primary); }
        .play-pause-button { background-color: var(--hover-bg); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-primary); }
        .play-pause-button:hover { transform: scale(1.05); } .progress-container { display: flex; align-items: center; gap: 0.75rem; width: 100%; max-width: 500px; }
        .progress-time { font-size: 0.75rem; color: var(--text-secondary); min-width: 35px; text-align: center;}
        input[type="range"] { -webkit-appearance: none; width: 100%; background: transparent; cursor: pointer; } input[type="range"]:focus { outline: none; }
        input[type="range"]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${progress}%, var(--bg-tertiary) ${progress}%, var(--bg-tertiary) 100%); border-radius: 3px; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 14px; width: 14px; border-radius: 50%; background: var(--text-primary); cursor: pointer; margin-top: -5px; transition: opacity 0.2s; opacity: 0; }
        .progress-container:hover input[type="range"]::-webkit-slider-thumb { opacity: 1; }
        .footer-right-controls { display: flex; justify-content: flex-end; } .volume-container { display: flex; align-items: center; gap: 0.5rem; width: 150px; } .volume-bar { cursor: pointer; }
        .volume-bar::-webkit-slider-runnable-track { background: linear-gradient(to right, var(--text-secondary) 0%, var(--text-secondary) ${volume * 100}%, var(--bg-tertiary) ${volume * 100}%, var(--bg-tertiary) 100%); }
        .volume-bar::-webkit-slider-thumb { height: 12px; width: 12px; margin-top: -4px; opacity: 1;}
        
        /* --- Spinner --- */
        .spinner { width: 48px; height: 48px; border: 5px solid var(--border-color); border-bottom-color: var(--accent-color); border-radius: 50%; display: inline-block; box-sizing: border-box; animation: rotation 1s linear infinite; } @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        /* --- CUSTOM MODAL STYLES --- */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(5px); animation: fadeIn 0.3s ease; }
        .modal-content { background: var(--bg-modal); padding: 2rem; border-radius: 12px; width: 90%; max-width: 400px; position: relative; box-shadow: 0 10px 30px var(--shadow-color); border: 1px solid var(--border-color); animation: scaleUp 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .modal-close-button { position: absolute; top: 1rem; right: 1rem; background: var(--hover-bg); border: none; color: var(--text-secondary); cursor: pointer; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; transition: background-color 0.2s; }
        .modal-close-button:hover { background-color: var(--border-color); color: var(--text-primary); }
        .modal-title { margin-top: 0; margin-bottom: 1.5rem; font-size: 1.5rem; text-align: center; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.875rem; color: var(--text-secondary); }
        .form-input { width: 100%; padding: 0.75rem; background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-size: 1rem; box-sizing: border-box; transition: border-color 0.2s, box-shadow 0.2s; }
        .form-input:focus { outline: none; border-color: var(--accent-color); box-shadow: 0 0 0 3px var(--accent-color-light); }
        .form-button { width: 100%; padding: 0.875rem; border: none; border-radius: 8px; background-color: var(--accent-color); color: white; font-size: 1rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
        .form-button:hover { opacity: 0.85; }
        .form-button.secondary { background-color: var(--bg-tertiary); color: var(--text-primary); margin-top: 0.5rem; }
        .form-switch { margin-top: 1.5rem; text-align: center; font-size: 0.875rem; color: var(--text-secondary); }
        .form-switch button { background: none; border: none; color: var(--accent-color); font-weight: 600; cursor: pointer; padding: 0.25rem; }
        .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-color); }
        .setting-item:last-of-type { border-bottom: none; }
        .setting-item span, .setting-item label { font-weight: 500; }
        .radio-group { display: flex; gap: 1rem; }
        .radio-group label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        .toggle-switch { position: relative; display: inline-block; width: 50px; height: 28px; }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; inset: 0; background-color: var(--bg-tertiary); transition: .4s; border-radius: 28px; }
        .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: var(--accent-color); }
        input:checked + .slider:before { transform: translateX(22px); }

        /* --- Responsive --- */
         @media (max-width: 768px) { .app-container { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; } .sidebar { grid-row: 1; flex-direction: row; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; border-right: none; border-bottom: 1px solid var(--border-color); } .sidebar-header { margin-bottom: 0; } .sidebar-nav { display: none; } .main-content { grid-row: 2; padding: 1rem; } .footer-player { grid-row: 3; grid-template-columns: auto 1fr auto; padding: 0 1rem; height: 70px; } .footer-controls { grid-column: 2; } .footer-right-controls { grid-column: 3; } .current-track-info { grid-column: 1; } .footer-song-details { display: none; } .volume-container { display: none; } }
      `}</style>

      <div className="app-container">
        <aside className="sidebar">
            <div className="sidebar-header"><div className="sidebar-logo">MOTO Music</div></div>
            <nav className="sidebar-nav"><ul><li><a href="#/">Listen Now</a></li><li><a href="#/">Browse</a></li><li><a href="#/">Radio</a></li></ul></nav>
            <div className="sidebar-actions">
              <button className="sidebar-button" title="Settings" onClick={() => setSettingsModalOpen(true)}><SettingsIcon /></button>
              <button className="sidebar-button" title="Profile" onClick={() => setProfileModalOpen(true)}><UserIcon /></button>
              <button className="sidebar-button" title="Toggle Theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</button>
            </div>
        </aside>

        <main className="main-content">
          <div className="search-bar-container">
            <div className="search-icon"><SearchIcon /></div>
            <input type="text" placeholder="Search for songs or artists..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          {renderMainContent()}
        </main>

        <footer className="footer-player">
          {currentSong ? (
            <>
            <div className="current-track-info"><img src={currentSong.albumArt} alt={currentSong.title} className="footer-album-art" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/56x56/000000/FFFFFF?text=Err'; }}/><div className="footer-song-details"><span className="footer-song-title">{currentSong.title}</span><span className="footer-song-artist">{currentSong.artist}</span></div></div>
            <div className="footer-controls"><div className="controls-container"><button onClick={playPrevious} className="control-button"><SkipBackIcon /></button><button onClick={togglePlayPause} className="play-pause-button">{isPlaying ? <PauseIcon /> : <PlayIcon />}</button><button onClick={playNext} className="control-button"><SkipForwardIcon /></button></div><div className="progress-container"><span className="progress-time">{formatTime(audioRef.current?.currentTime)}</span><input type="range" min="0" max="100" value={progress || 0} onChange={handleProgressBarChange} className="progress-bar" /><span className="progress-time">{formatTime(duration)}</span></div></div>
            <div className="footer-right-controls"><div className="volume-container"><button className="control-button" onClick={() => audioRef.current.volume = volume > 0 ? 0 : 1}>{volume > 0 ? <SpeakerIcon /> : <MutedSpeakerIcon />}</button><input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-bar" /></div></div>
            </>
          ) : (
            null // This removes the "Select a song to play" message
          )}
        </footer>

        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={playNext} onVolumeChange={(e) => setVolume(e.target.volume)} preload="metadata"></audio>
        
        <ProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} isAuthenticated={isAuthenticated} onLogin={() => setIsAuthenticated(true)} onLogout={() => { setIsAuthenticated(false); setProfileModalOpen(false); }}/>
        <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
      </div>
    </>
  );
}

export default App;
