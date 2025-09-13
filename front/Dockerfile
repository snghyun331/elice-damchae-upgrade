FROM node:18.14.0

WORKDIR /front/    
COPY . /front
RUN yarn install

EXPOSE 5173

CMD ["yarn", "dev"]