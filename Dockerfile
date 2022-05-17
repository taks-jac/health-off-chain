FROM node:14

WORKDIR /var/api

COPY . .
EXPOSE 5000

RUN chmod 775 /var/api/prod-api.sh
CMD [ "sh","/var/api/prod-api.sh" ]
