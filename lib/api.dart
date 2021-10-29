import 'dart:convert';

import 'package:mongo_dart/mongo_dart.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import 'coordinate_dao.dart';
import 'auth.dart';

class Api {
  Router get router {
    final router = Router();

    router.mount('/user/', Auth().router);
    router.post("/v1/positions", _positions);
    //router.get("/api/v1/", );

    return router;
  }

  Future<Response> _positions(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String userid = body["userid"];
    double lat = body["lat"];
    double lng = body["lng"];
    print("$userid, $lat, $lng");
    await CoordinateDao.insert(Coordinate(id: userid, lat: lat, lng: lng));
    return Response(201, body: jsonEncode(body));
  }
}
