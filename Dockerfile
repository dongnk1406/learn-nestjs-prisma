# ---------- Build Stage ----------
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .
RUN npm run build

# ---------- Production Stage ----------
FROM node:20-alpine AS build-prod

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install --omit=dev
RUN npx prisma generate

COPY --from=build-stage /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
