FROM node:12.6.0-alpine

ENV NETLIFY_AUTH_TOKEN 35ff8660147e5b5155a2168e28c79d9e35c7e50d5aef29e424df84acc39810f3
ENV NETLIFY_SITE_ID 407293c1-300e-48cc-8d01-f73bc7ae1080

RUN apk add --no-cache bash

ADD . /app
ADD ./build/run_step.sh /run_step.sh
RUN chmod +x ./run_step.sh

CMD /run_step.sh
