FROM oven/bun:1 AS build

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM oven/bun:1-slim

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .

ENV NODE_ENV=production
ENV PORT=3000
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host

EXPOSE 3000
USER bun
CMD ["bun", "build/index.js"]
