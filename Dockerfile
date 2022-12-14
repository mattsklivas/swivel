# Install dependencies only when needed
FROM node:latest
#go to working directory in container
WORKDIR /usr/src/app
#add package.json and yarn lock to directory
COPY package.json yarn.lock ./
#install dependencies
RUN yarn install
#copy files to container
COPY . .
#expose port 8080
EXPOSE 8080
#perform command to run app 
CMD ["yarn", "dev-server"]
