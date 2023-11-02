# MoyennesED API

## 📖 Présentation
Ce projet est une API connectée au projet Firebase associé à l'application MoyennesED.  
Il permet d'accéder aux signalements de bugs stockées dans la base de données Firestore du projet.

## ⚛️ Fonctionnement
Paramétrez l'API dans le fichier .env  
Votre nom d'utilisateur doit être composé de la façon suivante :  
demo-[numéro de la collection firestore]-[nom du document firestore]
Connectez-vous ensuite à l'endpoint des notes comme vous le feriez normalement, les informations importantes sont contenues dans le X-Token reçu lors du login.

## Comment l'utiliser ?
Vous pouvez cloner le projet pour l'utiliser personnellement, ou bien proposer de nouvelles fonctionnalités avec une pull request.

Pour se faire, clonez le projet :
```bash
git clone https://github.com/diegofino15/moyennesed-api.git
cd moyennesed-api
```
Ensuite, installez les dependencies et lancez le projet, il faut avoir **Node.js** installé, et les permissions sudo :
```bash
npm install
sudo node .
```

## Contact
Si vous avez des questions ou des suggestions, n’hésitez pas à ouvrir une issue sur GitHub ou à me contacter directement via mail à moyennesed@gmail.com
