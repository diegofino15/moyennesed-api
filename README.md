# MoyennesED API

## 📖 Présentation
Ce projet est une API qui réplique les comportements d'ÉcoleDirecte.
Elle crée un compte avec un nom, un classe, et d'autres valeurs toutes aléatoires, et un deuxième endpoint permet de récupérer les notes de ce compte, elles aussi aléatoires. Cette API formate les données exactement comme ÉcoleDirecte, c'est donc une bonne alternative pour tester des projets.

## ⚛️ Fonctionnement
Sur les premières lignes de **index.js**, vous pouvez configurer tous les paramètres principaux de l'application.  
Chaque connexion avec un des mots de passes autorisés sera sauvegardée, et le compte créé sera associé à ce mot de passe. Attention, à chaque redémmarrage de l'API, tous les comptes créés sont supprimés, un système de sauvegarde est prévu dans le futur.  

Le 2e endpoint renvoie des périodes, matières et notes toutes aléatoires, dans le même format qu'ÉcoleDirecte. Elles sont elles aussi associées à un ID de compte (dont il y a besoin pour récupérer les notes).

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
