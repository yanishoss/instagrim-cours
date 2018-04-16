FROM debian:latest

WORKDIR /app/

ADD ./linux/instagrim /app/

VOLUME "/:/app/"

RUN chmod +x /app/instagrim

EXPOSE 443

ENV ENV=production

CMD [ "./instagrim" ]