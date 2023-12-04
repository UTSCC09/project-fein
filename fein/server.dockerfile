FROM node:16 as build

RUN mkdir -p /app
WORKDIR /app
COPY ./server /app
RUN npm install
RUN npm rebuild bcrypt --build-from-source

FROM node:14-alpine as main
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3001 4000 11211
CMD ["npm", "run", "prod"]
