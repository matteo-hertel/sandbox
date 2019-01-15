FROM golang:1.11-alpine AS build
RUN apk --no-cache add gcc g++ make ca-certificates git
WORKDIR /go/github.com/matteo-hertel/sandbox/goCQRS

COPY go.mod go.mod ./
COPY util util
COPY event event
COPY db db
COPY search search
COPY schema schema
COPY car-service car-service
COPY query-service query-service
COPY pusher-service pusher-service
RUN go install ./...

FROM alpine:3.7
WORKDIR /usr/bin
COPY --from=build /go/bin .
