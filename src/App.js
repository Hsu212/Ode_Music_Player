import React, { useState, useEffect, useRef, useMemo } from 'react';
import { supabase } from './supabaseClient'; // Make sure you have this file configured

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
const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const XIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>);
const PencilIcon = ({size=16}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>);
const ChevronDownIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>);
const MoreIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>);
const HeartIcon = ({ isFavorite }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>);
const CloseIcon = ({size = 32}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/>
    <line x1="4" y1="12" x2="20" y2="12"/>
    <line x1="4" y1="18" x2="20" y2="18"/>
  </svg>
);


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

// --- VERTICAL SONG LIST COMPONENT (WITH "SEE LESS") ---
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
                           {currentSong?.id === song.id && isPlaying 
                                ? <SoundWaveIcon />
                                : <span>{index + 1}</span>
                           }
                        </div>
                        <img 
                            src={song.albumArt} 
                            alt={song.title} 
                            className="song-list-artwork" 
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/000000/FFFFFF?text=Err'; }}
                        />
                        <div className="song-list-details">
                            <span className="song-title">{song.title}</span>
                            <span className="song-artist">{song.artist}</span>
                        </div>
                        <button className="song-list-play-button">
                             {currentSong?.id === song.id && isPlaying ? <PauseIcon size={20}/> : <PlayIcon size={20}/>}
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
const FavoriteSongsList = ({ songs, favoriteSongIds, onSongSelect, currentSong, isPlaying }) => {
    const favoriteSongs = songs.filter((song) => favoriteSongIds.includes(song.id));
  
    return (
      <section className="music-section">
        <h2 className="section-title">Favorite Songs</h2>
        {favoriteSongs.length > 0 ? (
          <div className="vertical-song-list">
            {favoriteSongs.map((song, index) => (
              <div
                key={song.id}
                className={`song-list-item ${currentSong?.id === song.id ? 'active' : ''}`}
                onClick={() => onSongSelect(song.id)}
              >
                <div className="song-list-number">
                  {currentSong?.id === song.id && isPlaying ? (
                    <SoundWaveIcon />
                  ) : (
                    <span>{index + 1}</span>
                  )}
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
                  {currentSong?.id === song.id && isPlaying ? (
                    <PauseIcon size={20} />
                  ) : (
                    <PlayIcon size={20} />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-favorites">No favorite songs yet.</p>
        )}
      </section>
    );
  };

// --- PROFILE PAGE COMPONENT ---
const ProfilePage = ({ session, onBack }) => {
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [username, setUsername] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(''); // New bio field
    const user = session.user;
  
    useEffect(() => {
      const getProfile = async () => {
        try {
          setLoading(true);
          const { data, error, status } = await supabase
            .from('profiles')
            .select(`username, avatar_url, bio`) // Include bio in the query
            .eq('id', user.id)
            .single();
  
          if (error && status !== 406) {
            throw error;
          }
  
          if (data) {
            setUsername(data.username);
            setAvatarUrl(data.avatar_url);
            setBio(data.bio || ''); // Set bio, default to empty if null
          }
        } catch (error) {
          console.error('Error loading user data:', error.message);
        } finally {
          setLoading(false);
        }
      };
  
      getProfile();
    }, [session]);
  
    const handleLogout = async () => {
      setLoading(true);
      await supabase.auth.signOut();
    };
  
    const handleUsernameSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const { error } = await supabase
          .from('profiles')
          .upsert({ id: user.id, username, bio, updated_at: new Date() }); // Update bio along with username
        if (error) throw error;
        setIsEditing(false);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const uploadAvatar = async (event) => {
      try {
        setUploading(true);
        if (!event.target.files || event.target.files.length === 0) {
          throw new Error('You must select an image to upload.');
        }
  
        const file = event.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}.${fileExt}`;
        const filePath = `${fileName}`;
  
        let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
        if (uploadError) throw uploadError;
  
        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
  
        const { error: updateError } = await supabase.from('profiles').upsert({ id: user.id, avatar_url: publicUrl });
        if (updateError) throw updateError;
  
        setAvatarUrl(publicUrl);
      } catch (error) {
        alert(error.message);
      } finally {
        setUploading(false);
      }
    };
  
    if (loading) {
      return <LoadingIndicator />;
    }
  
    return (
      <div className="profile-page">
        <button className="back-button" onClick={onBack}>
          <ArrowLeftIcon /> Back to Music
        </button>
        <header className="profile-header">
          <div className="profile-avatar-wrapper">
            <img
              src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(username || user.email)}&background=0D8ABC&color=fff&size=128`}
              alt="Profile avatar"
              className="profile-avatar"
            />
            <label htmlFor="avatar-upload" className="avatar-upload-label">
              {uploading ? '...' : 'Change'}
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </div>
          <div className="profile-info">
            <h1>
              {isEditing ? (
                <form onSubmit={handleUsernameSubmit} className="username-edit-form">
                  <input
                    type="text"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    placeholder="Your Nickname"
                  />
                  <button type="submit" className="form-button" disabled={loading}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="form-button secondary"
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  {username || user.email}
                  <button
                    className="edit-icon-button"
                    onClick={() => setIsEditing(true)}
                    disabled={loading}
                  >
                    <PencilIcon />
                  </button>
                </>
              )}
            </h1>
            <p className="profile-email">Email: {user.email}</p>
            <p className="profile-join-date">
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </p>
            {isEditing && (
              <div className="bio-edit">
                <label htmlFor="bio-input">Bio:</label>
                <textarea
                  id="bio-input"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="form-input bio-input"
                  placeholder="Tell us about yourself..."
                  maxLength={200}
                />
                <p className="bio-char-count">{bio.length}/200</p>
              </div>
            )}
            {!isEditing && bio && <p className="profile-bio">{bio}</p>}
          </div>
        </header>
        <div className="profile-actions">
          <button className="form-button" onClick={handleLogout} disabled={loading}>
            Logout
          </button>
        </div>
      </div>
    );
  };
  

// --- MODAL COMPONENTS ---
const AuthModal = ({ isOpen, onClose }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAuthError(null);
        setMessage('');

        if (isLoginView) {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setAuthError(error.message);
            else onClose();
        } else {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) setAuthError(error.message);
            else setMessage('Check your email for the confirmation link!');
        }
        setLoading(false);
    };
    
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}><XIcon /></button>
                <h2 className="modal-title">{isLoginView ? 'Login' : 'Create Account'}</h2>
                {authError && <p className="auth-error">{authError}</p>}
                {message && <p className="auth-message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group"><label htmlFor="email">Email</label><input type="email" id="email" required className="form-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                    <div className="form-group"><label htmlFor="password">Password</label><input type="password" id="password" required className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                    <button type="submit" className="form-button" disabled={loading}>{loading ? 'Processing...' : (isLoginView ? 'Login' : 'Create Account')}</button>
                    <p className="form-switch">{isLoginView ? "Don't have an account?" : "Already have an account?"}<button type="button" onClick={() => { setIsLoginView(!isLoginView); setAuthError(null); setMessage(''); }}>{isLoginView ? 'Sign Up' : 'Login'}</button></p>
                </form>
            </div>
        </div>
    );
};

const SettingsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (<div className="modal-overlay" onClick={onClose}><div className="modal-content" onClick={e => e.stopPropagation()}><button className="modal-close-button" onClick={onClose}><XIcon /></button><h2 className="modal-title">Settings</h2><div className="setting-item"><label htmlFor="language">Language</label><select id="language" className="form-input"><option>English</option><option>Español</option></select></div><div className="setting-item"><label>Download Quality</label><div className="radio-group"><label><input type="radio" name="quality" value="wifi" defaultChecked /> Wi-Fi Only</label><label><input type="radio" name="quality" value="always" /> Always</label></div></div><div className="setting-item"><span>Data Saver</span><label className="toggle-switch"><input type="checkbox" /><span className="slider"></span></label></div><button className="form-button" onClick={onClose}>Save Changes</button></div></div>);
};

