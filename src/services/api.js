const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchAnimals = async () => {
    try {
        const response = await fetch(`${API_URL}/animals`);
        if (!response.ok) {
            throw new Error('Failed to fetch animals');
        }
        const data = await response.json();

        // Transform data to match frontend expectations
        // Frontend expects: id, name, category, image, audio or sound, facts, habitat
        // Backend provides: _id, name, category, image: { url, ... }, audio: { url, ... }, facts, habitat

        return data.map(animal => ({
            id: animal._id, // Use MongoDB _id as the unique ID
            name: animal.name,
            category: animal.category,
            image: animal.image?.url || '',
            sound: animal.audio?.url || '', // Frontend uses 'sound', backend has 'audio' object
            facts: animal.facts || animal.description || '',
            habitat: animal.habitat || '',
        }));
    } catch (error) {
        console.error('Error fetching animals:', error);
        return [];
    }
};

export const createAnimal = async (animalData) => {
    try {
        const isFormData = animalData instanceof FormData;
        const headers = isFormData ? {} : { 'Content-Type': 'application/json' };

        const response = await fetch(`${API_URL}/animals`, {
            method: 'POST',
            headers: headers,
            body: isFormData ? animalData : JSON.stringify(animalData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create animal');
        }

        const newAnimal = await response.json();

        // Transform the new animal to match frontend structure if needed
        return {
            id: newAnimal._id,
            name: newAnimal.name,
            category: newAnimal.category,
            image: newAnimal.image?.url || '',
            sound: newAnimal.audio?.url || '',
            facts: newAnimal.facts || newAnimal.description || '',
            habitat: newAnimal.habitat || ''
        };
    } catch (error) {
        console.error('Error creating animal:', error);
        throw error;
    }
};
