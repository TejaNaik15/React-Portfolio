import React, { useState } from 'react';
import { FiSettings, FiSun, FiMoon, FiMusic } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useMusic } from '../context/MusicContext';

const SettingsToggle = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <div className="settings-toggle">
      <button
        type="button"
        aria-label="Settings"
        className="settings-btn"
        onClick={() => setOpen((v) => !v)}
      >
        <FiSettings />
      </button>
      {open && (
        <div className="settings-pop">
          <button
            type="button"
            aria-label="Toggle theme"
            className="settings-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button
            type="button"
            aria-label="Toggle music"
            className="settings-btn"
            onClick={toggleMusic}
            title={isPlaying ? 'Stop music' : 'Play music'}
          >
            <FiMusic style={{ color: isPlaying ? '#13ADC7' : undefined }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsToggle;
