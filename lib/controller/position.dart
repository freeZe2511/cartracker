import 'dart:convert';
import 'dart:math';

import 'package:cartracker_backend/database/admin_data_dao.dart';
import 'package:cartracker_backend/database/coordinate_dao.dart';
import 'package:cartracker_backend/database/user_dao.dart';
import 'package:cartracker_backend/database/zone_dao.dart';
import 'package:shelf/shelf.dart';
import 'package:vector_math/vector_math.dart';

class PositionController {
  Future<Response> createPos(Request request) async {
    var body = jsonDecode(await request.readAsString());
    String userid = body["userid"];
    if (await UserDao.checkID(userid) == null) {
      return Response(401, body: jsonEncode(body));
    }
    double lat = body["lat"];
    double lng = body["lng"];

    // bool inZone = body["inZone"]; //TODO when calc in app
    bool inZone = await isInZone(userid, lat, lng);

    await CoordinateDao.create(
        Coordinate(id: userid, lat: lat, lng: lng, inZone: inZone));
    return Response(201, body: jsonEncode(body));
  }

  Future<Response> getLatestUserPos(Request request, String limit) async {
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

  Future<bool> isInZone(String userid, double lat, double lng) async {
    User u = await UserDao.readOneByID(userid);
    print(u);
    Zone? z = await ZoneDao.readOneByID(u.zoneid);
    print(z);

    if (z != null) {
      print(z.pos);
      print(z.pos[0]);
      print(z.pos[0]["lat"]);

      if (z.radius > 0) {
        return checkCircleZone(
            z.pos[0]["lat"], z.pos[0]["lng"], lat, lng, z.radius);
      }
    }
    return true;
  }

  bool checkCircleZone(double zoneLat, double zoneLng, double userLat,
      double userLng, num radius) {
    // radius in m
    const radiusEarth = 6371; // in km
    double distanceLat = radians(userLat - zoneLat);
    double distanceLon = radians(userLng - zoneLng);
    num a = sin(distanceLat / 2) * sin(distanceLat / 2) +
        cos(radians(zoneLat)) *
            cos(radians(userLat)) *
            sin(distanceLon / 2) *
            sin(distanceLon / 2);
    num b = 2 * atan2(sqrt(a), sqrt(1 - a));
    num distance = radiusEarth * b;
    if ((distance * 1000) <= radius) {
      return true;
    } else {
      return false;
    }
  }

// Future<Response> _getPositions(Request request) async {
//   List<Coordinate> coords = await CoordinateDao.readAll();
//   return Response(200, body: jsonEncode(coords));
// }
}
