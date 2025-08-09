import React, { useState, useCallback } from 'react';
import './App.css';
import FormBuilder from './components/FormBuilder/FormBuilder';
import Header from './components/Header/Header';
import { FormProvider } from './context/FormContext';

function App() {
  const [currentView, setCurrentView] = useState('builder'); // 'builder', 'preview', 'export'

  const handleViewChange = useCallback((view) => {
    setCurrentView(view);
  }, []);

  return (
    <FormProvider>
      <div className="App">
        <Header currentView={currentView} onViewChange={handleViewChange} />
        <main className="main-content">
          <FormBuilder currentView={currentView} />
        </main>
      </div>
    </FormProvider>
  );
}

export default App;