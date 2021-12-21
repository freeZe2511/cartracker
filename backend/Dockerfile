FROM google/dart:latest

WORKDIR /app

ADD pubspec.* /app/
RUN pub get
ADD . /app
RUN pub get --offline

EXPOSE 9090

CMD []
ENTRYPOINT ["/usr/bin/dart", "bin/main.dart"]