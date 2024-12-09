import React from 'react';
import { createRoot } from 'react-dom/client';
import Quiz from './Quiz';  // Assuming you save the Quiz component in a file named Quiz.js
import { Toaster } from 'sonner';

const App = () => {
  const quizUUID = window.location.pathname.split('/')[2];

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <Quiz quizUuid={quizUUID} />
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App/>);