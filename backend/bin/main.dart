import 'dart:io';

import 'package:cartracker_backend/database/database.dart';
import 'package:cartracker_backend/routing/service.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_cors_headers/shelf_cors_headers.dart';

void main() async {
  final overrideHeaders = {
    ACCESS_CONTROL_ALLOW_ORIGIN: '*',
    'Content-Type': 'application/json;charset=utf-8'
  };

  await Database.init();
  final service = Service();

  final _ip = '0.0.0.0';
  final _port = 9090;

  final _handler = Pipeline()
      .addMiddleware(corsHeaders(headers: overrideHeaders))
      .addMiddleware(logRequests())
  // .addMiddleware(
  //     createMiddleware(requestHandler: AuthenticationController.handle))
      .addHandler(service.handler);


  final server = await serve(_handler, _ip, _port, securityContext: getSecurityContext());
  print("Server running on locahost:${server.port}");
}

SecurityContext getSecurityContext() { // Bind with a secure HTTPS connection
  final chain = Platform.script.resolve('certificates/server_chain.pem').toFilePath();
  final key = Platform.script.resolve('certificates/server_key.pem').toFilePath();

  return SecurityContext()
    ..useCertificateChain(chain)
    ..usePrivateKey(key, password: 'dartdart');
}
