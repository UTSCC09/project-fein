# Stage 1: Build the application
FROM --platform=linux/amd64 node:21.1.0 as build

RUN mkdir -p /app
WORKDIR /app
COPY ./server /app
COPY ./.env /app
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

# Stage 2: Create the final image
FROM --platform=linux/amd64 node:21.1.0 as main
WORKDIR /app
COPY --from=build /app /app

# Install Memcached
RUN apt-get update && \
    apt-get install -y memcached

# Expose ports for the application and Memcached
EXPOSE 3001 4000

# Start both the Node.js application and Memcached
CMD ["sh", "-c", "memcached -u root -m 64 & npm run prod"]
