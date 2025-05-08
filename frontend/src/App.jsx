// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
import React from 'react';
import WeatherCard from './components/WeatherCard';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-200 to-indigo-400 flex items-center justify-center">
      <WeatherCard />
    </div>
  );
};

export default App;
