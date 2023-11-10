# MoyennesED API

## 📖 Présentation
Ce projet est une API qui réplique les comportements d'ÉcoleDirecte.
Elle crée un compte avec un nom, un classe, et d'autres valeurs toutes aléatoires, et un deuxième endpoint permet de récupérer les notes de ce compte, elles aussi aléatoires. Cette API formate les données exactement comme ÉcoleDirecte, c'est donc une bonne alternative pour tester des projets.

## ⚛️ Fonctionnement
Paramétrez l'API dans le fichier .env  
Chaque mot de passe autorisé (dans le fichier .env) sera associé à un compte, qui sera créé aléatoirement lors de la première connexion et puis sauvegardé dans un dossier cache.  
L'endpoint pour récupérer les notes fonctionne de la même façon, chaque ID de compte est associé à des notes qui sont ensuite sauvegardées dans le dossier cache.  

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
