FROM alpine:3.5

WORKDIR /app/

ADD ./linux/instagrim /app/

EXPOSE 443

VOLUME /app/

ENTRYPOINT [ "./instagrim" ]