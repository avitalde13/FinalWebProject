FROM node:21.5.0-alpine
# Install project dependencies
WORKDIR /usr/app
COPY . .
RUN npm install
# Run default command
CMD ["npm", "start"]
