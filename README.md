# TP 2 - API Spotify OAuth2

Rendu du TP 2 du cours de développement back-end par **Tony De Donato** et **Marianne Corbel**.

## Prérequis 

L'utilisateur doit avoir créé une application Spotify sur le [dashboard](https://developer.spotify.com/dashboard) de son compte personnel et y avoir rempli les champs suivants :
- **Redirect URI** : `http://localhost:3000/auth/callback`
- **APIs used** : `Web API`

Une fois créée, l'utilisateur pourra y récupérer son `client ID` et son `client secret` qui seront à renseigner dans le fichier `/spotify_app/.env` 

## Spécifications techniques

L'API présentée a été réalisée à l'aide d'**ExpressJS**.

**Versions** :
- npm 10.9
- Node 22 (LTS)

Client API recommandé : **Postman**

## Installation

Pour récupérer le projet depuis GitHub : 
```
git clone https://github.com/Tony-De-Donato/Tp_oAuth_spotify_Corbel_Dedonato.git
```

Le projet est divisé en deux parties (dossiers) distinctes : 
- `/spotify_api` : L'API elle-même
- `/spotify_app` : Une application web additionnelle sous React pour tester les fonctionnalités plus facilement

Dans les deux cas, les modules nodes doivent être installés dans chacun des deux dossiers avec la commande `npm i`.

### API

 L'utilisateur doit renommer le fichier `/spotify_api/.env.example` en `/spotify_api/.env` et y remplir à minima les variables `SPOTIFY_CLIENT_ID` et `SPOTIFY_CLIENT_SECRET` avec les informations liées à l'application spotify créée au préalable (voir prérequis).

Ensuite, le serveur peut être lancé à l'aide de la commande suivante :
```
npm start
``` 

Il sera par défaut disponible sur le port **3000** de la machine.

### App client React

De la même façon, l'utilisateur doit renommer le fichier `/spotify_app/.env.example` en `/spotify_app/.env` mais aucune configuration supplémentaire n'est nécessaire pour que le projet fonctionne.

L'application peut être lancée par la commande suivante, qui le rendra disponible sur le port **3001** :
```
npm run start
```

## Documentation

Une documentation précise de l'API a été réalisée avec [Swagger](https://swagger.io/tools/swagger-editor/) et est disponible à l'URL suivante de l'API :
```
http://localhost/api-docs
```

Les fonctionnalités suivantes ont été implémentées :
- Connexion OAuth2 par [Authorization Code](https://developer.spotify.com/documentation/web-api/tutorials/code-flow) et [Implicit Grant](https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow) ;
- Récupérations des derniers titres joués par l'utilisateur connecté
- Recherche d'un titre
- Récupération des informations d'un titre par son ID

Les trois dernières options sont dépendantes de la connexion à Spotify et sous-entendent que l'utilisateur devra fournir dans le header des requêtes concernées l'**access token** obtenu après la connexion :
```
Authorization : Bearer <access token>
```

## Fonctionnalités additionnelles

Plusieurs fonctionnalités ont été ajoutées au projet pour le rendre plus agréable à utiliser :
- Conteneurs docker pour l'app et l'API
- Cache et rate limiter intégrés à l'API
- Système de logs de l'API qui peuvent être consultés dans le dossier `spotify_api/logs/`
