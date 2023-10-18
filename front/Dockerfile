FROM node:18.14.0

WORKDIR /app    
COPY . .
RUN yarn install

EXPOSE 5173

CMD ["yarn", "dev"]