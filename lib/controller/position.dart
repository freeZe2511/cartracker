import 'dart:convert';

import 'package:cartracker_backend/database/coordinate_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:shelf/shelf.dart';

class PositionController {
  Future<Response> createPos(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String userid = body["userid"];
    if (await UserDao.checkID(userid) == null) {
      return Response(401, body: jsonEncode(body));
    }
    double lat = body["lat"];
    double lng = body["lng"];
    await CoordinateDao.create(Coordinate(id: userid, lat: lat, lng: lng));
    return Response(201, body: jsonEncode(body));
  }

  Future<Response> getRoute(Request request, String id, String hoursString, String minutesString) async {
    print(id + " && " + hoursString + " && " + minutesString);
    int hours = int.parse(hoursString);
    int minutes = int.parse(minutesString);
    print(id + " && " + hours.toString() + " && " + minutes.toString());
    List<Coordinate> coords = await CoordinateDao.readRoute(id, hours, minutes);
    if(coords.isNotEmpty) return Response(200, body: jsonEncode(coords));
    return Response(404);
  }

  // Future<Response> _getPositions(Request request) async {
  //   List<Coordinate> coords = await CoordinateDao.readAll();
  //   return Response(200, body: jsonEncode(coords));
  // }
}
