# MoyennesED API

## 📖 Présentation
Ce projet est petit, c'est l'API de debug qu'utilise l'application MoyennesED.  
Cette API crée un compte avec des valeurs complêtement aléatoires, avec le même format qu'ÉcoleDirecte.

## ⚛️ Fonctionnement
Sur les premières lignes de **index.js**, vous pouvez configurer tous les paramètres principaux de l'application.  
Chaque connexion avec un des mots de passe autorisés sera sauvegardée, et le compte créé sera associé à ce mot de passe. Attention, à chaque redémmarrage de l'API, tous les comptes crées sont supprimés, un système de sauvegarde est prévu dans le futur.

## Comment l'utiliser ?
Tout le monde peut l'utilser ! Vous pouvez cloner le projet pour l'utiliser personnellement, ou bien proposer de nouvelles fonctionnalités avec une pull request.

Pour se faire, clonez le projet :
```bash
git clone https://github.com/diegofino15/moyennesed-api.git
cd moyennesed-api
```
Ensuite, installez les dependencies et lancez le projet, il faut avoir les permissions sudo :
```bash
npm install
sudo node .
```

## Contact
Si vous avez des questions ou des suggestions, n’hésitez pas à ouvrir une issue sur GitHub ou à me contacter directement via mail à moyennesed@gmail.com
