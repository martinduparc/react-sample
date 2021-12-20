import { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Results from './Results';
import './css/app.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <header className="bg-gray-800 shadow h-16 px-6 grid content-center">
          <h1 className="font-bold text-white">React sample app</h1>
        </header>
        <main className="py-6 px-6">          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="results/:season/:round" element={<Results />} />
          </Routes>
        </main>
      </div>
    );
  }
}