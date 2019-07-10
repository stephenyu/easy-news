FROM node:10-alpine

# Installs latest Chromium (73) package.
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      bash \
      chromium@edge=~73.0.3683.103 \
      nss@edge \
      freetype@edge \
      freetype-dev@edge \
      harfbuzz@edge \
      ttf-freefont@edge

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser
RUN mkdir -p /home/pptruser/Downloads /app
RUN chown -R pptruser:pptruser /home/pptruser
RUN chown -R pptruser:pptruser /app

ENV NETLIFY_AUTH_TOKEN 35ff8660147e5b5155a2168e28c79d9e35c7e50d5aef29e424df84acc39810f3
ENV NETLIFY_SITE_ID 407293c1-300e-48cc-8d01-f73bc7ae1080

# Run everything after as non-privileged user.
USER pptruser

ADD --chown=pptruser . /app
ADD --chown=pptruser ./build/run_step.sh /run_step.sh
RUN chmod +x ./run_step.sh

CMD /run_step.sh
