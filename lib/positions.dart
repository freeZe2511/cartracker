import 'dart:convert';

import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import 'coordinate_dao.dart';

class Positions {
  Router get router {
    final router = Router();

    router.post("/create", _createPosition); // log out?
    // router.get("/get/:id", _getPositionsByUserID);
    router.get("/get", _getPositionsByUserID);
    router.get("/get/all", _getPositions);

    return router;
  }

  Future<Response> _createPosition(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String userid = body["userid"];
    double lat = body["lat"];
    double lng = body["lng"];
    print("$userid, $lat, $lng");
    await CoordinateDao.insert(Coordinate(id: userid, lat: lat, lng: lng));
    return Response(201, body: jsonEncode(body));
  }

  Future<Response> _getPositionsByUserID(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String userid = body["userid"];
    List<Coordinate> coords = await CoordinateDao.readMany(userid, 3); //limit?
    return Response(200, body: jsonEncode(coords));
  }

  Future<Response> _getPositions(Request request) async {
    List<Coordinate> coords = await CoordinateDao.readAll();
    return Response(200, body: jsonEncode(coords));
  }
}
