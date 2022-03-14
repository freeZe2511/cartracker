import 'dart:io';

import 'package:cartracker_backend/routing/service.dart';
import 'package:cartracker_backend/routing/utils.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_cors_headers/shelf_cors_headers.dart';
import 'package:shelf_plus/shelf_plus.dart';
import 'package:test/test.dart';
import 'package:cartracker_backend/database/database.dart';

void main(){

  late Service service;
  late HttpServer server;
  bool prod = false;

  final _ip = '0.0.0.0';
  final _port = 9090;
  final _secret = "super secret key";
  final overrideHeaders = {
    ACCESS_CONTROL_ALLOW_ORIGIN: '*',
    // ACCESS_CONTROL_ALLOW_HEADERS: 'Origin, Content-Type',
    'Content-Type': 'application/json;charset=utf-8'
  };

  setUp(() async {
    await Database.init();
    service = Service();

    final _handler = Pipeline()
        .addMiddleware(corsHeaders(headers: overrideHeaders))
        .addMiddleware(logRequests())
        .addMiddleware(handleAuth(_secret))
        .addHandler(service.handler);

    server = await serve(_handler, _ip, _port,
        securityContext: prod ? getSecurityContext() : null);
  });

  tearDown(() async {
    await server.close();
  });

  test("service return", () {
    expect(service.handler, Router);
  });



}