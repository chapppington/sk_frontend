"use client";

import { useEffect, useState } from "react";
import { soundConfig } from "@/utils/sound";
import AudioNotification from "../ui/AudioNotification";

const MusicToggle = () => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Initialize state from soundConfig
    const muteState = soundConfig.getMuteState();
    setIsMuted(muteState);

    // Add click event listener to the document to handle user interaction
    const handleUserInteraction = () => {
      soundConfig.handleUserInteraction();
    };

    // Listen for any user interaction
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  const handleToggle = () => {
    const newMuteState = soundConfig.toggleMute();
    setIsMuted(newMuteState);
  };

  // Add keyboard shortcut (Alt + M) to toggle mute
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "m") {
        handleToggle();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      <AudioNotification />
      <button
        onClick={handleToggle}
        className="fixed top-4 right-4 z-[100] hover:bg-black/5 p-3 rounded-full shadow-lg transition-all duration-300 group"
        title="Toggle all sounds (Alt + M)"
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMuted ? (
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </>
            ) : (
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </>
            )}
          </svg>
          <div
            className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 relative ${
              !isMuted ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                !isMuted ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </button>
    </>
  );
};

export default MusicToggle;
