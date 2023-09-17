import { useEffect } from 'react';

export default function IdleTimeout({ timeout=1800000, onTimeout }) {
  let idleTimer;


  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      onTimeout(); // Call the provided callback function on timeout
    }, timeout);
  }

  // Add event listeners for user activity
  useEffect(() => {
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    // Add more event listeners as needed (e.g., for touch events)

    // Initialize the timer when the component mounts
    resetIdleTimer();

    // Clean up event listeners when the component unmounts
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      // Remove other event listeners as needed
    };
  }, []);

  return null; // This component doesn't render anything
}


