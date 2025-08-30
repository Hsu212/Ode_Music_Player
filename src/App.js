import React, { useState, useEffect, useRef, useMemo } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

// --- ICONS (Added ChevronDownIcon & MoreIcon) ---
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
const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const ChevronDownIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>);
const MoreIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>);

// --- HELPER COMPONENTS ---
const LoadingIndicator = () => (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><div className="spinner"></div></div>);
const ErrorDisplay = ({ message }) => (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#e53e3e' }}><p>{message}</p></div>);

// --- UI COMPONENTS ---
const MusicSection = ({ title, songs, onSongSelect, currentSong, isPlaying }) => (
  <section className="music-section">
    <h2 className="section-title">{title}</h2>
    <div className="song-carousel">
      {songs.map((song) => (
        <div key={song.id} className={`song-card ${currentSong?.id === song.id ? 'active' : ''}`} onClick={() => onSongSelect(song.id)}>
          <div className="card-artwork-container">
            <img src={song.albumArt} alt={song.title} className="song-album-art" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/180x180/000000/FFFFFF?text=Error'; }}/>
            <div className="card-play-button">{currentSong?.id === song.id && isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}</div>
            {currentSong?.id === song.id && isPlaying && <div className="sound-wave-overlay"><SoundWaveIcon /></div>}
          </div>
          <div className="song-details"><span className="song-title">{song.title}</span><span className="song-artist">{song.artist}</span></div>
        </div>
      ))}
    </div>
  </section>
);

const VerticalSongList = ({ title, songs, onSongSelect, currentSong, isPlaying }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const songsToShow = isExpanded ? songs : songs.slice(0, 6);

    return (
        <section className="music-section">
            <h2 className="section-title">{title}</h2>
            <div className="vertical-song-list">
                {songsToShow.map((song, index) => (
                    <div key={song.id} className={`song-list-item ${currentSong?.id === song.id ? 'active' : ''}`} onClick={() => onSongSelect(song.id)}>
                        <div className="song-list-number">{currentSong?.id === song.id && isPlaying ? <SoundWaveIcon /> : <span>{index + 1}</span>}</div>
                        <img src={song.albumArt} alt={song.title} className="song-list-artwork" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/000000/FFFFFF?text=Err'; }}/>
                        <div className="song-list-details"><span className="song-title">{song.title}</span><span className="song-artist">{song.artist}</span></div>
                        <button className="song-list-play-button">{currentSong?.id === song.id && isPlaying ? <PauseIcon size={20}/> : <PlayIcon size={20}/>}</button>
                    </div>
                ))}
            </div>
            {songs.length > 6 && (<button className="see-more-button" onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'See less...' : 'See more...'}</button>)}
        </section>
    );
};

