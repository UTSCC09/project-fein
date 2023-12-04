FROM alpine:latest
RUN adduser -D -u 1001 memcached
RUN apk update && \
    apk add --no-cache memcached

USER memcached
EXPOSE 11211

CMD ["memcached", "-m", "64"]