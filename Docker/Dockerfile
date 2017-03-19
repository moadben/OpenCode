FROM alpine:3.3

RUN apk update && apk upgrade && apk add git bash apache2 nodejs && mkdir /home/app && git clone https://github.com/soxies1/TestNodeApp /home/app
WORKDIR /home/app
#COPY package.json /home/app
RUN npm install
#RUN npm init -f && npm install express --save
#COPY . /home/app

EXPOSE 8080
CMD ["node", "app.js"]

