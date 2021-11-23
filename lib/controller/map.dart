import 'dart:convert';

import 'package:cartracker_backend/database/admin_data_dao.dart';
import 'package:shelf/shelf.dart';

class MapController {
  Future<Response> getMap(Request request, String limit) async {
    var res =
        await AdminDataDao.readBasicUsersWithLatestPositions(int.parse(limit));
    return Response(200, body: jsonEncode(res));
  }

  Future<Response> getMapUserByID(
      Request request, String id, String limit) async {
    var res = await AdminDataDao.readBasicUserByID(id, int.parse(limit));
    return Response(200, body: jsonEncode(res));
  }

// getRoutes
// getZones, getDistance etc
}
