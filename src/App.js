import React, { useState, useEffect, useRef, useMemo } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

// --- ICONS ---
const PlayIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PauseIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const SkipBackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" x2="5" y1="19" y2="5" />
  </svg>
);

const SkipForwardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" x2="19" y1="5" y2="19" />
  </svg>
);

const SpeakerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const MutedSpeakerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="22" x2="16" y1="9" y2="15" />
    <line x1="16" x2="22" y1="9" y2="15" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
  </svg>
);

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const SoundWaveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 10h3v4H3z M8 6h3v12H8z M13 2h3v20h-3z M18 6h3v12h-3z"></path>
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const PencilIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const HeartIcon = ({ isFavorite }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isFavorite ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CloseIcon = ({ size = 32 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

// --- HELPER COMPONENTS ---
const LoadingIndicator = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div className="spinner"></div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#e53e3e' }}>
    <p>{message}</p>
  </div>
);

// --- UI COMPONENTS ---
const MusicSection = ({ title, songs, onSongSelect, currentSong, isPlaying }) => (
  <section className="music-section">
    <h2 className="section-title">{title}</h2>
    <div className="song-carousel">
      {songs.map((song) => (
        <div
          key={song.id}
          className={`song-card ${currentSong?.id === song.id ? 'active' : ''}`}
          onClick={() => onSongSelect(song.id)}
        >
          <div className="card-artwork-container">
            <img
              src={song.albumArt}
              alt={song.title}
              className="song-album-art"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/180x180/000000/FFFFFF?text=Error';
              }}
            />
            <div className="card-play-button">
              {currentSong?.id === song.id && isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
            </div>
            {currentSong?.id === song.id && isPlaying && (
              <div className="sound-wave-overlay">
                <SoundWaveIcon />
              </div>
            )}
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

const VerticalSongList = ({ title, songs, onSongSelect, currentSong, isPlaying }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const songsToShow = isExpanded ? songs : songs.slice(0, 6);

  return (
    <section className="music-section">
      <h2 className="section-title">{title}</h2>
      <div className="vertical-song-list">
        {songsToShow.map((song, index) => (
          <div
            key={song.id}
            className={`song-list-item ${currentSong?.id === song.id ? 'active' : ''}`}
            onClick={() => onSongSelect(song.id)}
          >
            <div className="song-list-number">
              {currentSong?.id === song.id && isPlaying ? <SoundWaveIcon /> : <span>{index + 1}</span>}
            </div>
            <img
              src={song.albumArt}
              alt={song.title}
              className="song-list-artwork"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/40x40/000000/FFFFFF?text=Err';
              }}
            />
            <div className="song-list-details">
              <span className="song-title">{song.title}</span>
              <span className="song-artist">{song.artist}</span>
            </div>
            <button className="song-list-play-button">
              {currentSong?.id === song.id && isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            </button>
          </div>
        ))}
      </div>
      {songs.length > 6 && (
        <button className="see-more-button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'See less...' : 'See more...'}
        </button>
      )}
    </section>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [songs, setSongs] = useState([]);
  const [topCharts, setTopCharts] = useState([]);
  const [latestReleases, setLatestReleases] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeSection, setActiveSection] = useState('Listen Now');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNowPlayingViewOpen, setNowPlayingViewOpen] = useState(false);
  const [isProfileView, setProfileView] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const fetchSongs = async () => {
      try {
        const mockSongs = [
          // Mock song data
        ];
        setSongs(mockSongs);
        setTopCharts(mockSongs.slice(0, 5));
        setLatestReleases(mockSongs.slice(5, 10));
        setRecommendations(mockSongs.slice(10, 15));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    if (songs.length > 0 && currentSongIndex >= 0) {
      setCurrentSong(songs[currentSongIndex]);
    }
  }, [currentSongIndex, songs]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!currentSong) return;
    if (audio.src !== currentSong.url) audio.src = currentSong.url;
    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSearch = useMemo(() => {
    return (term) => {
      if (!term) return [];
      return songs.filter(
        (song) =>
          song.title.toLowerCase().includes(term.toLowerCase()) ||
          song.artist.toLowerCase().includes(term.toLowerCase())
      );
    };
  }, [songs]);

  useEffect(() => {
    setSearchResults(handleSearch(searchTerm));
  }, [searchTerm, handleSearch]);

  const handleNavClick = (section) => {
    setProfileView(false);
    setActiveSection(section);
    setSearchTerm('');
  };

  const toggleFavorite = (songId) => {
    setFavoriteSongs((prevFavorites) => {
      if (prevFavorites.includes(songId)) {
        return prevFavorites.filter((id) => id !== songId);
      } else {
        return [...prevFavorites, songId];
      }
    });
  };

  const playSongById = (songId) => {
    const songIndex = songs.findIndex((song) => song.id === songId);
    if (songIndex !== -1) {
      if (currentSongIndex === songIndex) {
        setIsPlaying((prev) => !prev);
      } else {
        setCurrentSongIndex(songIndex);
        setIsPlaying(true);
      }
      setNowPlayingViewOpen(true);
    }
  };

  const togglePlayPause = () => {
    if (currentSong) setIsPlaying((prev) => !prev);
  };

  const playNext = () => {
    if (songs.length > 0) setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (songs.length > 0)
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleProgressBarChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (e.target.value / 100) * audio.duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderMainContent = () => {
    if (isLoading) return <LoadingIndicator />;
    if (error) return <ErrorDisplay message={error} />;
    if (searchTerm) {
      return searchResults.length > 0 ? (
        <MusicSection
          title="Search Results"
          songs={searchResults}
          onSongSelect={playSongById}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />
      ) : (
        <ErrorDisplay message={`No results for "${searchTerm}"`} />
      );
    }
    switch (activeSection) {
      case 'Listen Now':
        return (
          <>
            <MusicSection
              title="Top Charts"
              songs={topCharts}
              onSongSelect={playSongById}
              currentSong={currentSong}
              isPlaying={isPlaying}
            />
            <VerticalSongList
              title="Latest Releases"
              songs={latestReleases}
              onSongSelect={playSongById}
              currentSong={currentSong}
              isPlaying={isPlaying}
            />
            <MusicSection
              title="Recommended For You"
              songs={recommendations}
              onSongSelect={playSongById}
              currentSong={currentSong}
              isPlaying={isPlaying}
            />
          </>
        );
      case 'Library':
        return (
          <FavoriteSongsList
            songs={songs}
            favoriteSongIds={favoriteSongs}
            onSongSelect={playSongById}
            currentSong={currentSong}
            isPlaying={isPlaying}
          />
        );
      case 'Browse':
      case 'Radio':
      default:
        return <div>Select a section to explore.</div>;
    }
  };

  const handleUserIconClick = () => {
    if (!session) {
      setAuthModalOpen(true);
    } else {
      setProfileView(true);
    }
  };

  return (
    <div className={`app-container ${isNowPlayingViewOpen ? 'now-playing-open' : ''}`} data-theme={theme}>
      <header>
        <button className="sidebar-toggle" onClick={() => setIsSidebarOpen((prev) => !prev)}>
          <MenuIcon />
        </button>
      </header>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={() => setIsSidebarOpen(false)}>
          <CloseIcon size={24} />
        </button>
        <div className="sidebar-header">
          <img src="odelogo.png" alt="Ode Logo" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a
                href="#/"
                onClick={() => handleNavClick('Listen Now')}
                className={activeSection === 'Listen Now' ? 'active' : ''}
              >
                Listen Now
              </a>
            </li>
            <li>
              <a
                href="#/"
                onClick={() => handleNavClick('Browse')}
                className={activeSection === 'Browse' ? 'active' : ''}
              >
                Browse
              </a>
            </li>
            <li>
              <a
                href="#/"
                onClick={() => handleNavClick('Library')}
                className={activeSection === 'Library' ? 'active' : ''}
              >
                Library
              </a>
            </li>
            <li>
              <a
                href="#/"
                onClick={() => handleNavClick('Radio')}
                className={activeSection === 'Radio' ? 'active' : ''}
              >
                Radio
              </a>
            </li>
          </ul>
        </nav>
        <div className="sidebar-actions">
          <button className="sidebar-button" title="Settings" onClick={() => setSettingsModalOpen(true)}>
            <SettingsIcon />
          </button>
          <button className="sidebar-button" title="Profile" onClick={handleUserIconClick}>
            <UserIcon />
          </button>
          <button
            className="sidebar-button"
            title="Toggle Theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </aside>
      <main className="main-content">
        {isProfileView && session ? (
          <ProfilePage session={session} onBack={() => setProfileView(false)} />
        ) : (
          <>
            <div className="search-bar-container">
              <div className="search-icon">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search for songs or artists..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {renderMainContent()}
          </>
        )}
      </main>
      <footer
        className={`footer-player-controls ${currentSong ? '' : 'no-song'}`}
        onClick={() => currentSong && setNowPlayingViewOpen(true)}
      >
        {currentSong ? (
          <>
            <div className="current-track-info">
              <img
                src={currentSong.albumArt}
                alt={currentSong.title}
                className="footer-album-art"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/56x56/000000/FFFFFF?text=Err';
                }}
              />
              <div className="footer-song-details">
                <span className="footer-song-title">{currentSong.title}</span>
                <span className="footer-song-artist">{currentSong.artist}</span>
              </div>
            </div>
            <div className="footer-controls">
              <div className="controls-container">
                <button onClick={playPrevious} className="control-button">
                  <SkipBackIcon />
                </button>
                <button onClick={togglePlayPause} className="play-pause-button">
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button onClick={playNext} className="control-button">
                  <SkipForwardIcon />
                </button>
                <div className="progress-container">
                  <span className="progress-time">
                    {formatTime(progress > 0 ? (progress / 100) * duration : 0)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress || 0}
                    onChange={handleProgressBarChange}
                    className="progress-bar"
                    style={{
                      background: `linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${
                        progress || 0
                      }%, var(--bg-tertiary) ${progress || 0}%, var(--bg-tertiary) 100%)`,
                    }}
                  />
                  <span className="progress-time">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
            <div className="footer-right-controls">
              <div className="volume-container">
                <button className="control-button">
                  {volume === 0 ? <MutedSpeakerIcon /> : <SpeakerIcon />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-bar"
                  style={{
                    background: `linear-gradient(to right, var(--text-secondary) 0%, var(--text-secondary) ${
                      volume * 100
                    }%, var(--bg-tertiary) ${volume * 100}%, var(--bg-tertiary) 100%)`,
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="current-track-info">No song selected</div>
        )}
      </footer>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}
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
          isFavorite={favoriteSongs.includes(currentSong.id)}
          onToggleFavorite={toggleFavorite}
          isMoreMenuOpen={isMoreMenuOpen}
          setIsMoreMenuOpen={setIsMoreMenuOpen}
        />
      )}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={playNext}
      />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
    </div>
  );
};

export default App;
