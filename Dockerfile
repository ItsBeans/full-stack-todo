# use an official node.js runtime as a parent image 
FROM node:22-alpine 

# set the working directory in the container
WORKDIR /app

# copy the package.json and package-lock.json to container
COPY package*.json .

# install all dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# expose the port that the app runs on
EXPOSE 5003

# define the command to run your app
CMD ["node","./src/server.js"]

