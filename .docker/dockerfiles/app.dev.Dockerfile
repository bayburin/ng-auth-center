ARG NODE_MAJOR
FROM docker-hub.iss-reshetnev.ru/registry/languages/nodejs/node:${NODE_MAJOR}-buster-slim

ARG APP_ROOT
ARG ANGULAR_VERSION

# Install angular-cli
RUN yarn global add @angular/cli@v${ANGULAR_VERSION}-lts

# Create app folder
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

EXPOSE 4200

STOPSIGNAL SIGTERM
