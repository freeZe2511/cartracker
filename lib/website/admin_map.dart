import 'dart:convert';

import 'package:cartracker_backend/database/admin_data.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class AdminMap {
  Router get router {
    final router = Router();

    router.get("/user/<id>&<limit>", _getUserByID);
    // router.get("/userlist", _getUserByIDList);
    router.get("/coords/<limit>", _getUsersWithRecentCoords);

    return router;
  }

  Future<Response> _getUsersWithRecentCoords(Request request, String limit) async {
    var res = await AdminData.readBasicUsersWithLatestPositions(int.parse(limit));
    return Response(200, body: jsonEncode(res));
  }

  Future<Response> _getUserByID(Request request, String id, String limit) async {
    var res = await AdminData.readBasicUserByID(id, int.parse(limit)); //from parameters
    return Response(200, body: jsonEncode(res));
  }

}
