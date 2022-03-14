import 'dart:io';

import 'package:cartracker_backend/routing/service.dart';
import 'package:cartracker_backend/routing/utils.dart';
import 'package:mongo_dart/mongo_dart.dart';
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
    expect(service.handler.runtimeType, Router);
  });


    test('String.split() splits the string on the delimiter', () {
      var string = 'foo,bar,baz';
      expect(string.split(','), equals(['foo', 'bar', 'baz']));
    });

    test('String.trim() removes surrounding whitespace', () {
      var string = '  foo ';
      expect(string.trim(), equals('foo'));
    });

  group('String', () {
    test('.split() splits the string on the delimiter', () {
      var string = 'foo,bar,baz';
      expect(string.split(','), equals(['foo', 'bar', 'baz']));
    });

    test('.trim() removes surrounding whitespace', () {
      var string = '  foo ';
      expect(string.trim(), equals('foo'));
    });
  });

  group('int', () {
    test('.remainder() returns the remainder of division', () {
      expect(11.remainder(3), equals(2));
    });

    test('.toRadixString() returns a hex string', () {
      expect(11.toRadixString(16), equals('b'));
    });
  });

  test('.split() splits the string on the delimiter', () {
    expect('foo,bar,baz', allOf([
      contains('foo'),
      isNot(startsWith('bar')),
      endsWith('baz')
    ]));
  });

  test('.parse() fails on invalid input', () {
    expect(() => int.parse('X'), throwsFormatException);
  });



}