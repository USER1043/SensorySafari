import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddAnimal.css';

function AddAnimal({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    facts: '',
    category: 'wild',
    habitat: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [soundFile, setSoundFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSoundFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !imageFile || !soundFile) {
      alert("Please provide a name, image, and sound!");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('facts', formData.facts);
      data.append('category', formData.category);
      data.append('habitat', formData.habitat);
      data.append('image', imageFile);
      data.append('sound', soundFile);

      await onAdd(data);
      navigate('/gallery');
    } catch (error) {
      alert('Failed to add animal: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
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
            ref={nameInputRef}
            placeholder="e.g. Giraffe"
            required
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
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {previewImage && <img src={previewImage} alt="Preview" className="image-preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
        </div>

        <div className="form-group">
          <label>Animal Sound (MP3):</label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Animal'}
        </button>
      </form>
    </div>
  );
}

export default AddAnimal;