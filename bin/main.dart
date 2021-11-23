import 'package:cartracker_backend/database.dart';
import 'package:cartracker_backend/routing/service.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_cors_headers/shelf_cors_headers.dart';

void main() async {
  // final Map<String, String> _headers = {'Access-Control-Allow-Origin': '*'};
  //
  // Response? _options(Request request) => (request.method == 'OPTIONS') ?
  // Response.ok(null, headers: _headers) : null;
  //
  // Response _cors(Response response) => response.change(headers: _headers);
  //
  //
  // final _fixCORS = createMiddleware(requestHandler: _options, responseHandler: _cors);

  final overrideHeaders = {
    ACCESS_CONTROL_ALLOW_ORIGIN: '*',
    'Content-Type': 'application/json;charset=utf-8'
  };

  await Database.init();
  final service = Service();
  final server = await serve(
      Pipeline()
          .addMiddleware(corsHeaders(headers: overrideHeaders))
          .addMiddleware(logRequests())
          .addHandler(service.handler),
      '0.0.0.0',
      9090);
  print("Server running on locahost:${server.port}");
}
