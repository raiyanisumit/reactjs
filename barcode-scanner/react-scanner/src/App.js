import React from 'react';
import './App.css';
import BarcodeScanner from './BarcodeScanner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BarcodeScanner />
      </header>
    </div>
  );
}

export default App;