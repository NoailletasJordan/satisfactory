# Satisfactory

Une application web pour la vente de services (ici numériques).
Créée avec Gatsby, les commandes effectuées sont envoyé sur une base de données **NoSql** via backend **serverless**.

### Rapport Lighthouse

![image](https://user-images.githubusercontent.com/48062996/102547489-9651c200-40b9-11eb-87c1-e5a6755f7ffa.png)

### Aperçu

![Screenshot_1](https://user-images.githubusercontent.com/48062996/102534222-b4fa8d80-40a6-11eb-844f-f9ac10c6916f.png)

### Développement local

1.  Installez [Netlify Dev](https://www.netlify.com/products/dev/) et [Node.js / npm](https://nodejs.org/en/).

1.  Créez un fichier **.env** à la racine du projet et complétez le ainsi:

        MONGODB_URL=<votre-url-mongodb>
        DB_NAME=<votre-nom-de-projet>

1.  Adaptez le fichier **netlify.toml** a vos besoins

1.  Installez les dépendances:

        npm install

1.  Démarrez le serveur Gatsby et les fonctions serverless:

        netlify dev

1.  Ouvrez [http://localhost:8000/](http://localhost:8000/) sur le navigateur.
