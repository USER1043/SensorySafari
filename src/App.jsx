import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import AnimalGallery from './components/AnimalGallery';
import MatchingGame from './components/MatchingGame';
import Quiz from './components/Quiz';
import AddAnimal from './components/AddAnimal';
import { animals as initialAnimals } from './data/animals';
import './App.css';

function App() {
  const [animals, setAnimals] = useState(initialAnimals);

  // Function to update the animals list.
  const handleAddAnimal = (newAnimal) => {
    // Generate a new ID based on the last ID
    const nextId = animals.length > 0 ? Math.max(...animals.map(a => a.id)) + 1 : 1;
    const animalWithId = { ...newAnimal, id: nextId };
    setAnimals([...animals, animalWithId]);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<AnimalGallery animals={animals} />} />
          <Route path="/add" element={<AddAnimal onAdd={handleAddAnimal} />} />
          <Route path="/matching" element={<MatchingGame />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
