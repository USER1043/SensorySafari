const API_BASE = import.meta.env.VITE_API_URL;
const API_URL = API_BASE + "/api";

// VITE_API_URL is baked in at build time, so a missing value on the host's build env
// produces requests to "undefined/api/..." instead of the backend.
if (!API_BASE) {
    console.error('[api] VITE_API_URL is not set at build time. Requests will go to', API_URL);
} else {
    console.info('[api] Using backend:', API_URL);
}

// Turns the various ways the request can fail into one readable message.
const describeFetchFailure = async (url, err, response) => {
    if (err) {
        // fetch() only rejects on network-level failures: backend down/asleep, wrong URL,
        // CORS rejection, or mixed content (https page calling an http API).
        return `Could not reach the backend at ${url}. It may be offline or asleep, the URL may be wrong, ` +
            `or the request was blocked by CORS (check FRONTEND_URL on the backend). Original error: ${err.message}`;
    }
    const body = await response.text().catch(() => '');
    return `Backend responded ${response.status} ${response.statusText} for ${url}: ${body.slice(0, 200)}`;
};

export const fetchAnimals = async () => {
    const url = `${API_URL}/animals`;
    let response;
    try {
        response = await fetch(url);
    } catch (err) {
        const message = await describeFetchFailure(url, err);
        console.error('[api]', message);
        throw new Error(message, { cause: err });
    }

    if (!response.ok) {
        const message = await describeFetchFailure(url, null, response);
        console.error('[api]', message);
        throw new Error(message);
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        // Usually means VITE_API_URL points at the frontend host, which serves index.html.
        const message = `Expected JSON from ${url} but got "${contentType}". VITE_API_URL probably points at the wrong host.`;
        console.error('[api]', message);
        throw new Error(message);
    }

    try {
        const data = await response.json();

        // Transform data to match frontend expectations
        // Frontend expects: id, name, category, image, audio or sound, facts, habitat
        // Backend provides: _id, name, category, image: { url, ... }, audio: { url, ... }, facts, habitat

        const animals = data.map(animal => ({
            id: animal._id,
            name: animal.name,
            category: animal.category,
            image: animal.image?.url || '',
            sound: animal.audio?.url || '',
            facts: animal.facts || animal.description || '',
            habitat: animal.habitat || '',
        }));

        const missingAssets = animals.filter(a => !a.image || !a.sound);
        console.info(`[api] Loaded ${animals.length} animals`);
        if (missingAssets.length) {
            console.warn('[api] Animals with no image/sound URL in the database:', missingAssets.map(a => a.name));
        }
        return animals;
    } catch (error) {
        console.error('[api] Error parsing animals response:', error);
        throw error;
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
