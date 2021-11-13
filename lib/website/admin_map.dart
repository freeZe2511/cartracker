import 'dart:convert';

import 'package:cartracker_backend/database/admin_data.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class AdminMap {
  Router get router {
    final router = Router();

    // router.get("/user/:id", _getUserByID);
    // router.get("/userlist", _getUserByIDList);
    router.get("/coords", _getAllRecentCoords);

    return router;
  }

  Future<Response> _getAllRecentCoords(Request request) async {
    var body = jsonDecode(await request.readAsString());
    const limit = 50; // als request?
    var res = await AdminData.readBasicUsersWithLatestPositions(limit);
    return Response(200, body: jsonEncode(res));
  }

// Future<Response> _getUserByID(Request request) async {
//   var body = jsonDecode(await request.readAsString());
//   String id = body["id"]; // from parameter!
//   User user = await UserDao.readOne(id);
//   return Response(200, body: jsonEncode(user));
// }

}
