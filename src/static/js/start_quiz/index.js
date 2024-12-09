import React from 'react';
import { createRoot } from 'react-dom/client';
import StartQuizComponent from './StartQuiz';
import { Toaster } from 'sonner'

const App = () => {
    return (
        <div className='mt-20'>
            <Toaster />
            <StartQuizComponent/>
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App/>);
