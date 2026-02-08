import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddAnimal.css'; 

function AddAnimal({ onAdd }) {
  // CONCEPT: Controlled Components (Form State)
  const [formData, setFormData] = useState({
    name: '',
    facts: '', 
    image: '', 
    sound: '', 
    category: 'wild', 
    habitat: ''
  });

  // CONCEPT: Refs
  // We use useRef to focus the "Name" input automatically when page loads
  const nameInputRef = useRef(null);
  const navigate = useNavigate();

  // CONCEPT: Lifecycle (useEffect)
  useEffect(() => {
    nameInputRef.current.focus(); // Direct DOM manipulation using Ref
  }, []);

  // CONCEPT: Event Handling (onChange)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // CONCEPT: Handle the Audio File Upload
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Magic Concept: Create a temporary URL for the uploaded file
      const tempAudioUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        sound: tempAudioUrl 
      }));
    }
  };

  // CONCEPT: Event Handling (onSubmit)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload (Standard React Form concept)
    
    // Basic Validation
    if (!formData.name || !formData.image || !formData.sound) {
      alert("Please provide a name, image link, and sound link!");
      return;
    }

    // Call the parent function
    onAdd(formData);
    
    // Redirect back to gallery to see the new animal
    navigate('/gallery');
  };

  return (
    <div className="add-animal-container">
      <h2>Add a New Friend 🦁</h2>
      <form onSubmit={handleSubmit} className="animal-form">
        
        <div className="form-group">
          <label>Animal Name:</label>
          <input 
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleChange}
            ref={nameInputRef} // Attaching Ref here
            placeholder="e.g. Giraffe"
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="wild">Wild Animal</option>
            <option value="farm">Farm Animal</option>
            <option value="birds">Bird</option>
            <option value="insects">Insect</option>
          </select>
        </div>

        <div className="form-group">
          <label>Habitat:</label>
          <input 
            type="text" 
            name="habitat"
            value={formData.habitat} 
            onChange={handleChange}
            placeholder="e.g. Savannah"
          />
        </div>

        <div className="form-group">
          <label>Fun Fact:</label>
          <textarea 
            name="facts"
            value={formData.facts}
            onChange={handleChange}
            placeholder="e.g. Giraffes have purple tongues!"
          />
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input 
            type="text" 
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label>Animal Sound (MP3):</label>
          <input 
            type="file" 
            accept="audio/*" // Only accept audio files
            onChange={handleAudioUpload} 
          />
        </div>

        <button type="submit" className="submit-btn">Add Animal</button>
      </form>
    </div>
  );
}

export default AddAnimal;