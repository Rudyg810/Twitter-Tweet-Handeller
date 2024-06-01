# Stage 1: Install dependencies
FROM node:14 AS builder

WORKDIR /

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:14

WORKDIR /

RUN npm install -g serve

COPY --from=builder /dist /dist

CMD ["serve", "-s", "dist"]