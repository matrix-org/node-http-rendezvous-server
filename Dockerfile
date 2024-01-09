FROM node:20-alpine

COPY package.json yarn.lock ./
RUN yarn install --production

COPY dist ./dist

EXPOSE 8080

CMD ["yarn", "start"]