const NowPlayingView = ({ song, isPlaying, onPlayPause, onNext, onPrev, progress, onProgressChange, duration, formatTime, onClose, isFavorite, onToggleFavorite, isMoreMenuOpen, setIsMoreMenuOpen }) => {  
  return (
    <div className="now-playing-view">
        <div className="npv-header">
            <button className="npv-close-button" onClick={onClose}><ChevronDownIcon /></button>
            <span className="npv-header-title">Now Playing</span>
            <button className="npv-more-button" onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}>
              <MoreIcon />
            </button>
        </div>
        {isMoreMenuOpen && (
          <div className="more-menu">
            <button className="menu-item" onClick={() => { /* Share logic: e.g., navigator.share or copy link */ alert('Share: ' + song.title); setIsMoreMenuOpen(false); }}>
              <span>Share</span>
            </button>
            <button className="menu-item" onClick={() => { /* Go to artist: e.g., search or navigate */ alert('Go to artist: ' + song.artist); setIsMoreMenuOpen(false); }}>
              <span>Go to Artist</span>
            </button>
            <button className="menu-item" onClick={() => { /* Lyrics: e.g., fetch from API */ alert('Lyrics for: ' + song.title); setIsMoreMenuOpen(false); }}>
              <span>Lyrics</span>
            </button>
            <button className="menu-item" onClick={() => { /* Report issue */ alert('Report: ' + song.title); setIsMoreMenuOpen(false); }}>
              <span>Report a Problem</span>
            </button>
          </div>
        )}
        <div className="npv-content">
            <div className="npv-artwork-container">
                <img src={song.albumArt} alt={song.title} className="npv-artwork" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/500x500/000000/FFFFFF?text=Error'; }}/>
            </div>
            <div className="npv-details">
                <div style={{ flexGrow: 1 }}>
                  <h1 className="npv-title">{song.title}</h1>
                  <h2 className="npv-artist">{song.artist}</h2>
                </div>
                <button className="npv-favorite-button" onClick={() => onToggleFavorite(song.id)}>
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

// --- GLOBAL STYLES ---
const GlobalStyles = () => (
    <style>{`
      /* * The main app container holds the header, sidebar, and content.
       * We add padding at the bottom to create space for the player bar.
       * The '90px' should match your player's height.
      */
      /* Add or update these styles in the <style> block of the GlobalStyles component */

/* Ensure the app container takes full height and prevents overflow */
.app-container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-rows: 60px 1fr;
  grid-template-columns: 240px 1fr;
  height: 100vh;
  padding-bottom: 90px;
  box-sizing: border-box;
  overflow: hidden;
}

/* Header, Sidebar, and Main Content */
header {
  grid-area: header;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.sidebar {
  grid-area: sidebar;
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.main-content {
  grid-area: main;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Sidebar Toggle Button */
.sidebar-toggle {
  display: none; /* Hidden on PC */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-primary);
}

/* Sidebar Styles */
.sidebar-header {
  margin-bottom: 2rem;
  text-align: left;
}

.sidebar-logo {
  width: 80px;
  height: auto;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.sidebar-logo:hover {
  transform: scale(1.05);
}

.sidebar-nav {
  flex-grow: 1;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li a {
  display: block;
  padding: 0.75rem 0;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.sidebar-nav li a:hover {
  color: var(--text-primary);
}

.sidebar-nav li a.active {
  color: var(--accent-color);
  font-weight: 600;
}

.sidebar-actions {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
}

.sidebar-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
}

.sidebar-button:hover {
  background-color: var(--hover-bg);
  color: var(--text-primary);
}

/* Base & Theme Styles */
:root {
  --font-family: 'Inter', sans-serif;
  --transition-speed: 0.3s;
}

[data-theme='dark'] {
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --bg-tertiary: #2a2a2a;
  --bg-modal: #282828;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --border-color: #333333;
  --accent-color: #8B5CF6;
  --accent-color-light: rgba(29, 185, 84, 0.2);
  --hover-bg: #282828;
  --shadow-color: rgba(0, 0, 0, 0.5);
  --error-color: #f87171;
  --message-color: #4ade80;
}

[data-theme='light'] {
  --bg-primary: #f5f5f7;
  --bg-secondary: #ffffff;
  --bg-tertiary: #e5e5e5;
  --bg-modal: #ffffff;
  --text-primary: #1d1d1f;
  --text-secondary: #515154;
  --border-color: #d2d2d7;
  --accent-color: rgb(193, 139, 244);
  --accent-color-light: rgba(0, 122, 255, 0.1);
  --hover-bg: #e8e8e8;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --error-color: #ef4444;
  --message-color: #22c55e;
}

body {
  margin: 0;
  font-family: var(--font-family);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color var(--transition-speed), color var(--transition-speed);
}

/* Now Playing View */
.now-playing-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--bg-primary);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-sizing: border-box;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.app-container.now-playing-open .now-playing-view {
  transform: translateY(0);
  visibility: visible;
}

.app-container.now-playing-open {
  overflow: hidden;
}

body.now-playing-open {
  overflow: hidden;
  height: 100vh;
}

.npv-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding: 0 1rem;
}

.npv-header-title {
  font-weight: 600;
  color: var(--text-secondary);
}

.npv-close-button, .npv-more-button {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
}

.npv-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.npv-artwork-container {
  width: 100%;
  max-width: 450px;
  margin-bottom: 3rem;
}

.npv-artwork {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 15px 45px rgba(0,0,0,0.3);
}

.npv-details {
  width: 100%;
  text-align: left;
  margin-bottom: 2rem;
}

.npv-favorite-button {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
}

.npv-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.npv-artist {
  font-size: 1.2rem;
  color: var(--accent-color);
  margin: 0.5rem 0 0 0;
}

.npv-progress-container {
  width: 100%;
  margin-bottom: 1rem;
}

.npv-progress-bar {
  width: 100%;
  -webkit-appearance: none;
  background: var(--border-color);
  height: 6px;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.npv-progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: var(--text-primary);
  border-radius: 50%;
  margin-top: -5px;
}

.npv-time-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.npv-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 350px;
}

.npv-control-button {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
}

.npv-play-pause-button {
  background: var(--hover-bg);
  border: none;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  cursor: pointer;
}

.more-menu {
  position: absolute;
  top: 60px;
  right: 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.5rem 0;
  box-shadow: 0 10px 30px var(--shadow-color);
  z-index: 1001;
  min-width: 180px;
}
.menu-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.menu-item:hover {
  background-color: var(--hover-bg);
}

/* Footer Player Controls */
.footer-player-controls {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  box-sizing: border-box;
}

.footer-player-controls.no-song {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-player-controls.no-song .current-track-info {
  flex: none;
  text-align: center;
  font-size: 1rem;
  color: var(--text-secondary);
}

.footer-player-controls:not(.no-song) {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}

.current-track-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}

.footer-album-art {
  width: 56px;
  height: 56px;
  border-radius: 6px;
  flex-shrink: 0;
}

.footer-song-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.footer-song-title, .footer-song-artist {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-song-title {
  font-weight: 600;
}

.footer-song-artist {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.controls-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.control-button, .play-pause-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
}

.control-button:hover, .play-pause-button:hover {
  color: var(--text-primary);
}

.play-pause-button {
  background-color: var(--hover-bg);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
}

.play-pause-button:hover {
  transform: scale(1.05);
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 500px;
}

.progress-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
  min-width: 35px;
  text-align: center;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  cursor: pointer;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: var(--bg-tertiary);
  border-radius: 3px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: var(--text-primary);
  cursor: pointer;
  margin-top: -5px;
  transition: opacity 0.2s;
  opacity: 0;
}

.progress-container:hover input[type="range"]::-webkit-slider-thumb {
  opacity: 1;
}

.footer-right-controls {
  display: flex;
  justify-content: flex-end;
}

.volume-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 150px;
}

.volume-bar {
  cursor: pointer;
}

.volume-bar::-webkit-slider-runnable-track {
  background: var(--bg-tertiary);
}

.volume-bar::-webkit-slider-thumb {
  height: 12px;
  width: 12px;
  margin-top: -4px;
  opacity: 1;
}

/* Search Bar */
.search-bar-container { position: relative; }
.search-icon { position: absolute; top: 50%; left: 1rem; transform: translateY(-50%); color: var(--text-secondary); pointer-events: none; }
.search-input { width: 100%; box-sizing: border-box; padding: 0.75rem 1rem 0.75rem 3rem; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-size: 1rem; transition: border-color 0.2s; }
.search-input:focus { outline: none; border-color: var(--accent-color); }

/* Song Carousel and Vertical Song List */
.song-carousel {
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  padding: 0.5rem 0 1.5rem 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.song-carousel::-webkit-scrollbar { display: none; }

.song-card {
  width: 180px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s;
}

.song-card:hover { transform: translateY(-4px); }

.card-artwork-container { position: relative; margin-bottom: 0.75rem; }

.song-album-art {
  width: 100%;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
  display: block;
  box-shadow: 0 4px 12px var(--shadow-color);
}

.card-play-button {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.song-card:hover .card-play-button, .song-card.active .card-play-button {
  opacity: 1;
  transform: translateY(0);
}

.song-card.active .card-play-button {
  color: var(--accent-color);
}

.song-details {
  display: flex;
  flex-direction: column;
}

.song-title {
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-card.active .song-title {
  color: var(--accent-color);
}

.song-artist {
  font-size: 0.875rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sound-wave-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--accent-color-light);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  pointer-events: none;
}

.vertical-song-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.song-list-item {
  display: grid;
  grid-template-columns: 30px 40px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.song-list-item:hover {
  background-color: var(--hover-bg);
}

.song-list-item:hover .song-list-play-button {
  opacity: 1;
}

.song-list-item.active .song-title, .song-list-item.active .song-list-number {
  color: var(--accent-color);
}

.song-list-number {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: center;
}

.song-list-artwork {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.song-list-details {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.song-list-details .song-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.song-list-details .song-artist {
  font-size: 0.875rem;
  color: var(--text-secondary);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.song-list-play-button {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.see-more-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-weight: 600;
  cursor: pointer;
  padding: 0.75rem;
  text-align: left;
  transition: color 0.2s;
  margin-top: 0.5rem;
}

.see-more-button:hover {
  color: var(--text-primary);
}

/* Profile Page */
.back-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-button:hover {
  color: var(--text-primary);
  background-color: var(--hover-bg);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.profile-avatar-wrapper {
  position: relative;
  cursor: pointer;
}

.profile-avatar {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--border-color);
}

.avatar-upload-label {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
  opacity: 0;
  pointer-events: none;
}

.profile-avatar-wrapper:hover .avatar-upload-label {
  opacity: 1;
}

.profile-info h1 {
  font-size: 2.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.profile-info p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0;
}

.edit-icon-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
}

.edit-icon-button:hover {
  background-color: var(--hover-bg);
  color: var(--text-primary);
}

.username-edit-form {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.username-edit-form .form-input {
  max-width: 250px;
}

.username-edit-form .form-button {
  width: auto;
  padding: 0.75rem 1rem;
}

.profile-actions {
  margin-top: 3rem;
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
}

.profile-actions .form-button {
  max-width: 200px;
}

/* Auth Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: var(--bg-modal);
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 10px 30px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.modal-close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
}

.modal-close-button:hover {
  background-color: var(--hover-bg);
  color: var(--text-primary);
}

.modal-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-color);
}

.form-button {
  width: 100%;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  background-color: #8B5CF6;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.form-button:hover {
  opacity: 0.85;
}

.form-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-switch {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.form-switch button {
  background: none;
  border: none;
  color: var(--accent-color);
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem;
}

.auth-error {
  color: var(--error-color);
  text-align: center;
  margin-bottom: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
}

.auth-message {
  color: var(--message-color);
  text-align: center;
  margin-bottom: 1rem;
  background-color: rgba(34, 197, 94, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
}

/* Settings Modal */
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.setting-item:last-of-type {
  border-bottom: none;
}

.setting-item label, .setting-item span {
  font-weight: 500;
  color: var(--text-primary);
}

.setting-item .form-input {
  max-width: 150px;
}

.radio-group {
  display: flex;
  gap: 1rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: normal;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-tertiary);
  transition: .4s;
  border-radius: 28px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--accent-color);
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.modal-content .form-button {
  margin-top: 1.5rem;
}

/* Spinner */
.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid var(--border-color);
  border-bottom-color: var(--accent-color);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Library and Favorite Songs */
.no-favorites {
  text-align: center;
  color: var(--text-secondary);
  padding: 1rem;
  font-style: italic;
}
  .sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1099;
  display: none;
}
.sidebar-close {
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
}
.sidebar-close:hover {
  background-color: var(--hover-bg);
  color: var(--text-primary);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .app-container {
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 240px;
    height: 100vh;
    z-index: 1100;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .sidebar-toggle {
    display: block; /* Show toggle button on mobile */
  }
    .sidebar-overlay {
  display: block; /* Shown when sidebar is open */
}
.sidebar-close {
  display: block;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
header {
  padding: 0 1rem;
  justify-content: flex-start; /* Align toggle to left */
}
  .main-content {
    padding: 1rem;
  }
  .now-playing-view {
    padding: 0.5rem;
  }
  .npv-header {
    padding: 0 0.5rem;
  }
  .npv-header-title {
    font-size: 1rem;
  }
  .npv-close-button, .npv-more-button {
    padding: 0.3rem;
  }
  .npv-artwork-container {
    max-width: 300px;
    margin-bottom: 1.5rem;
  }
  .npv-artwork {
    border-radius: 8px;
  }
  .npv-title {
    font-size: 1.2rem;
  }
  .npv-artist {
    font-size: 0.9rem;
  }
  .npv-progress-container {
    margin-bottom: 0.5rem;
  }
  .npv-progress-bar {
    height: 8px;
  }
  .npv-progress-bar::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    margin-top: -6px;
  }
  .npv-time-info {
    font-size: 0.7rem;
  }
  .npv-controls {
    max-width: 100%;
    gap: 0.5rem;
  }
  .npv-play-pause-button {
    width: 50px;
    height: 50px;
  }
  .npv-control-button svg, .npv-play-pause-button svg {
    width: 20px;
    height: 20px;
  }
  .footer-player-controls {
    height: 70px;
    padding: 0 0.5rem;
  }
  .footer-player-controls:not(.no-song) {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .footer-right-controls {
    display: none;
  }
  .footer-album-art {
    width: 40px;
    height: 40px;
  }
  .footer-song-title {
    font-size: 0.9rem;
  }
  .footer-song-artist {
    font-size: 0.75rem;
  }
  .progress-container {
    max-width: 100%;
  }
  .progress-bar {
    height: 6px;
  }
  .progress-bar::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
  }
  .progress-time {
    font-size: 0.65rem;
  }
  .play-pause-button {
    width: 32px;
    height: 32px;
  }
  .control-button svg, .play-pause-button svg {
    width: 16px;
    height: 16px;
  }
  .song-carousel {
    gap: 1rem;
  }
  .song-card {
    width: 140px;
  }
  .song-album-art {
    height: 140px;
  }
  .card-play-button {
    width: 40px;
    height: 40px;
  }
  .song-title {
    font-size: 0.9rem;
  }
  .song-artist {
    font-size: 0.75rem;
  }
  .vertical-song-list {
    gap: 0.3rem;
  }
  .song-list-item {
    padding: 0.3rem;
    gap: 0.5rem;
  }
  .song-list-artwork {
    width: 32px;
    height: 32px;
  }
  .song-list-number {
    font-size: 0.8rem;
  }
  .song-list-details .song-title {
    font-size: 0.9rem;
  }
  .song-list-details .song-artist {
    font-size: 0.75rem;
  }
  .song-list-play-button svg {
    width: 16px;
    height: 16px;
  }
  .search-bar-container {
    margin-bottom: 1rem;
  }
  .search-input {
    padding: 0.5rem 0.5rem 0.5rem 2.5rem;
    font-size: 0.9rem;
  }
  .search-icon {
    left: 0.75rem;
  }
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .profile-avatar {
    width: 100px;
    height: 100px;
  }
  .profile-info h1 {
    font-size: 1.5rem;
  }
  .username-edit-form .form-input {
    max-width: 200px;
    font-size: 0.9rem;
  }
  .profile-email, .profile-join-date, .profile-bio {
    font-size: 0.85rem;
  }
  .bio-edit .bio-input {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
  .form-button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  .modal-content {
    padding: 1rem;
    max-width: 90%;
  }
  .modal-title {
    font-size: 1.2rem;
  }
  .form-input {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  .form-button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  .form-switch {
    font-size: 0.8rem;
  }
}}
    `}</style>
);

// --- MAIN APP COMPONENT ---
function App() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
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
  const [activeSection, setActiveSection] = useState('Listen Now'); // New state for active section
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  useEffect(() => {
    if (isNowPlayingViewOpen) {
      document.body.classList.add('now-playing-open');
    } else {
      document.body.classList.remove('now-playing-open');
    }
    return () => {
      document.body.classList.remove('now-playing-open');
    };
  }, [isNowPlayingViewOpen]);  // Cleanup on component unmount
  

  const audioRef = useRef(null);
  const currentSong = currentSongIndex !== null ? songs[currentSongIndex] : null;

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

  const topCharts = useMemo(() => songs.slice(0, 10), [songs]);
  const latestReleases = useMemo(() => songs.slice(10, 20), [songs]);
  const recommendations = useMemo(() => songs.slice(20, 30), [songs]);
  const searchResults = useMemo(() => !searchTerm ? [] : songs.filter(song => song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm, songs]);

  // --- HANDLERS ---
  const handleUserIconClick = () => { if (session) { setProfileView(true); } else { setAuthModalOpen(true); } };
  // New navigation handler
  const handleNavClick = (section) => {
    setProfileView(false); // Ensure profile view is closed
    setActiveSection(section);
    setSearchTerm(''); // Clear search when navigating
  };
  const toggleFavorite = (songId) => {
    setFavoriteSongs(prevFavorites => {
      if (prevFavorites.includes(songId)) {
        return prevFavorites.filter(id => id !== songId); // Unfavorite
      } else {
        return [...prevFavorites, songId]; // Favorite
      }
    });
  };

  const playSongById = (songId) => {
    const songIndex = songs.findIndex(song => song.id === songId);
    if (songIndex !== -1) {
        if (currentSongIndex === songIndex) {
            setIsPlaying(prev => !prev);
        } else {
            setCurrentSongIndex(songIndex);
            setIsPlaying(true);
        }
        setNowPlayingViewOpen(true);
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

  return (
    <>
      <GlobalStyles />
      <div className={`app-container ${isNowPlayingViewOpen ? 'now-playing-open' : ''}`} data-theme={theme}>
      <header>
  <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(prev => !prev)}>
    <MenuIcon />
  </button>
</header>
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={() => setIsSidebarOpen(false)}>
  <CloseIcon size={24} />
</button>
        <div className="sidebar-header">
  <img src="odelogo.png" alt="Ode Logo" className="sidebar-logo" />
</div>            <nav className="sidebar-nav">
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
              <button className="sidebar-button" title="Settings" onClick={() => setSettingsModalOpen(true)}><SettingsIcon /></button>
              <button className="sidebar-button" title="Profile" onClick={handleUserIconClick}><UserIcon /></button>
              <button className="sidebar-button" title="Toggle Theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</button>
            </div>
        </aside>
        <main className="main-content">
            {isProfileView && session ? (
                <ProfilePage session={session} onBack={() => setProfileView(false)} />
            ) : (
                <>
                    <div className="search-bar-container">
                        <div className="search-icon"><SearchIcon /></div>
                        <input type="text" placeholder="Search for songs or artists..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    {renderMainContent()}
                </>
            )}
        </main>
        <footer className={`footer-player-controls ${currentSong ? '' : 'no-song'}`} onClick={() => currentSong && setNowPlayingViewOpen(true)}>
          {currentSong ? (
            <>
              <div className="current-track-info">
                <img src={currentSong.albumArt} alt={currentSong.title} className="footer-album-art" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/56x56/000000/FFFFFF?text=Err'; }} />
                <div className="footer-song-details"><span className="footer-song-title">{currentSong.title}</span><span className="footer-song-artist">{currentSong.artist}</span></div>
              </div>
              <div className="footer-controls">
                <div className="controls-container">
                  <button onClick={playPrevious} className="control-button"><SkipBackIcon /></button>
                  <button onClick={togglePlayPause} className="play-pause-button">{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
                  <button onClick={playNext} className="control-button"><SkipForwardIcon /></button>
                  <div className="progress-container">
                    <span className="progress-time">{formatTime(progress > 0 ? (progress / 100) * duration : 0)}</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress || 0}
                      onChange={handleProgressBarChange}
                      className="progress-bar"
                      style={{
                        background: `linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${progress || 0}%, var(--bg-tertiary) ${progress || 0}%, var(--bg-tertiary) 100%)`
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
                      background: `linear-gradient(to right, var(--text-secondary) 0%, var(--text-secondary) ${volume * 100}%, var(--bg-tertiary) ${volume * 100}%, var(--bg-tertiary) 100%)`
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="current-track-info">No song selected</div>
          )}
        </footer>
        {isSidebarOpen && (
  <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
)}
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
    </>
  );
}

export default App;
