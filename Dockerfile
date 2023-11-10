FROM node:20.9.0
 
WORKDIR /src
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm install
 
COPY . .
 
CMD [ "node", "." ]