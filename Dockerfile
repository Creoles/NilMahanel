FROM daocloud.io/node
MAINTAINER CongjieRan "rancongjie@126.com"
RUN apt-get -y update && apt-get install -y nginx
WORKDIR /app
COPY ./* /app/
RUN npm i cooking-cli -g
RUN npm i babel-core babel-loader css-loader vue-loader vue-template-compiler file-loader postcss postcss-loader\
 html-loader html-webpack-plugin json-loader style-loader url-loader\
 webpack@1 webpack-dev-server@1 extract-text-webpack-plugin@1 -D
RUN npm install
RUN npm run dist
RUN cp -R /app/* /var/www/html
EXPOSE 80 8080
CMD ["nginx", "-g", "daemon off;"]