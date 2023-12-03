FROM --platform=linux/amd64 node:lts-slim as build

RUN mkdir -p /app
WORKDIR /app

COPY .client /app
RUN npm install
RUN npm run build

FROM --platform=linux/amd64 node:lts-slim as main
WORKDIR /app
COPY --from=build /app /app
expose 3000
CMD ["npm", "run", "start"]
