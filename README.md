# Satisfactory

Une application web pour la vente de services (ici numériques).
Créé avec Gatsby, les commandes effectuées sont envoyé sur une base de données **NoSql** via backend **serverless**.

### Rapport Lighthouse

![audit satisf](https://user-images.githubusercontent.com/48062996/102534231-b75ce780-40a6-11eb-82bc-d9b231c1c9bd.png)

### Aperçu

![Screenshot_1](https://user-images.githubusercontent.com/48062996/102534222-b4fa8d80-40a6-11eb-844f-f9ac10c6916f.png)

### Développement local

1.  Installez [Node.js and npm](https://nodejs.org/en/).

1.  Créez un fichier **.env** à la racine du projet et complétez le ainsi:

        MONGODB_URL=<votre-url-mongodb>
        DB_NAME=<votre-nom-de-projet>

1.  Créez un fichier **netlify.toml** à la racine du projet avec les paramètres de votre choix pour les fonctions serverless.

1.  Installez les dépendances:

        npm install

1.  Démarrez le serveur Gatsby:

        npm run develop

1.  Ouvrez [http://localhost:8000/](http://localhost:8000/) sur le navigateur.
