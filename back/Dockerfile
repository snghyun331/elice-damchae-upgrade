FROM node:18.14.0

WORKDIR /back/
COPY . /back
RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]