import 'package:cartracker_backend/service.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';

void main() async {
  final service = Service();
  final server = await serve(
      Pipeline().addMiddleware(logRequests()).addHandler(service.handler),
      '0.0.0.0',
      9090);
  print("Server running on locahost:${server.port}");
}
