FROM node:16.14.2-buster AS builder

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install

RUN npm run build


FROM node:16.14.2-buster

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY --from=builder /usr/src/app/build ./

RUN npm ci --only=production --ignore-scripts

EXPOSE 3000
CMD [ "node", "build" ]