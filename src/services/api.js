// Requests go to /api on the site's own origin. vercel.json (production) and the Vite
// dev/preview server (vite.config.js) forward them to the backend, so the browser never
// makes a cross-origin request and CORS doesn't apply.
const API_URL = "/api";

// Vercel gives up on a proxied request after 30s, and a sleeping Render instance can take
// longer than that to wake. These statuses mean the proxy or backend wasn't ready yet.
const RETRYABLE_STATUSES = [502, 503, 504];
const RETRY_DELAYS_MS = [3000, 10000];

// Turns the various ways the request can fail into one readable message.
const describeFetchFailure = async (url, err, response) => {
    if (err) {
        // fetch() only rejects on network-level failures, e.g. the device is offline.
        return `Could not reach ${url}. Check your internet connection. Original error: ${err.message}`;
    }
    if (RETRYABLE_STATUSES.includes(response.status)) {
        return `The backend did not respond in time (${response.status}) for ${url}. It may still be waking up; try again in a minute.`;
    }
    const body = await response.text().catch(() => '');
    return `Backend responded ${response.status} ${response.statusText} for ${url}: ${body.slice(0, 200)}`;
};

// Retries only on proxy/backend-not-ready statuses. Used for reads, not uploads: a
// timed-out upload may still have been saved, so retrying it could add a duplicate.
// onRetry is called before each wait so the UI can tell the user why loading is slow.
const fetchWithWakeRetry = async (url, onRetry) => {
    for (let attempt = 0; ; attempt++) {
        const response = await fetch(url);
        const delay = RETRY_DELAYS_MS[attempt];
        if (!RETRYABLE_STATUSES.includes(response.status) || delay === undefined) {
            return response;
        }
        console.warn(`[api] ${url} returned ${response.status}; the backend may be waking up. Retrying in ${delay / 1000}s`);
        onRetry?.({ attempt: attempt + 1, status: response.status, delayMs: delay });
        await new Promise(resolve => setTimeout(resolve, delay));
    }
};

export const fetchAnimals = async ({ onRetry } = {}) => {
    const url = `${API_URL}/animals`;
    let response;
    try {
        response = await fetchWithWakeRetry(url, onRetry);
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
        // The /api request fell through to the app's index.html instead of being proxied.
        const message = `Expected JSON from ${url} but got "${contentType}". The /api proxy (vercel.json in production, vite.config.js locally) is probably missing.`;
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

export const createAnimal = async (formData, adminPassword) => {
    try {
        const response = await fetch(`${API_URL}/animals`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${adminPassword}` },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const error = new Error(errorData.message || `Failed to create animal (${response.status})`);
            error.status = response.status;
            throw error;
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
