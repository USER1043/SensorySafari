import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import AnimalGallery from './components/gallery/AnimalGallery';
import MatchingGame from './components/games/MatchingGame';
import Quiz from './components/games/Quiz';
import RuleValidation from './components/games/RuleValidation';
import AddAnimal from './components/animals/AddAnimal';
import About from './components/about/About';
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

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<AnimalGallery animals={animals} loading={loading} />} />
          <Route path="/add" element={<AddAnimal onAdd={handleAddAnimal} />} />
          <Route path="/matching" element={<MatchingGame animals={animals} loading={loading} />} />
          <Route path="/quiz" element={<Quiz animals={animals} loading={loading} />} />
          <Route path="/rule-validation" element={<RuleValidation />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