// --- NOW PLAYING VIEW (Full Screen Player) ---
const NowPlayingView = ({ song, isPlaying, onPlayPause, onNext, onPrev, progress, onProgressChange, duration, formatTime, onClose, isFavorite, onToggleFavorite }) => {
  return (
      <div className="now-playing-view">
          <div className="npv-header">
              <button className="npv-close-button" onClick={onClose}><ChevronDownIcon /></button>
              <span className="npv-header-title">Now Playing</span>
              <button className="npv-more-button"><MoreIcon /></button>
          </div>
          <div className="npv-content">
              <div className="npv-artwork-container">
                  <img src={song.albumArt} alt={song.title} className="npv-artwork" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/500x500/000000/FFFFFF?text=Error'; }}/>
              </div>
              <div className="npv-details">
                    {/* This new inner div will hold the text */}
                    <div className="npv-details-info">
                        <h1 className="npv-title">{song.title}</h1>
                        <h2 className="npv-artist">{song.artist}</h2>
                    </div>
                    {/* The button is now a sibling to the text info */}
                    <button className="npv-action-button" onClick={onToggleFavorite}>
                        <HeartIcon isFavorite={isFavorite} />
                    </button>
                </div>
              <div className="npv-progress-container">
                  <input type="range" min="0" max="100" value={progress || 0} onChange={onProgressChange} className="npv-progress-bar" />
                  <div className="npv-time-info">
                      <span>{formatTime(progress > 0 ? (progress / 100) * duration : 0)}</span>
                      <span>{formatTime(duration)}</span>
                  </div>
              </div>
              <div className="npv-controls">
                  <button className="npv-control-button" onClick={onPrev}><SkipBackIcon /></button>
                  <button className="npv-play-pause-button" onClick={onPlayPause}>{isPlaying ? <PauseIcon size={36}/> : <PlayIcon size={36}/>}</button>
                  <button className="npv-control-button" onClick={onNext}><SkipForwardIcon /></button>
              </div>
          </div>
      </div>
  );
};
// --- MODALS AND OTHER COMPONENTS ---
const AuthModal = ({ isOpen, onClose }) => { if (!isOpen) return null; return <div className="modal-overlay" onClick={onClose}><div className="modal-content" onClick={e => e.stopPropagation()}>...Auth Content...</div></div>};
const SettingsModal = ({ isOpen, onClose }) => { if (!isOpen) return null; return <div className="modal-overlay" onClick={onClose}><div className="modal-content" onClick={e => e.stopPropagation()}>...Settings Content...</div></div>};

