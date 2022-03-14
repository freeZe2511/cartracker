import 'package:cartracker_backend/database/database.dart';
import 'package:cartracker_backend/routing/service.dart';
import 'package:cartracker_backend/routing/utils.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_cors_headers/shelf_cors_headers.dart';

void main() async {
  final overrideHeaders = {
    ACCESS_CONTROL_ALLOW_ORIGIN: '*',
    // ACCESS_CONTROL_ALLOW_HEADERS: 'Origin, Content-Type',
    'Content-Type': 'application/json;charset=utf-8'
  };

  await Database.init();
  final service = Service();

  final _ip = '0.0.0.0';
  final _port = 9090;
  final _secret = "super secret key";

  // false for localhost dev TODO environments
  bool prod = false;

  // Pipeline with all Middlewares and Handlers
  final _handler = Pipeline()
      .addMiddleware(corsHeaders(headers: overrideHeaders))
      .addMiddleware(logRequests())
      .addMiddleware(handleAuth(_secret))
      .addHandler(service.handler);

  // Server based on
  final server = await serve(_handler, _ip, _port,
      securityContext: prod ? getSecurityContext() : null);

  print("Server running on locahost:${server.port}");
}
