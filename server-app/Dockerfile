FROM node:14-slim
WORKDIR /server-app
COPY . .
RUN npm install
EXPOSE 3050
CMD ["npm","run", "start"]