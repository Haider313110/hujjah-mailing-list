import { useState } from 'react';
import { LandingPage } from './LandingPage';
import { SignupForm } from './SignupForm';

function App() {
  const [showSignup, setShowSignup] = useState(false);

  if (showSignup) {
    return <SignupForm onBack={() => setShowSignup(false)} />;
  }

  return <LandingPage onJoinMailingList={() => setShowSignup(true)} />;
}

export default App;
