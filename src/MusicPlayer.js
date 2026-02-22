import React from 'react';

const MusicPlayer = ({ 
  playlist, 
  currentTrackIndex, 
  isPlaying, 
  togglePlay, 
  playNext, 
  playPrev, 
  onTrackSelect 
}) => {
  const currentTrack = playlist[currentTrackIndex];

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      {/* Player UI */}
      <div 
        style={{ 
          backgroundColor: '#1e1e1e', 
          color: '#a9dc76', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
          fontFamily: "'Courier New', Courier, monospace"
        }}
      >
        <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#ff6188' }}>
          Now Playing:
        </p>
        <h3 style={{ margin: '0 0 20px 0', fontWeight: 'normal' }}>
          {currentTrack.title}
        </h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button onClick={playPrev} style={buttonStyle}>
            ⏮ Prev
          </button>
          
          <button onClick={togglePlay} style={{ ...buttonStyle, width: '80px' }}>
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          
          <button onClick={playNext} style={buttonStyle}>
            Next ⏭
          </button>
        </div>
      </div>

      {/* Playlist display */}
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #C6C1AB', paddingBottom: '5px' }}>
          Local Tracks
        </h4>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {playlist.map((track, index) => (
            <li 
              key={track.id} 
              style={{ 
                padding: '8px 0', 
                cursor: 'pointer',
                color: index === currentTrackIndex ? '#000' : '#666',
                fontWeight: index === currentTrackIndex ? 'bold' : 'normal',
              }}
              onClick={() => onTrackSelect(index)}
            >
              {index === currentTrackIndex ? '▶ ' : '  '} {track.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontFamily: 'inherit'
};

export default MusicPlayer;