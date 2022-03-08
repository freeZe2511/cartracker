import 'dart:convert';

import 'package:cartracker_backend/database/admin_data_dao.dart';
import 'package:cartracker_backend/database/coordinate_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:shelf/shelf.dart';

class PositionController {
  Future<Response> createPos(Request request) async {
    if (request.isEmpty) return Response(400);
    var body = jsonDecode(await request.readAsString());
    if (body != null) {
      String userid = body["userid"];
      if (await UserDao.checkID(userid) == null) {
        return Response(401, body: jsonEncode(body));
      }
      double lat = body["lat"];
      double lng = body["lng"];
      // double speed  = body["speed"];
      bool inZone = body["inZone"];
      // bool isMoving = body["isMoving"]; // TODO

      await CoordinateDao.create(
          Coordinate(id: userid, lat: lat, lng: lng, inZone: inZone)); //TODO
      return Response(201, body: jsonEncode(body));
    }
    return Response(400);
  }

  Future<Response> getLatestUserPos(Request request) async {
    String limit = "1"; // TODO
    var res =
        await AdminDataDao.readBasicUsersWithLatestPositions(int.parse(limit));
    return Response(200, body: jsonEncode(res));
  }

  Future<Response> getRoute(Request request, String id, String hoursString,
      String minutesString) async {
    print(id + " && " + hoursString + " && " + minutesString);
    int hours = int.parse(hoursString);
    int minutes = int.parse(minutesString);
    print(id + " && " + hours.toString() + " && " + minutes.toString());
    List<Coordinate> coords = await CoordinateDao.readRoute(id, hours, minutes);
    if (coords.isNotEmpty) return Response(200, body: jsonEncode(coords));
    return Response(404);
  }
}
