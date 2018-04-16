FROM alpine:3.5

COPY ./linux/instagrim instagrim

RUN setcap CAP_NET_BIND_SERVICE=+eip ./instagrim

ENTRYPOINT [ "./instagrim" ]