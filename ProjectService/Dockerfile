# Utilisez une image de base Node.js
FROM node:18
# MÉTADONNÉES DE L'IMAGE
LABEL version="1.0" maintainer="SAIDI YAHIA <yahiasaidi031@gmail.com>"
# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers du projet dans le conteneur
COPY package*.json ./
COPY . .

# Installez les dépendances
RUN npm install

# Exposez le port sur lequel votre application Node.js écoute
EXPOSE 8006


# Commande pour démarrer l'application
CMD ["npm", "start"]
