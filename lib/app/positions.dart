import 'dart:convert';

import 'package:cartracker_backend/database/user_dao.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import '../database/coordinate_dao.dart';

class Positions {
  Router get router {
    final router = Router();

    router.post("/create", _createPosition);
    // router.get("/get/:id", _getPositionsByUserID);
    router.get("/get", _getPositionsByUserID);
    router.get("/get/all", _getPositions);

    return router;
  }

  Future<Response> _createPosition(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String userid = body["userid"];
    if(await UserDao.checkID(userid) == null){
      return Response(401, body: jsonEncode(body));
    }
    double lat = body["lat"];
    double lng = body["lng"];
    await CoordinateDao.create(Coordinate(id: userid, lat: lat, lng: lng));
    return Response(201, body: jsonEncode(body));

  }

  Future<Response> _getPositionsByUserID(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String userid = body["userid"];
    List<Coordinate> coords = await CoordinateDao.readMany(userid, 3); //limit?
    if(coords.isNotEmpty) return Response(200, body: jsonEncode(coords));
    return Response(404);
  }

  Future<Response> _getPositions(Request request) async {
    List<Coordinate> coords = await CoordinateDao.readAll();
    return Response(200, body: jsonEncode(coords));
  }
}
