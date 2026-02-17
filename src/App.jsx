import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import AnimalGallery from './components/AnimalGallery';
import MatchingGame from './components/MatchingGame';
import Quiz from './components/Quiz';
import AddAnimal from './components/AddAnimal';
import { fetchAnimals, createAnimal } from './services/api';
import './App.css';

function App() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimals = async () => {
      try {
        const data = await fetchAnimals();
        setAnimals(data);
      } catch (error) {
        console.error("Failed to load animals", error);
      } finally {
        setLoading(false);
      }
    };
    loadAnimals();
  }, []);

  // Function to update the animals list.
  const handleAddAnimal = async (animalData) => {
    try {
      const newAnimal = await createAnimal(animalData);
      setAnimals([...animals, newAnimal]);
    } catch (error) {
      console.error("Failed to create animal", error);
      alert("Failed to create animal. Check console for details.");
    }
  };

  if (loading) {
    return <div className="loading">Loading Sensory Safari... 🦁</div>;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<AnimalGallery animals={animals} />} />
          <Route path="/add" element={<AddAnimal onAdd={handleAddAnimal} />} />
          <Route path="/matching" element={<MatchingGame animals={animals} />} />
          <Route path="/quiz" element={<Quiz animals={animals} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
