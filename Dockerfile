FROM daocloud.io/node
MAINTAINER CongjieRan "rancongjie@126.com"
RUN apt-get -y update && apt-get install -y nginx
RUN npm i cooking-cli -g
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app/
RUN npm run dist
RUN cp -R /app/* /usr/share/nginx/html
RUN cp /app/nilmahanel /etc/nginx/sites-available
WORKDIR /etc/nginx/sites-enabled
RUN ln -s nilmahanel /etc/nginx/sites-available/nginxctrl
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]