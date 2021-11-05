import 'dart:convert';

import 'package:cartracker_backend/database/user_dao.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import '../database/admin_dao.dart';

class AdminMap {
  Router get router {
    final router = Router();

    // router.get("/user/:id", _getUserByID);
    // router.get("/userlist", _getUserByIDList);
    router.get("/coords", _getAllRecentCoords);
    // // router.put("/update/:id", _updateUserByID);
    // router.put("/update", _updateUserByID);
    // router.delete("/delete", _deleteUserByID); // delete by id list?
    // // router.delete("/delete/:id", _deleteUserByID);

    return router;
  }

  Future<Response> _getAllRecentCoords(Request request) async {
    var body = jsonDecode(await request.readAsString());

    // username pw

    return Response(200);
  }

  // Future<Response> _getUserByID(Request request) async {
  //   var body = jsonDecode(await request.readAsString());
  //   String id = body["id"]; // from parameter!
  //   User user = await UserDao.readOne(id);
  //   return Response(200, body: jsonEncode(user));
  // }

}
