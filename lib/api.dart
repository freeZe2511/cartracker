import 'dart:convert';

import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class Api {
  Router get router {
    final router = Router();

    //router.get("/api/v1/", );
    router.post("/v1/positions", _positions);

    return router;
  }

  Future<Response> _positions(Request request) async {
    var body = jsonDecode(await request.readAsString());
    double lat = body["lat"];
    double lng = body["lng"];
    print("$lat, $lng");
    return Response(201, body: jsonEncode(body));
  }
}
