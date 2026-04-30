import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipBack, SkipForward, Settings, Subtitles, List,
  ArrowLeft, ThumbsUp, Plus, Check,
} from 'lucide-react';
import { allContent, continueWatching } from '../data/mockData';
import { useApp } from '../context/AppContext';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleMyList, isInMyList } = useApp();

  // Find content
  const content =
    allContent.find((c) => c.id === id) ||
    continueWatching.find((c) => c.id === id) ||
    allContent[0];
  const inList = isInMyList(content?.id);

  // Player state
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(7320); // 2h 2m mock
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState('1080p');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [buffered, setBuffered] = useState(35);
  const [skipIndicator, setSkipIndicator] = useState(null);
  const [seeking, setSeeking] = useState(false);

  const containerRef = useRef(null);
  const hideTimer = useRef(null);
  const progressTimer = useRef(null);

  // Auto-progress simulation
  useEffect(() => {
    if (playing) {
      progressTimer.current = setInterval(() => {
        setProgress((p) => {
          if (p >= duration) { setPlaying(false); return duration; }
          return p + playbackRate;
        });
        setBuffered((b) => Math.min(b + 0.2, 100));
      }, 1000);
    }
    return () => clearInterval(progressTimer.current);
  }, [playing, duration, playbackRate]);

  // Controls auto-hide
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  }, [playing]);

  useEffect(() => {
    resetHideTimer();
    return () => clearTimeout(hideTimer.current);
  }, [playing]);

  const handleMouseMove = () => resetHideTimer();

  const skipSeconds = (secs) => {
    setProgress((p) => Math.max(0, Math.min(p + secs, duration)));
    setSkipIndicator(secs > 0 ? 'forward' : 'backward');
    setTimeout(() => setSkipIndicator(null), 700);
  };

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case ' ': e.preventDefault(); setPlaying((p) => !p); break;
      case 'ArrowRight': skipSeconds(10); break;
      case 'ArrowLeft': skipSeconds(-10); break;
      case 'm': case 'M': setMuted((m) => !m); break;
      case 'f': case 'F': setFullscreen((f) => !f); break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const mockEpisodes = Array.from({ length: 8 }, (_, i) => ({
    ep: i + 1,
    title: `Episode ${i + 1}: ${['The Beginning', 'Shadows Rise', 'Convergence', 'The Reckoning', 'Into the Void', 'Last Stand', 'Echoes', 'The End'][i]}`,
    duration: `${42 + i * 3}m`,
    thumb: content?.thumbnail,
  }));

  const progressPercent = (progress / duration) * 100;
  const bufferedPercent = (buffered / 100) * 100;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`relative bg-black overflow-hidden select-none ${fullscreen ? 'fixed inset-0 z-[100]' : 'w-full h-screen'}`}
      onMouseMove={handleMouseMove}
      onClick={() => { setPlaying((p) => !p); resetHideTimer(); }}
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      {/* Video Placeholder — Cinematic black with film grain effect */}
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Background image as video placeholder */}
          <img
            src={content?.thumbnail}
            alt={content?.title}
            className="w-full h-full object-cover opacity-30"
            style={{ filter: 'blur(2px) saturate(0.3)' }}
          />
          {/* Film grain texture overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4"/><feColorMatrix type="saturate" values="0"/></filter><rect width="300" height="300" filter="url(%23n)" opacity="0.5"/></svg>)',
              backgroundRepeat: 'repeat',
            }}
          />
        </div>
      </div>

      {/* Skip Indicator */}
      <AnimatePresence>
        {skipIndicator && (
          <motion.div
            key={skipIndicator}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-1/2 -translate-y-1/2 ${skipIndicator === 'forward' ? 'right-1/4' : 'left-1/4'} flex flex-col items-center gap-1 pointer-events-none`}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-full p-6">
              {skipIndicator === 'forward' ? (
                <SkipForward className="w-8 h-8 text-white" />
              ) : (
                <SkipBack className="w-8 h-8 text-white" />
              )}
            </div>
            <span className="text-white/80 text-sm font-medium">10 seconds</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Play/Pause feedback */}
      <AnimatePresence>
        {!playing && showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-full p-6">
              <Play className="w-16 h-16 text-white fill-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="bg-gradient-to-b from-black/80 to-transparent pt-4 pb-16 px-6 flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(-1)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.button>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest">Now Playing</p>
                <p className="text-white font-semibold text-lg">{content?.title}</p>
                {content?.episode && <p className="text-gray-400 text-sm">{content.episode}</p>}
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleMyList(content)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {inList ? <Check className="w-5 h-5 text-green-400" /> : <Plus className="w-5 h-5" />}
                </button>
                <button className="text-white/70 hover:text-white transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div
              className="bg-gradient-to-t from-black/95 via-black/60 to-transparent pb-6 pt-20 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Scrubber */}
              <div className="relative mb-4 group/progress">
                {/* Buffered bar */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-1 bg-white/25 rounded-full transition-all duration-300"
                  style={{ width: `${bufferedPercent}%` }}
                />
                {/* Progress input */}
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={progress}
                  onChange={(e) => { setProgress(Number(e.target.value)); setSeeking(true); }}
                  onMouseUp={() => setSeeking(false)}
                  className="progress-slider w-full relative z-10"
                  style={{
                    background: `linear-gradient(to right, #e50914 0%, #e50914 ${progressPercent}%, transparent ${progressPercent}%, transparent 100%)`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-4">
                {/* Play / Pause */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPlaying((p) => !p)}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  {playing ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white" />}
                </motion.button>

                {/* Skip backward */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => skipSeconds(-10)}
                  className="text-white/80 hover:text-white transition-colors relative group/skip"
                >
                  <SkipBack className="w-6 h-6" />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 opacity-0 group-hover/skip:opacity-100 whitespace-nowrap">-10s</span>
                </motion.button>

                {/* Skip forward */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => skipSeconds(10)}
                  className="text-white/80 hover:text-white transition-colors relative group/skip"
                >
                  <SkipForward className="w-6 h-6" />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 opacity-0 group-hover/skip:opacity-100 whitespace-nowrap">+10s</span>
                </motion.button>

                {/* Volume */}
                <div className="flex items-center gap-2 group/vol">
                  <button
                    onClick={() => setMuted((m) => !m)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileHover={{ width: 80, opacity: 1 }}
                    className="overflow-hidden"
                  >
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={muted ? 0 : volume}
                      onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
                      className="volume-slider"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </motion.div>
                </div>

                {/* Time */}
                <span className="text-white/70 text-sm font-mono">
                  {formatTime(progress)} / {formatTime(duration)}
                </span>

                <div className="flex-1" />

                {/* Subtitles */}
                <button
                  onClick={() => setShowSubtitles((s) => !s)}
                  className={`transition-colors ${showSubtitles ? 'text-red-400' : 'text-white/70 hover:text-white'}`}
                >
                  <Subtitles className="w-5 h-5" />
                </button>

                {/* Episodes */}
                <button
                  onClick={() => { setShowEpisodes((s) => !s); setShowSettings(false); }}
                  className={`transition-colors ${showEpisodes ? 'text-red-400' : 'text-white/70 hover:text-white'}`}
                >
                  <List className="w-5 h-5" />
                </button>

                {/* Settings */}
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowSettings((s) => !s); setShowEpisodes(false); }}
                    className={`transition-colors ${showSettings ? 'text-red-400' : 'text-white/70 hover:text-white'}`}
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-10 right-0 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 w-52 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="text-white font-semibold text-sm mb-3">Playback Settings</p>
                        <div className="mb-3">
                          <p className="text-gray-400 text-xs mb-2">Quality</p>
                          {['Auto', '4K', '1080p', '720p', '480p'].map((q) => (
                            <button
                              key={q}
                              onClick={() => setQuality(q)}
                              className={`block w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${quality === q ? 'text-red-400 bg-red-400/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-2">Speed</p>
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((r) => (
                            <button
                              key={r}
                              onClick={() => setPlaybackRate(r)}
                              className={`block w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${playbackRate === r ? 'text-red-400 bg-red-400/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                            >
                              {r === 1 ? 'Normal' : `${r}x`}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fullscreen */}
                <button
                  onClick={() => setFullscreen((f) => !f)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {fullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Episodes Side Panel */}
      <AnimatePresence>
        {showEpisodes && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 h-full w-80 bg-[#111]/95 backdrop-blur-xl border-l border-white/10 overflow-y-auto z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-bold text-lg">Episodes</h3>
                <button onClick={() => setShowEpisodes(false)} className="text-gray-400 hover:text-white text-xl leading-none">×</button>
              </div>
              <div className="space-y-3">
                {mockEpisodes.map((ep) => (
                  <motion.button
                    key={ep.ep}
                    whileHover={{ x: 4 }}
                    className="flex gap-3 w-full text-left group"
                  >
                    <div className="relative rounded-lg overflow-hidden shrink-0 w-28 h-16 bg-gray-800">
                      <img src={ep.thumb} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                      <span className="absolute top-1 left-1 text-xs text-white/80 font-bold">E{ep.ep}</span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold leading-snug mb-1 group-hover:text-red-400 transition-colors">{ep.title}</p>
                      <p className="text-gray-500 text-xs">{ep.duration}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtitle indicator */}
      <AnimatePresence>
        {showSubtitles && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/80 text-white text-base px-6 py-2 rounded-lg backdrop-blur-sm border border-white/10"
          >
            Previously on Hollow Empire...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
