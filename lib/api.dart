import 'dart:convert';

import 'package:cartracker_backend/database.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import 'coordinate_dao.dart';

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
    await CoordinateDao.insert(Coordinate(id: Uuid().v4(), lat: lat, lng: lng));
    return Response(201, body: jsonEncode(body));
  }
}
