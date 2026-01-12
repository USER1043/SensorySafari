import { useState } from 'react';
import AnimalCard from './AnimalCard';
import { animals, getAnimalsByCategory } from '../data/animals';
import './AnimalGallery.css';

function AnimalGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'farm', 'wild', 'birds', 'insects'];

  const filteredAnimals = selectedCategory === 'all' 
    ? animals 
    : getAnimalsByCategory(selectedCategory);

  return (
    <div className="animal-gallery">
      <h1 className="gallery-title">Animal Gallery</h1>
      <p className="gallery-subtitle">Click on any animal to learn more!</p>
      
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
          >
            {category === 'all' ? '🌟 All Animals' : 
             category === 'farm' ? '🚜 Farm Animals' :
             category === 'wild' ? '🌲 Wild Animals' :
             category === 'birds' ? '🐦 Birds' :
             '🐛 Insects'}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredAnimals.map(animal => (
          <AnimalCard 
            key={animal.id} 
            animal={animal} 
            showFacts={true}
          />
        ))}
      </div>
      
      {filteredAnimals.length === 0 && (
        <p className="no-animals">No animals found in this category.</p>
      )}
    </div>
  );
}

export default AnimalGallery;