# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.11.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /home/node/app


################################################################################
# Create a stage for installing development with nodemon
FROM base as development

COPY package*.json ./
COPY prisma ./prisma/
COPY .env.development .env.development

RUN yarn install

COPY . .

# Generate the Prisma client
RUN npx prisma generate
