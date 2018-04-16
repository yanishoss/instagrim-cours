FROM alpine:3.5

WORKDIR /app/

COPY ./linux/instagrim instagrim

EXPOSE 443

VOLUME /app/

ENTRYPOINT [ "./instagrim" ]