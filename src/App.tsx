import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { LandingPage } from './LandingPage';
import { SignupForm } from './SignupForm';

function App() {
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (showSignup) {
      window.scrollTo(0, 0);
    }
  }, [showSignup]);

  return (
    <>
      {showSignup ? (
        <SignupForm onBack={() => setShowSignup(false)} />
      ) : (
        <LandingPage onJoinMailingList={() => setShowSignup(true)} />
      )}
      <Analytics />
    </>
  );
}

export default App;
