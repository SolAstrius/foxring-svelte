FROM denoland/deno:2.8.2 AS build

WORKDIR /app
COPY package.json deno.json deno.lock ./
RUN deno task install

COPY . .
ENV NODE_ENV=production
RUN deno task build

FROM node:24-slim

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .

ENV NODE_ENV=production
ENV PORT=3000
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host

EXPOSE 3000
USER node
CMD ["node", "build/index.js"]
