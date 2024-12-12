const API_BASE_URL = 'http://localhost:3000';


let accessToken = '';

document.querySelector("#loginButton").addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`);
        const data = await response.json();
        if (data.url) {
            // Ouvre l'URL dans un nouvel onglet
            window.open(data.url, '_blank');
        } else {
            console.error('URL de connexion non trouvée');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'URL d\'authentification:', error);
    }
});


// Stock le token
document.querySelector('#setTokenButton').addEventListener('click', () => {
    const tokenInput = document.querySelector('#accessTokenInput').value;
    if (tokenInput) {
        accessToken = tokenInput.trim();
        document.getElementById('fetchTracksButton').disabled = false;
        alert('Access Token défini avec succès !');
    } else {
        alert('Veuillez entrer un Access Token.');
    }
});


// Récupérer les derniers titres joués
document.querySelector('#fetchTracksButton').addEventListener('click', async () => {
    if (!accessToken) {
        alert('Veuillez entrer un Access Token !');
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/tracks/recently-played`, {
            headers: {
                Authorization: accessToken,
            },
        });
        const data = await response.json();
        if (data.items) {
            const list = document.getElementById('tracksList');
            list.innerHTML = '';
            data.items.forEach((item) => {
                const track = item.track;
                const li = document.createElement('li');
                li.textContent = `${track.name} - ${track.artists.map(a => a.name).join(', ')}`;
                list.appendChild(li);
            });
        } else {
            console.error('Aucune donnée trouvée:', data);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des titres:', error);
    }
});


// Rechercher des morceaux par nom ou artiste
document.querySelector('#searchButton').addEventListener('click', async () => {
    const query = document.querySelector('#searchInput').value.trim();
    if (!query) {
        alert('Veuillez entrer un titre ou un artiste pour effectuer une recherche.');
        return;
    }
    if (!accessToken) {
        alert('Veuillez entrer un Access Token !');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tracks/search?query=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: accessToken,
            },
        });
        const data = await response.json();
        const resultsList = document.getElementById('searchResults');
        resultsList.innerHTML = '';

        if (data.tracks && data.tracks.items) {
            data.tracks.items.forEach((track) => {
                const li = document.createElement('li');
                li.textContent = `${track.name} - ${track.artists.map((a) => a.name).join(', ')}`;
                resultsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'Aucun résultat trouvé.';
            resultsList.appendChild(li);
        }
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
    }
});
