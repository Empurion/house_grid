FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN npm install -g npm@9.6.4
RUN npm install -g nodemon
RUN chown -R node /usr/src/app
USER node
CMD ["nodemon --exitcrash", "--exec", "node", "run", "index.js"]
