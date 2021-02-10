FROM node:11.11.0
RUN npm cache clean --force
RUN npm install -g yarn --registry=https://registry.npm.taobao.org

WORKDIR /app

COPY . /app
RUN yarn
RUN yarn build

FROM nginx
COPY --from=0 /app/build /app
COPY --from=0 /app/nginx.conf /etc/nginx/nginx.conf