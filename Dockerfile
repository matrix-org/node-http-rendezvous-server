FROM node:16-alpine

COPY package.json yarn.lock ./
RUN yarn install --production

COPY dist ./dist

EXPOSE 8080

CMD ["yarn", "start"]