function App() {
const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileView, setProfileView] = useState(false);

  const [isNowPlayingViewOpen, setNowPlayingViewOpen] = useState(false);

  

  const audioRef = useRef(null);
  // --- SUPABASE AUTH EFFECT ---
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); });
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setSession(session); if (_event === 'SIGNED_OUT') { setProfileView(false); } });
      return () => subscription.unsubscribe();
    }, []);
  
    // --- DATA FETCHING ---
    const JAMENDO_CLIENT_ID = '2838a1f3';
    useEffect(() => {
      const fetchSongs = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=30&order=popularity_week&imagesize=600`);
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
  

  const currentSong = useMemo(() => (currentSongIndex !== null ? songs[currentSongIndex] : null), [currentSongIndex, songs]);
  
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('songs').select('*');
        if (error) throw error;
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setError("Could not fetch song data. Please check your Supabase connection and Row Level Security policies.");
      }
      setIsLoading(false);
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (currentSong) {
      if (audio.src !== currentSong.songUrl) { audio.src = currentSong.songUrl; }
      isPlaying ? audio.play().catch(e => console.error("Audio play failed:", e)) : audio.pause();
    }
  }, [currentSong, isPlaying]);

  const handleTimeUpdate = () => { const audio = audioRef.current; if (audio.duration) { setProgress((audio.currentTime / audio.duration) * 100); }};
  const handleLoadedMetadata = () => { setDuration(audioRef.current.duration); };
  const handleProgressBarChange = (e) => { const newProgress = e.target.value; setProgress(newProgress); audioRef.current.currentTime = (newProgress / 100) * duration; };
  const handleVolumeChange = (e) => { const newVolume = e.target.value; setVolume(newVolume); audioRef.current.volume = newVolume; };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const floorSeconds = Math.floor(seconds);
    const min = Math.floor(floorSeconds / 60);
    const sec = floorSeconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const playNext = () => { if (songs.length === 0) return; setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length); setIsPlaying(true); };
  const playPrevious = () => { if (songs.length === 0) return; setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length); setIsPlaying(true); };

  const onSongSelect = (songId) => {
    const songIndex = songs.findIndex(song => song.id === songId);
    if (songIndex !== -1) {
      if (currentSongIndex === songIndex) { setIsPlaying(!isPlaying); } 
      else { setCurrentSongIndex(songIndex); setIsPlaying(true); }
    }
  };

  const filteredSongs = useMemo(() => {
    if (!searchTerm) return songs;
    return songs.filter(song => song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [songs, searchTerm]);

  return (
    <>
      <div className={`app-container ${isNowPlayingViewOpen ? 'now-playing-open' : ''}`} data-theme={theme}>
        <header className="app-header">
            <div className="header-left">
                <h1 className="logo-text">Musix</h1>
                <div className="search-bar"><SearchIcon /><input type="text" placeholder="Search Songs, Artists" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
            </div>
            <div className="header-right">
                <button className="header-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</button>
                <button className="header-button" onClick={() => setAuthModalOpen(true)}><UserIcon /></button>
                <button className="header-button" onClick={() => setSettingsModalOpen(true)}><SettingsIcon /></button>
            </div>
        </header>

        <main className="app-main">
          {isLoading && <LoadingIndicator />}
          {error && <ErrorDisplay message={error} />}
          {!isLoading && !error && (
            <>
              <MusicSection title="Top Charts" songs={songs.slice(0, 8)} onSongSelect={onSongSelect} currentSong={currentSong} isPlaying={isPlaying} />
              <VerticalSongList title="All Songs" songs={filteredSongs} onSongSelect={onSongSelect} currentSong={currentSong} isPlaying={isPlaying} />
            </>
          )}
        </main>

        <footer className="app-footer" onClick={() => currentSong && setNowPlayingViewOpen(true)}>
          {currentSong ? (
            <>
            <div className="footer-song-info">
              <img src={currentSong.albumArt} alt={currentSong.title} className="footer-album-art" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/56x56/000000/FFFFFF?text=Err'; }}/>
              <div className="footer-song-details"><span className="footer-song-title">{currentSong.title}</span><span className="footer-song-artist">{currentSong.artist}</span></div>
            </div>
            <div className="footer-player-controls">
              <div className="footer-main-controls">
                <button className="control-button" onClick={(e) => { e.stopPropagation(); playPrevious(); }}><SkipBackIcon /></button>
                <button className="play-pause-button" onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
                <button className="control-button" onClick={(e) => { e.stopPropagation(); playNext(); }}><SkipForwardIcon /></button>
              </div>
              <div className="progress-container" onClick={(e) => e.stopPropagation()}>
                <span className="progress-time">{formatTime(audioRef.current?.currentTime)}</span>
                <input type="range" min="0" max="100" value={progress || 0} onChange={handleProgressBarChange} className="progress-bar" />
                <span className="progress-time">{formatTime(duration)}</span>
              </div>
            </div>
            <div className="footer-right-controls" onClick={(e) => e.stopPropagation()}>
              <div className="volume-container">
                <button className="control-button" onClick={() => audioRef.current.volume = volume > 0 ? 0 : 1}>{volume > 0 ? <SpeakerIcon /> : <MutedSpeakerIcon />}</button>
                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="volume-bar" />
              </div>
            </div>
            </>
          ) : ( <div style={{gridColumn: '1 / 4', textAlign: 'center', color: 'var(--text-secondary)'}}>{isLoading ? 'Loading music...' : 'Select a song to play'}</div> )}
        </footer>

        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={playNext} onVolumeChange={(e) => setVolume(e.target.volume)} preload="metadata"></audio>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
        <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
      </div>

      {/* --- Render NowPlayingView outside the main grid for overlay --- */}
      {currentSong && (
            <NowPlayingView 
              song={currentSong}
              isPlaying={isPlaying}
              onPlayPause={togglePlayPause}
              onNext={playNext}
              onPrev={playPrevious}
              progress={progress}
              onProgressChange={handleProgressBarChange}
              duration={duration}
              formatTime={formatTime}
              onClose={() => setNowPlayingViewOpen(false)}
              isFavorite={favoriteSongs.includes(currentSong.id)} // <-- ADD THIS
              onToggleFavorite={toggleFavorite} // <-- ADD THIS
            />
        )}
    </>
  );
}

export default App;
