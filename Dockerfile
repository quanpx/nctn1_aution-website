FROM nginx:alpine 

WORKDIR /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d

COPY conf/conf.d /etc/nginx/conf.d

COPY build/ .

CMD ["nginx","-g","daemon off;"]