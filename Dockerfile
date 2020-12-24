FROM    nginx:latest

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN     yum install -y epel-release
# Install Node.js and npm
RUN     yum install -y nodejs npm

RUN     npm install -g yarn

RUN     yum install -y nginx

WORKDIR /usr/src/app

# nginxの設定書き換え
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf

RUN     nginx, -g, daemon off

# Install app dependencies
COPY ./test_sample/package.json ./test_sample/package.json
RUN cd ./test_sample; yarn install --production

# Bundle app source
COPY . .

EXPOSE  8080

WORKDIR /usr/src/app/test_sample


CMD ["yarn", "start"]