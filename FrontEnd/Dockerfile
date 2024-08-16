FROM node:21 as base
LABEL authors="geek2tech"
LABEL description="This is the FrontEnd image for the project Vparrot"
LABEL version="1.2.0"
LABEL maintainer="geek2tech"
LABEL name="Front-Vparrot"

ENV NODE_ENV=production
WORKDIR /src

FROM base as build

COPY --link ../FrontEnd/.. .
RUN npm install

RUN npm run build
RUN npm prune

FROM base

ENV PORT=3000
EXPOSE 3000
COPY --from=build /src/.output /src/.output
CMD ["node", ".output/server/index.mjs"]

