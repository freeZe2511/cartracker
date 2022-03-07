import 'dart:io';

import 'package:cartracker_backend/database/database.dart';
import 'package:cartracker_backend/routing/service.dart';
import 'package:cartracker_backend/routing/utils.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_cors_headers/shelf_cors_headers.dart';

import 'package:shelf_letsencrypt/shelf_letsencrypt.dart';

void main() async {
  final overrideHeaders = {
    ACCESS_CONTROL_ALLOW_ORIGIN: '*',
    // ACCESS_CONTROL_ALLOW_HEADERS: 'Origin, Content-Type',
    'Content-Type': 'application/json;charset=utf-8'
  };

  // var certificatesDirectory = '/etc/letsencrypt/live'; // Default directory.
  //
  // // The Certificate handler, storing at `certificatesDirectory`.
  // final certificatesHandler = CertificatesHandlerIO(Directory(certificatesDirectory));
  //
  // // The Let's Encrypt integration tool in `staging` mode:
  // final LetsEncrypt letsEncrypt = LetsEncrypt(certificatesHandler, production: false);

  await Database.init();
  final service = Service();

  final _ip = '0.0.0.0';
  final _port = 9090;
  final _secret = "super secret key";

  final _handler = Pipeline()
      .addMiddleware(corsHeaders(headers: overrideHeaders))
      .addMiddleware(logRequests())
      .addMiddleware(handleAuth(_secret))
      .addHandler(service.handler);

  final server = await serve(
      _handler, _ip, _port, securityContext: getSecurityContext());

  print("Server running on locahost:${server.port}");

  // var domain = "tim-eggers.de";
  // var domainEmail = "csgotim@gmail.com";
  //
  // var servers = await letsEncrypt.startSecureServer(
  //   _handler,
  //   domain,
  //   domainEmail,
  //   port: 9089,
  //   securePort: 9090,
  // );

}

